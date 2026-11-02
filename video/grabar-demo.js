// Graba un video demo de Vitrina Gamarra con Google Chrome en modo automático.
// No necesita instalar nada: maneja Chrome por su protocolo de depuración y codifica con WebCodecs (H.264).
// Uso: node video/grabar-demo.js              → video/vitrina-gamarra-demo.mp4 (celular, 1080 × 1350)
//      node video/grabar-demo.js escritorio   → video/vitrina-gamarra-demo-escritorio.mp4 (1920 × 1080)
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const RAIZ = path.join(__dirname, '..');
const ESCRITORIO = process.argv[2] === 'escritorio';
// Ancho y alto de la página en px CSS y cuánto se amplía: 432 × 540 × 2.5 = 1080 × 1350 (4:5); 1280 × 720 × 1.5 = 1920 × 1080 (16:9)
const [W, H, DPR] = ESCRITORIO ? [1280, 720, 1.5] : [432, 540, 2.5];
const FPS = 30, PUERTO = 4599, DEPURACION = 9333;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-video-'));
const CUADROS = path.join(TMP, 'cuadros');
fs.mkdirSync(CUADROS);

const espera = ms => new Promise(r => setTimeout(r, ms));
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };

// Página que codifica los cuadros en H.264 con WebCodecs y arma un MP4 (cuadro por cuadro, sin depender del tiempo real)
const CODIFICADOR = `<!doctype html><script>
const ANCHO = ${W * DPR}, ALTO = ${H * DPR}, FPS = ${FPS};
window.codificar = async plan => {
  const config = { codec: 'avc1.640028', width: ANCHO, height: ALTO, bitrate: ${ESCRITORIO ? 12e6 : 8e6}, framerate: FPS, avc: { format: 'avc' } };
  if (!(await VideoEncoder.isConfigSupported(config)).supported) throw new Error('H.264 no disponible en este Chrome');
  const muestras = []; let avcC = null, fallo = null;
  const enc = new VideoEncoder({
    output: (chunk, meta) => {
      if (meta && meta.decoderConfig && meta.decoderConfig.description) avcC = new Uint8Array(meta.decoderConfig.description);
      const d = new Uint8Array(chunk.byteLength); chunk.copyTo(d); muestras.push({ d, clave: chunk.type === 'key' });
    },
    error: e => (fallo = e)
  });
  enc.configure(config);
  let actual = -1, mapa = null;
  for (let k = 0; k < plan.length; k++) {
    if (fallo) throw fallo;
    if (plan[k] !== actual) {
      if (mapa) mapa.close();
      mapa = await createImageBitmap(await (await fetch('/__cuadros/' + plan[k] + '.jpg')).blob());
      actual = plan[k];
    }
    const f = new VideoFrame(mapa, { timestamp: Math.round(k * 1e6 / FPS), duration: Math.round(1e6 / FPS) });
    enc.encode(f, { keyFrame: k % (FPS * 2) === 0 });
    f.close();
    while (enc.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
  }
  await enc.flush(); enc.close();
  window.salida = mp4(muestras, avcC);
  return window.salida.length;
};

// MP4 mínimo con una pista de video: ftyp + moov (al inicio, para reproducir sin esperar) + mdat
function mp4(muestras, avcC) {
  const ESCALA = FPS * 1000, PASO = 1000, n = muestras.length;
  const u32 = v => [v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255], u16 = v => [v >>> 8 & 255, v & 255];
  const txt = s => [...s].map(c => c.charCodeAt(0));
  const caja = (tipo, ...partes) => { const cuerpo = partes.flat(Infinity); return [...u32(cuerpo.length + 8), ...txt(tipo), ...cuerpo]; };
  const completa = (tipo, ver, flags, ...p) => caja(tipo, ver, u32(flags).slice(1), ...p);
  const matriz = [0x00010000, 0, 0, 0, 0x00010000, 0, 0, 0, 0x40000000].flatMap(u32);
  const durMs = Math.round(n * 1000 / FPS);
  const stsd = completa('stsd', 0, 0, u32(1), caja('avc1', Array(6).fill(0), u16(1), Array(16).fill(0), u16(ANCHO), u16(ALTO),
    u32(0x00480000), u32(0x00480000), u32(0), u16(1), Array(32).fill(0), u16(0x18), u16(0xFFFF), caja('avcC', [...avcC])));
  const claves = muestras.map((m, i) => m.clave ? i + 1 : 0).filter(Boolean);
  const tabla = offset => caja('stbl', stsd,
    completa('stts', 0, 0, u32(1), u32(n), u32(PASO)),
    completa('stss', 0, 0, u32(claves.length), claves.map(u32)),
    completa('stsc', 0, 0, u32(1), u32(1), u32(n), u32(1)),
    completa('stsz', 0, 0, u32(0), u32(n), muestras.map(m => u32(m.d.length))),
    completa('stco', 0, 0, u32(1), u32(offset)));
  const moov = offset => caja('moov',
    completa('mvhd', 0, 0, u32(0), u32(0), u32(1000), u32(durMs), u32(0x00010000), u16(0x0100), Array(10).fill(0), matriz, Array(24).fill(0), u32(2)),
    caja('trak',
      completa('tkhd', 0, 3, u32(0), u32(0), u32(1), u32(0), u32(durMs), Array(8).fill(0), u16(0), u16(0), u16(0), u16(0), matriz, u32(ANCHO << 16), u32(ALTO << 16)),
      caja('mdia',
        completa('mdhd', 0, 0, u32(0), u32(0), u32(ESCALA), u32(n * PASO), u16(0x55C4), u16(0)),
        completa('hdlr', 0, 0, u32(0), txt('vide'), Array(12).fill(0), txt('Vitrina Gamarra'), 0),
        caja('minf',
          completa('vmhd', 0, 1, Array(8).fill(0)),
          caja('dinf', completa('dref', 0, 0, u32(1), completa('url ', 0, 1))),
          tabla(offset)))));
  const ftyp = caja('ftyp', txt('isom'), u32(512), txt('isom'), txt('iso2'), txt('avc1'), txt('mp41'));
  const datos = muestras.reduce((s, m) => s + m.d.length, 0);
  const cabeza = new Uint8Array([...ftyp, ...moov(ftyp.length + moov(0).length + 8), ...u32(datos + 8), ...txt('mdat')]);
  const out = new Uint8Array(cabeza.length + datos);
  out.set(cabeza); let p = cabeza.length;
  for (const m of muestras) { out.set(m.d, p); p += m.d.length; }
  return out;
}
</script>`;

const servidor = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/__codificador.html') { res.writeHead(200, { 'Content-Type': TIPOS['.html'] }); return res.end(CODIFICADOR); }
  // La web se carga en un marco de 432 px (diseño de celular) ampliado 2.5 veces, así la captura sale nítida a 1080 px
  if (u === '/__marco.html') {
    res.writeHead(200, { 'Content-Type': TIPOS['.html'] });
    return res.end(`<!doctype html><style>html{overflow:hidden;background:#15203B}body{margin:0}iframe{width:${W}px;height:${H}px;border:0;transform:scale(${DPR});transform-origin:0 0}</style><iframe id="app" src="/index.html"></iframe>`);
  }
  const archivo = u.startsWith('/__cuadros/') ? path.join(CUADROS, path.basename(u)) : path.join(RAIZ, u.endsWith('/') ? u + 'index.html' : u);
  fs.readFile(archivo, (e, d) => {
    if (e) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(d);
  });
});

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url); this.id = 0; this.pendientes = new Map(); this.oyentes = [];
    this.ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (m.id) { const p = this.pendientes.get(m.id); this.pendientes.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
      else this.oyentes.forEach(o => o(m));
    };
    this.listo = new Promise(r => (this.ws.onopen = r));
  }
  send(method, params = {}) { const id = ++this.id; this.ws.send(JSON.stringify({ id, method, params })); return new Promise((res, rej) => this.pendientes.set(id, { res, rej })); }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  }
}

// Ayudas que se inyectan en la página: subtítulos, toque visible, scroll suave y cierre
const AYUDAS = `(() => {
  const s = document.createElement('style');
  s.textContent = \`
    #__cap { position: fixed; left: ${ESCRITORIO ? 48 : 14}px; right: ${ESCRITORIO ? 580 : 14}px; bottom: ${ESCRITORIO ? 40 : 132}px; z-index: 99; display: flex; justify-content: ${ESCRITORIO ? 'flex-start' : 'center'}; pointer-events: none; transition: opacity .18s, transform .18s; }
    #__cap span { background: #F3B612; color: #2A1E00; font: 800 ${ESCRITORIO ? 24 : 19}px/1.25 Figtree, system-ui, sans-serif; padding: ${ESCRITORIO ? '12px 22px' : '10px 16px'}; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.35); text-align: center; }
    #__cap.oculto { opacity: 0; transform: translateY(10px); }
    #__dedo { position: fixed; z-index: 100; width: 46px; height: 46px; margin: -23px 0 0 -23px; border-radius: 50%; background: rgba(243,182,18,.35); border: 3px solid #F3B612; pointer-events: none; transform: scale(.4); opacity: 0; transition: transform .25s, opacity .25s; }
    #__dedo.on { transform: scale(1); opacity: 1; }
    #toast { display: none !important; }
    #__fin { position: fixed; inset: 0; z-index: 200; background: #15203B; color: #EEF1F7; display: flex; flex-direction: column; justify-content: center; gap: 18px; padding: ${ESCRITORIO ? '0 160px' : '36px'}; opacity: 0; transition: opacity .6s; }
    #__fin.on { opacity: 1; }
    #__fin b { font: 900 ${ESCRITORIO ? 96 : 54}px/0.95 Archivo, 'Arial Narrow', sans-serif; font-stretch: 72%; text-transform: uppercase; }
    #__fin b span { color: #F3B612; }
    #__fin p { margin: 0; font: 500 ${ESCRITORIO ? 26 : 19}px/1.45 Figtree, system-ui, sans-serif; opacity: .9; }
    #__fin code { font: 700 ${ESCRITORIO ? 26 : 18}px JetBrains Mono, monospace; color: #F3B612; }
    #__fin i { display: block; max-width: ${ESCRITORIO ? '520px' : 'none'}; border-top: 2px dashed rgba(243,182,18,.55); }
  \`;
  document.head.append(s);
  const cap = document.createElement('div'); cap.id = '__cap'; cap.className = 'oculto'; cap.innerHTML = '<span></span>'; document.body.append(cap);
  const dedo = document.createElement('div'); dedo.id = '__dedo'; document.body.append(dedo);
  const esp = ms => new Promise(r => setTimeout(r, ms));
  window.__cap = async t => { if (!t) { cap.className = 'oculto'; return; } cap.className = 'oculto'; await esp(140); cap.firstChild.textContent = t; cap.className = ''; };
  window.__scroll = (sel, destino, ms = 550) => new Promise(r => {
    const el = sel ? document.querySelector(sel) : document.scrollingElement;
    const desde = el.scrollTop, t0 = performance.now();
    const paso = ahora => { const k = Math.min(1, (ahora - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.scrollTop = desde + (destino - desde) * e; k < 1 ? requestAnimationFrame(paso) : r(); };
    requestAnimationFrame(paso);
  });
  window.__centrar = (sel, cont, ms) => {
    const el = document.querySelector(sel), c = cont ? document.querySelector(cont) : document.scrollingElement;
    const r = el.getBoundingClientRect(), base = cont ? c.getBoundingClientRect().top : 0;
    return __scroll(cont, c.scrollTop + r.top - base - (cont ? c.clientHeight : innerHeight) * .35, ms);
  };
  window.__tocar = async sel => {
    const el = document.querySelector(sel), r = el.getBoundingClientRect();
    dedo.style.left = (r.left + r.width / 2) + 'px'; dedo.style.top = (r.top + Math.min(r.height / 2, 60)) + 'px';
    dedo.className = 'on'; await esp(280); el.click(); await esp(120); dedo.className = '';
  };
  Element.prototype.scrollIntoView = function () { __scroll(null, document.scrollingElement.scrollTop + this.getBoundingClientRect().top - 64, 550); };
  window.__fin = () => {
    const f = document.createElement('div'); f.id = '__fin';
    f.innerHTML = '<b>Vitrina <span>Gamarra</span></b><i></i><p>Busca la prenda, encuentra el stand y escribe a la tienda.</p><p>Pruébalo:<br><code>vitrina-gamarra.vercel.app</code></p>';
    document.body.append(f); requestAnimationFrame(() => f.classList.add('on'));
  };
})()`;

async function main() {
  await new Promise(r => servidor.listen(PUERTO, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEPURACION}`, `--user-data-dir=${path.join(TMP, 'perfil')}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', '--autoplay-policy=no-user-gesture-required',
    // Usa la tarjeta gráfica para dibujar la página: la captura va más fluida
    '--enable-gpu', '--use-angle=d3d11', '--enable-gpu-rasterization', '--ignore-gpu-blocklist', 'about:blank'], { stdio: 'ignore' });
  try {
    let paginas;
    for (let i = 0; i < 50 && !paginas; i++) { try { paginas = await (await fetch(`http://127.0.0.1:${DEPURACION}/json/list`)).json(); } catch { await espera(200); } }
    const cdp = new CDP(paginas.find(p => p.type === 'page').webSocketDebuggerUrl);
    await cdp.listo;
    await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: W * DPR, height: H * DPR, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'no-preference' }] });

    console.log('Cargando la página…');
    const cargada = new Promise(r => cdp.oyentes.push(m => m.method === 'Page.loadEventFired' && r()));
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PUERTO}/__marco.html` });
    await cargada;
    // Todo lo que pasa en la web se ejecuta dentro del marco
    const app = js => cdp.eval(`document.getElementById('app').contentWindow.eval(${JSON.stringify(js)})`);
    // Precarga fuentes y todas las fotos para que no aparezcan a medias en el video
    await app(`(async () => {
      try { localStorage.clear(); } catch (e) {}
      await document.fonts.ready;
      const urls = Object.values(VG_FOTOS).flat().map(([id]) => 'https://images.unsplash.com/photo-' + id + '?w=700&q=70&auto=format&fit=crop');
      await Promise.all(urls.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
      document.querySelectorAll('img[loading]').forEach(i => i.loading = 'eager');
      return urls.length;
    })()`);
    await app(AYUDAS);
    await espera(800);

    // Captura continua de la pantalla, guardando el momento de cada cuadro (en segundos)
    const cuadros = [];
    cdp.oyentes.push(m => {
      if (m.method !== 'Page.screencastFrame') return;
      fs.writeFileSync(path.join(CUADROS, cuadros.length + '.jpg'), Buffer.from(m.params.data, 'base64'));
      cuadros.push(m.params.metadata.timestamp);
      cdp.send('Page.screencastFrameAck', { sessionId: m.params.sessionId });
    });
    // Un punto casi invisible cambia en cada cuadro para que Chrome siga enviando cuadros aunque la pantalla esté quieta
    await cdp.eval(`(() => { const p = document.createElement('div'); p.style.cssText = 'position:fixed;right:0;bottom:0;width:1px;height:1px;z-index:300;background:#000;opacity:.01'; document.body.append(p); let v = 0; (function f() { p.style.opacity = (v ^= 1) ? '.01' : '.02'; requestAnimationFrame(f); })(); })()`);
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: ESCRITORIO ? 80 : 90, maxWidth: W * DPR, maxHeight: H * DPR, everyNthFrame: 1 });
    const inicio = Date.now();

    console.log('Grabando el recorrido…');
    const paso = async (js, ms) => { await app(js); await espera(ms); };
    if (ESCRITORIO) {
      await paso(`__cap('¿Buscas ropa en Gamarra?')`, 2200);
      await paso(`__cap('1. Busca la prenda')`, 450);
      await paso(`__tocar('[data-sugerencia="jean mom"]')`, 1100);
      await paso(`__cap('2. Mira en qué stand está'); __centrar('#plan', null, 500)`, 2000);
      await paso(`__tocar('#list .card')`, 350);
      await paso(`__cap('3. Abre la vitrina de la tienda')`, 1100);
      await paso(`__centrar('.tabs', '.d-scroll', 600)`, 1000);
      await paso(`__cap('4. Revisa precio, tallas y stock'); __tocar('.tagcard')`, 1000);
      await paso(`__centrar('.specs', '.d-scroll', 600)`, 1200);
      await paso(`__cap('5. Escríbele por WhatsApp')`, 300);
      await paso(`__tocar('#wa')`, 1100);
      await paso(`__cap(''); __fin()`, 3000);
    } else {
      await paso(`__cap('¿Buscas ropa en Gamarra?')`, 2000);
      await paso(`__scroll(null, 260)`, 600);
      await paso(`__cap('1. Busca la prenda')`, 350);
      await paso(`__tocar('[data-sugerencia="jean mom"]')`, 900);
      await paso(`__cap('2. Mira en qué stand está'); __centrar('#plan', null, 500)`, 1600);
      await paso(`__centrar('#list', null, 500)`, 550);
      await paso(`__tocar('#list .card')`, 350);
      await paso(`__cap('3. Abre la vitrina de la tienda')`, 1000);
      await paso(`__centrar('.tabs', '.d-scroll', 600)`, 900);
      await paso(`__cap('4. Revisa precio, tallas y stock'); __tocar('.tagcard')`, 1000);
      await paso(`__centrar('.specs', '.d-scroll', 600)`, 1100);
      await paso(`__cap('5. Escríbele por WhatsApp')`, 300);
      await paso(`__tocar('#wa')`, 1000);
      await paso(`__cap(''); __fin()`, 2800);
    }

    await cdp.send('Page.stopScreencast');
    await espera(300);
    const segundos = (Date.now() - inicio) / 1000;
    console.log(`Capturados ${cuadros.length} cuadros en ${segundos.toFixed(1)} s`);

    // Línea de tiempo a 30 cuadros por segundo: en cada instante se muestra el último cuadro capturado
    const t0 = cuadros[0], plan = [];
    const total = Math.round((cuadros[cuadros.length - 1] - t0) * FPS);
    for (let k = 0, i = 0; k <= total; k++) {
      while (i + 1 < cuadros.length && cuadros[i + 1] - t0 <= k / FPS) i++;
      plan.push(i);
    }

    console.log(`Codificando ${plan.length} cuadros (${(plan.length / FPS).toFixed(1)} s de video)…`);
    const cargado = new Promise(r => { const o = m => m.method === 'Page.loadEventFired' && r(); cdp.oyentes.push(o); });
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PUERTO}/__codificador.html` });
    await cargado;
    const bytes = await cdp.eval(`codificar(${JSON.stringify(plan)})`);
    const partes = [];
    for (let i = 0; i < bytes; i += 1 << 20) {
      partes.push(Buffer.from(await cdp.eval(`(() => { let s = ''; const b = salida.subarray(${i}, ${i + (1 << 20)}); for (let j = 0; j < b.length; j += 8192) s += String.fromCharCode.apply(null, b.subarray(j, j + 8192)); return btoa(s); })()`), 'base64'));
    }
    const archivo = path.join(__dirname, ESCRITORIO ? 'vitrina-gamarra-demo-escritorio.mp4' : 'vitrina-gamarra-demo.mp4');
    fs.writeFileSync(archivo, Buffer.concat(partes));
    console.log(`Listo: ${archivo} (${(bytes / 1048576).toFixed(1)} MB, H.264 ${W * DPR}×${H * DPR})`);
  } finally {
    chrome.kill();
    servidor.close();
    await espera(500);
    if (process.env.CONSERVAR) console.log('Cuadros conservados en', CUADROS);
    else try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
