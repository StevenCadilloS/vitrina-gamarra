// Vitrina Gamarra: búsqueda, plano de galería y vitrina de cada tienda.
(function () {
  const DATA = window.VG_DATA;
  const { categorias: CATS, descripciones: DESC, ventas: VENTA } = window.VG_CATALOGO;

  const TIENDAS = DATA.tiendas.map(t => ({ ...t, piso: Math.floor(t.stand / 100), posicion: t.stand % 100 }));

  // Las prendas y tiendas sin foto propia reciben una foto referencial de js/fotos.js, repartidas en orden.
  const FOTOS = window.VG_FOTOS || {};
  const referencia = (lista, i) => {
    if (!lista || !lista.length) return null;
    const [id, autor, pagina] = lista[i % lista.length];
    return { src: `https://images.unsplash.com/photo-${id}?w=700&q=70&auto=format&fit=crop`, autor, pagina: `https://unsplash.com/photos/${pagina}` };
  };
  const contador = {};
  TIENDAS.forEach((t, i) => {
    t.ref = t.foto ? null : referencia(FOTOS.tiendas, i);
    t.prendas.forEach(p => {
      contador[p.categoria] = (contador[p.categoria] || 0) + 1;
      p.ref = p.foto ? null : referencia(FOTOS[p.categoria], contador[p.categoria] - 1);
    });
  });
  const galeria = id => DATA.galerias.find(g => g.id === id);
  const tienda = id => TIENDAS.find(t => t.id === id);

  // Vistas y consultas que suma este visitante (en su navegador). Con backend irían a una base de datos.
  let local = { vistas: {}, consultas: {} };
  try { local = JSON.parse(localStorage.getItem('vg-local')) || local; } catch (e) {}
  const guardar = () => { try { localStorage.setItem('vg-local', JSON.stringify(local)); } catch (e) {} };
  const vistas = p => p.vistas + (local.vistas[p.codigo] || 0);
  const consultas = t => t.consultas + (local.consultas[t.id] || 0);

  // Envía eventos a Vercel Analytics si está activado; si no, no hace nada.
  const registrar = (nombre, datos) => { try { window.va && window.va('event', { name: nombre, data: datos }); } catch (e) {} };

  const state = { g: DATA.galerias[0].id, piso: 1, q: '', cat: '', venta: '', abierta: null, tab: 'top', sel: null };
  const $ = id => document.getElementById(id);
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtVistas = v => v >= 1000 ? (v / 1000).toFixed(1).replace('.0', '') + ' mil' : String(v);
  const mapsUrl = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const dibujo = p => `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="${CATS[p.categoria].dibujo}" fill="${p.colores[0]}" stroke="rgba(0,0,0,.35)" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
  const foto = p => {
    const src = p.foto || (p.ref && p.ref.src);
    return src ? `<img src="${esc(src)}" alt="${esc(p.nombre)}" loading="lazy">` : dibujo(p);
  };
  const fotoTienda = t => {
    const src = t.foto || (t.ref && t.ref.src);
    return src ? `<img src="${esc(src)}" alt="Tienda ${esc(t.nombre)}" loading="lazy">` : '';
  };
  const credito = r => r ? `Foto referencial: <a href="${r.pagina}" target="_blank" rel="noopener">${esc(r.autor)} / Unsplash</a>` : '';

  function prendasQueCoinciden(t) {
    if (state.venta && !(t.venta === state.venta || t.venta === 'ambos')) return [];
    const palabras = norm(state.q.trim()).split(/\s+/).filter(Boolean);
    const coincideTienda = palabras.length && palabras.every(w => norm(t.nombre).includes(w));
    return t.prendas.filter(p => {
      if (state.cat && p.categoria !== state.cat) return false;
      if (!palabras.length || coincideTienda) return true;
      const texto = norm(p.nombre + ' ' + CATS[p.categoria].nombre);
      return palabras.every(w => texto.includes(w) || texto.includes(w.replace(/s$/, '')));
    });
  }
  const filtrando = () => !!(state.q.trim() || state.cat || state.venta);

  function renderFiltros() {
    $('cats').innerHTML = '<span class="label">Prenda</span>' + [['', 'Todas'], ...Object.entries(CATS).map(([k, v]) => [k, v.nombre])]
      .map(([k, l]) => `<button class="chip" data-cat="${k}" aria-pressed="${state.cat === k}">${l}</button>`).join('');
    $('sales').innerHTML = '<span class="label">Venta</span>' + [['', 'Cualquiera'], ['mayor', 'Por mayor'], ['menor', 'Por menor']]
      .map(([k, l]) => `<button class="chip" data-venta="${k}" aria-pressed="${state.venta === k}">${l}</button>`).join('');
  }

  function renderPlano() {
    const gal = galeria(state.g);
    $('galTabs').innerHTML = DATA.galerias.map(x => `<button class="gal-tab" role="tab" data-g="${x.id}" aria-selected="${x.id === state.g}">${esc(x.nombre)}</button>`).join('');
    $('galName').textContent = gal.nombre;
    $('galAddr').textContent = gal.direccion;
    $('mapsLink').href = mapsUrl(gal.mapa);
    $('floors').innerHTML = Array.from({ length: gal.pisos }, (_, i) => i + 1).map(f => {
      const n = filtrando() ? TIENDAS.filter(t => t.galeria === state.g && t.piso === f && prendasQueCoinciden(t).length).length : 0;
      return `<button class="floor" data-piso="${f}" aria-pressed="${f === state.piso}" aria-label="Piso ${f}">P${f}${n ? `<span class="n">${n}</span>` : ''}</button>`;
    }).join('');

    const W = 600, sw = 84, gap = 8, x0 = 48, topY = 18, h = 96, corrY = topY + h + 8, corrH = 56, botY = corrY + corrH + 8;
    let svg = `<svg viewBox="0 0 ${W} ${botY + h + 18}" role="img" aria-label="Plano del piso ${state.piso}">
      <defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="var(--empty)"/><line x1="0" y1="0" x2="0" y2="8" stroke="var(--line)" stroke-width="2"/></pattern></defs>
      <rect class="corr" x="0" y="${corrY}" width="${W}" height="${corrH}" rx="6"/>
      <text class="corr-t" x="${W / 2}" y="${corrY + corrH / 2 + 4}" text-anchor="middle">PASADIZO</text>
      ${state.piso === 1 ? `<text class="mark" x="8" y="${corrY + corrH / 2 + 4}">◀ Entrada</text>` : ''}
      <text class="mark" x="${W - 8}" y="${corrY + corrH / 2 + 4}" text-anchor="end">Escalera ▲</text>`;
    for (let pos = 1; pos <= 12; pos++) {
      const x = x0 + ((pos - 1) % 6) * (sw + gap), y = pos <= 6 ? topY : botY;
      const num = state.piso * 100 + pos;
      const t = TIENDAS.find(st => st.galeria === state.g && st.stand === num);
      if (!t) {
        svg += `<g class="empty-st"><rect x="${x}" y="${y}" width="${sw}" height="${h}" rx="6"/><text x="${x + 8}" y="${y + 20}">${num}</text></g>`;
        continue;
      }
      const hit = filtrando() && prendasQueCoinciden(t).length;
      const cls = ['stand', hit ? 'hit' : '', filtrando() && !hit ? 'dim' : '', state.abierta === t.id ? 'active' : ''].join(' ');
      const w = t.nombre.split(' '), mitad = Math.ceil(w.length / 2);
      svg += `<g class="${cls}" data-tienda="${t.id}" tabindex="0" role="button" aria-label="Stand ${num}, ${esc(t.nombre)}">
        <rect class="box" x="${x}" y="${y}" width="${sw}" height="${h}" rx="6"/>
        <text class="num" x="${x + 8}" y="${y + 20}">${num}</text>
        <text class="nm" x="${x + 8}" y="${y + h - 26}">${esc(w.slice(0, mitad).join(' '))}</text><text class="nm" x="${x + 8}" y="${y + h - 11}">${esc(w.slice(mitad).join(' '))}</text></g>`;
    }
    $('plan').innerHTML = svg + '</svg>';
  }

  function renderLista() {
    const filas = TIENDAS.map(t => ({ t, m: prendasQueCoinciden(t) })).filter(r => r.m.length);
    filas.sort((a, b) => (b.t.galeria === state.g) - (a.t.galeria === state.g) || Math.max(...b.m.map(vistas)) - Math.max(...a.m.map(vistas)));
    $('resTitle').textContent = filtrando() ? 'Resultados' : 'Tiendas registradas';
    $('resCount').textContent = `${filas.length} tiendas · ${filas.reduce((n, r) => n + r.m.length, 0)} prendas`;
    if (!filas.length) { $('list').innerHTML = '<p class="none">No encontramos esa prenda en estas galerías. Prueba con otra palabra, por ejemplo "polera" o "jean".</p>'; return; }
    $('list').innerHTML = filas.map(({ t, m }) => {
      const top = [...m].sort((a, b) => vistas(b) - vistas(a));
      return `<button class="card" data-tienda="${t.id}">
        <div class="shop-pic">${fotoTienda(t)}</div>
        <div><h3>${esc(t.nombre)}</h3><div class="loc">${esc(galeria(t.galeria).nombre)} · Piso ${t.piso} · Stand ${t.stand}</div></div>
        <span class="badge">${VENTA[t.venta]}</span>
        <div class="thumbs">${top.slice(0, 4).map(p => `<div class="thumb" title="${esc(p.nombre)}">${foto(p)}</div>`).join('')}${m.length > 4 ? `<span class="more">+${m.length - 4}</span>` : ''}</div>
      </button>`;
    }).join('');
  }

  function fichaHtml(t, p) {
    return `<div class="detail">
      <button class="back" data-volver>← Volver al catálogo</button>
      <div class="d-photo">${foto(p)}</div>
      ${p.ref ? `<span class="credit">${credito(p.ref)}</span>` : ''}
      <h3>${esc(p.nombre)}</h3>
      <div class="price"><span class="u">S/ ${p.precioUnidad} c/u</span>${t.venta !== 'menor' ? `<span class="d">S/ ${p.precioDocena} la docena</span>` : ''}</div>
      <p class="desc">${esc(p.descripcion || DESC[p.categoria])}</p>
      <dl class="specs">
        <dt>Tela</dt><dd>${esc(p.tela)}</dd>
        <dt>Tallas</dt><dd class="mono">${esc(p.tallas)}</dd>
        <dt>Colores</dt><dd><span class="sw">${p.colores.map(c => `<i style="background:${esc(c)}"></i>`).join('')}<span>${p.colores.length} colores</span></span></dd>
        <dt>Stock</dt><dd>${p.stock} unidades</dd>
        <dt>Pedido</dt><dd>${t.venta === 'menor' ? 'Desde 1 unidad' : t.venta === 'mayor' ? 'Mínimo media docena por modelo' : 'Desde 1 unidad; precio por mayor desde media docena'}</dd>
        <dt>Código</dt><dd class="mono">${esc(p.codigo)}</dd>
        <dt>Vistas</dt><dd>${fmtVistas(vistas(p))}</dd>
      </dl>
    </div>`;
  }

  function mensajeWhatsapp(t, p) {
    return p ? `Hola, vi su ${p.nombre} (código ${p.codigo}, S/ ${p.precioUnidad}) en Vitrina Gamarra. ¿Tienen stock?`
      : `Hola, vi su tienda ${t.nombre} en Vitrina Gamarra. Quisiera más información.`;
  }

  function renderTienda() {
    const d = $('drawer');
    document.documentElement.classList.toggle('bloqueado', !!state.abierta);
    if (!state.abierta) { d.hidden = true; $('backdrop').hidden = true; return; }
    const t = tienda(state.abierta), gal = galeria(t.galeria);
    const orden = [...t.prendas].sort((a, b) => vistas(b) - vistas(a));
    const mostradas = state.tab === 'top' ? orden.slice(0, 4) : orden;
    const sel = t.prendas.find(p => p.codigo === state.sel);
    const lado = t.posicion <= 6 ? 'lado izquierdo' : 'lado derecho';
    const ruta = t.piso === 1 ? `Entra por ${gal.entrada} y avanza por el pasadizo; el stand ${t.stand} está al ${lado}.`
      : `Sube por la escalera al piso ${t.piso}; el stand ${t.stand} está al ${lado} del pasadizo.`;
    // La foto, el encabezado y el catálogo comparten un solo scroll: la foto se va al deslizar y el nombre queda fijo arriba.
    const previo = d.querySelector('.d-scroll');
    const scroll = previo ? previo.scrollTop : 0;
    d.innerHTML = `
      <div class="d-scroll">
      <div class="d-hero">${fotoTienda(t)}${t.ref ? `<span class="credit">${credito(t.ref)}</span>` : ''}</div>
      <div class="d-head">
        <div class="d-top"><h2 id="dName">${esc(t.nombre)}</h2><button class="d-close" id="close" aria-label="Cerrar tienda">Cerrar</button></div>
        <div class="d-loc">${esc(gal.nombre)} › Piso ${t.piso} › Stand ${t.stand}</div>
        <div class="d-meta">${VENTA[t.venta]} · ${[...new Set(t.prendas.map(p => CATS[p.categoria].nombre))].join(', ')}</div>
      </div>
      <div class="d-body">
        <div class="howto"><b>Cómo llegar</b>${ruta}<br><a class="maps" href="${mapsUrl(gal.mapa)}" target="_blank" rel="noopener">Abrir ${esc(gal.nombre)} en Google Maps ↗</a></div>
        ${sel ? fichaHtml(t, sel) : `
        <div class="stats">
          <div class="stat"><strong>${fmtVistas(t.prendas.reduce((n, p) => n + vistas(p), 0))}</strong><span>vistas este mes</span></div>
          <div class="stat"><strong>${consultas(t)}</strong><span>consultas por WhatsApp</span></div>
          <div class="stat"><strong>${t.prendas.length}</strong><span>prendas</span></div>
        </div>
        <div class="tabs" role="tablist">
          <button class="tab" role="tab" data-tab="top" aria-selected="${state.tab === 'top'}">Más vistas</button>
          <button class="tab" role="tab" data-tab="all" aria-selected="${state.tab === 'all'}">Todo el catálogo</button>
        </div>
        <div class="grid">${mostradas.map(p => `
          <button class="tagcard" data-prenda="${esc(p.codigo)}">
            <div class="img">${state.tab === 'top' ? `<span class="rank">#${orden.indexOf(p) + 1}</span>` : ''}${foto(p)}</div>
            <div class="info"><span class="nm">${esc(p.nombre)}</span>
              <div class="price"><span class="u">S/ ${p.precioUnidad}</span>${t.venta !== 'menor' ? `<span class="d">S/ ${p.precioDocena} la docena</span>` : '<span class="d">c/u</span>'}</div>
              <span class="views">${fmtVistas(vistas(p))} vistas</span></div>
          </button>`).join('')}</div>`}
      </div>
      </div>
      <div class="d-foot">
        <span class="msg">Mensaje: "${esc(mensajeWhatsapp(t, sel))}"</span>
        <button class="wa" id="wa">Escribir por WhatsApp</button>
        <span class="phone">+${t.whatsapp.slice(0, 2)} ${t.whatsapp.slice(2, 5)} ${t.whatsapp.slice(5, 8)} ${t.whatsapp.slice(8)}${DATA.demo ? ' (número de ejemplo)' : ''}</span>
      </div>`;
    d.hidden = false; $('backdrop').hidden = false;
    d.querySelector('.d-scroll').scrollTop = scroll;
  }
  const subirScroll = () => { const s = $('drawer').querySelector('.d-scroll'); if (s) s.scrollTop = 0; };

  function render() { renderFiltros(); renderPlano(); renderLista(); renderTienda(); }

  // Pantalla de inicio: cifras, maqueta del celular con la tienda más vista y prendas destacadas
  const SUGERENCIAS = ['polo oversize', 'jean mom', 'casaca', 'polera', 'vestido', 'buzo jogger'];
  function renderInicio() {
    const prendas = TIENDAS.flatMap(t => t.prendas.map(p => ({ t, p })));
    const desde = Math.min(...prendas.map(x => x.p.precioUnidad));
    $('heroStats').innerHTML = [[DATA.galerias.length, 'galerías'], [TIENDAS.length, 'tiendas'], [prendas.length, 'prendas'], [`S/ ${desde}`, 'precio desde']]
      .map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('');
    $('sug').innerHTML = '<span>Prueba:</span>' + SUGERENCIAS.map(s => `<button type="button" class="sug-chip" data-sugerencia="${s}">${s}</button>`).join('');

    const total = t => t.prendas.reduce((n, p) => n + vistas(p), 0);
    const estrella = [...TIENDAS].sort((a, b) => total(b) - total(a))[0];
    const top = [...estrella.prendas].sort((a, b) => vistas(b) - vistas(a)).slice(0, 4);
    $('phone').innerHTML = `
      <div class="ph-hero">${fotoTienda(estrella)}</div>
      <div class="ph-head"><b>${esc(estrella.nombre)}</b><span>Piso ${estrella.piso} · Stand ${estrella.stand}</span></div>
      <div class="ph-grid">${top.map(p => `<div><div class="ph-img">${foto(p)}</div><span>S/ ${p.precioUnidad}</span></div>`).join('')}</div>
      <div class="ph-wa">Escribir por WhatsApp</div>`;
    $('pricetag').innerHTML = `<small>${esc(top[0].nombre)}</small><b>S/ ${top[0].precioUnidad}</b><span>Stand ${estrella.stand}</span>`;
    $('miniPlan').innerHTML = Array.from({ length: 12 }, (_, i) => `<i style="--d:${(i * 7) % 12}"></i>`).join('');

    const destacados = prendas.sort((a, b) => vistas(b.p) - vistas(a.p)).slice(0, 10);
    $('rail').innerHTML = destacados.map(({ t, p }) => `
      <button class="rail-item" data-ver="${t.id}|${esc(p.codigo)}">
        <div class="rail-img">${foto(p)}</div>
        <span class="nm">${esc(p.nombre)}</span>
        <span class="price"><span class="u">S/ ${p.precioUnidad}</span><span class="views">${fmtVistas(vistas(p))} vistas</span></span>
        <span class="loc">${esc(t.nombre)} · Stand ${t.stand}</span>
      </button>`).join('');
  }

  // La palabra del titular rota entre prendas (se detiene si el usuario pidió menos movimiento)
  function rotarTitular() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    setInterval(() => {
      const el = $('rot');
      el.classList.add('sale');
      setTimeout(() => { i = (i + 1) % SUGERENCIAS.length; el.textContent = SUGERENCIAS[i]; el.classList.remove('sale'); }, 250);
    }, 2600);
  }

  function buscarDesdeInicio(q) {
    state.q = q; $('q').value = q; $('hq').value = q;
    registrar('Búsqueda', { q, desde: 'inicio' });
    render();
    $('explorar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  // El buscador de la barra superior aparece cuando el de la portada ya no se ve
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => document.documentElement.classList.toggle('en-portada', e.isIntersecting)).observe($('heroForm'));
  }

  // Cada tienda tiene su propio enlace: index.html#LB-103.
  // Abrir una tienda agrega una entrada al historial, así el botón Atrás del celular la cierra.
  let abiertaConHistorial = false;
  function abrirTienda(id, desdeEnlace) {
    const t = tienda(id);
    if (!t) return;
    Object.assign(state, { abierta: id, sel: null, tab: 'top', g: t.galeria, piso: t.piso });
    if (!desdeEnlace) { history.pushState(null, '', '#' + id); abiertaConHistorial = true; }
    registrar('Tienda abierta', { tienda: id });
    render(); subirScroll(); $('close') && $('close').focus();
  }
  function cerrarTienda(desdeEnlace) {
    const id = state.abierta;
    if (!id) return;
    state.abierta = null;
    if (!desdeEnlace) {
      if (abiertaConHistorial) history.back();
      else history.replaceState(null, '', location.pathname + location.search);
    }
    abiertaConHistorial = false;
    render();
    const st = document.querySelector(`.stand[data-tienda="${id}"]`);
    st && st.focus();
  }
  // Sincroniza la tienda abierta con el enlace (botón Atrás/Adelante o enlace editado a mano)
  function seguirEnlace() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (tienda(id)) { if (state.abierta !== id) abrirTienda(id, true); }
    else if (state.abierta) cerrarTienda(true);
  }
  window.addEventListener('popstate', seguirEnlace);
  window.addEventListener('hashchange', seguirEnlace);

  let toastT;
  function toast(msg) { const el = $('toast'); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 3800); }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-cat],[data-venta],[data-g],[data-piso],[data-tienda],[data-tab],[data-prenda],[data-volver],[data-sugerencia],[data-ver],#close,#wa,#backdrop');
    if (!el) return;
    const ds = el.dataset;
    if (ds.sugerencia) return buscarDesdeInicio(ds.sugerencia);
    if (ds.ver) {
      const [tid, codigo] = ds.ver.split('|');
      abrirTienda(tid);
      state.sel = codigo; local.vistas[codigo] = (local.vistas[codigo] || 0) + 1; guardar();
      registrar('Prenda vista', { prenda: codigo, desde: 'inicio' });
      renderTienda(); subirScroll();
      return;
    }
    if (ds.cat !== undefined) { state.cat = ds.cat; return render(); }
    if (ds.venta !== undefined) { state.venta = ds.venta; return render(); }
    if (ds.g) { state.g = ds.g; state.piso = 1; return render(); }
    if (ds.piso) { state.piso = +ds.piso; return render(); }
    if (ds.tienda) return abrirTienda(ds.tienda);
    if (ds.tab) { state.tab = ds.tab; state.sel = null; return renderTienda(); }
    if (ds.volver !== undefined) { state.sel = null; return renderTienda(); }
    if (ds.prenda) {
      state.sel = ds.prenda;
      local.vistas[ds.prenda] = (local.vistas[ds.prenda] || 0) + 1; guardar();
      registrar('Prenda vista', { prenda: ds.prenda });
      renderTienda(); subirScroll();
      return;
    }
    if (el.id === 'close' || el.id === 'backdrop') return cerrarTienda(false);
    if (el.id === 'wa') {
      const t = tienda(state.abierta), p = t.prendas.find(x => x.codigo === state.sel);
      local.consultas[t.id] = (local.consultas[t.id] || 0) + 1; guardar();
      registrar('WhatsApp', { tienda: t.id, prenda: p ? p.codigo : '' });
      if (DATA.demo) { renderTienda(); return toast('Consulta registrada. Es un número de ejemplo, así que no se abre WhatsApp.'); }
      window.open(`https://wa.me/${t.whatsapp}?text=${encodeURIComponent(mensajeWhatsapp(t, p))}`, '_blank', 'noopener');
      renderTienda();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.abierta) cerrarTienda(false);
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.stand')) { e.preventDefault(); abrirTienda(e.target.dataset.tienda); }
  });
  $('searchForm').addEventListener('submit', e => { e.preventDefault(); state.q = $('q').value; registrar('Búsqueda', { q: state.q }); render(); });
  $('q').addEventListener('input', e => { state.q = e.target.value; renderPlano(); renderLista(); });

  $('heroForm').addEventListener('submit', e => { e.preventDefault(); buscarDesdeInicio($('hq').value); });

  $('demoTag').hidden = $('demoFoot').hidden = !DATA.demo;
  renderInicio();
  rotarTitular();
  render();
  seguirEnlace();
})();
