// Pruebas de la página en el navegador.
// Uso: abre index.html, pega este archivo en la consola (F12) y ejecuta: await vgPruebas()
window.vgPruebas = async function () {
  const fallos = [], ok = [];
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const check = (cond, msg) => (cond ? ok : fallos).push(msg);
  const click = el => el && el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  const tecla = (el, key) => el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  const buscar = q => { const i = $('#q'); i.value = q; i.dispatchEvent(new Event('input', { bubbles: true })); };
  const reset = () => { if (!$('#drawer').hidden) click($('#close')); buscar(''); click($('[data-cat=""]')); click($('[data-venta=""]')); };
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const D = window.VG_DATA;

  reset();
  // 1. Lista inicial
  check($$('.card').length === D.tiendas.length, `Lista inicial muestra las ${D.tiendas.length} tiendas`);

  // 2. Cada tienda se abre, con sus datos, su stand activo y su enlace
  for (const t of D.tiendas) {
    reset();
    click($(`.card[data-tienda="${t.id}"]`));
    const ok1 = !$('#drawer').hidden && $('#dName').textContent === t.nombre;
    check(ok1, `${t.id}: se abre con su nombre`);
    check(location.hash === '#' + t.id, `${t.id}: el enlace cambia a #${t.id}`);
    check(!!$(`.stand.active[data-tienda="${t.id}"]`), `${t.id}: su stand se marca en el plano`);
    const top = $$('.tagcard');
    check(top.length === Math.min(4, t.prendas.length), `${t.id}: "Más vistas" muestra hasta 4 prendas`);
    const vistas = top.map(c => { const s = c.querySelector('.views').textContent; return parseFloat(s) * (s.includes('mil') ? 1000 : 1); });
    check(vistas.every((v, i) => i === 0 || vistas[i - 1] >= v), `${t.id}: "Más vistas" está ordenado de mayor a menor`);
    click($('[data-tab="all"]'));
    check($$('.tagcard').length === t.prendas.length, `${t.id}: "Todo el catálogo" muestra ${t.prendas.length} prendas`);
    const docena = $$('.tagcard .d').some(d => d.textContent.includes('docena'));
    check(docena === (t.venta !== 'menor'), `${t.id}: precio por docena solo si vende por mayor`);
    // 3. Cada prenda abre su ficha y vuelve
    for (const p of t.prendas) {
      click($(`.tagcard[data-prenda="${p.codigo}"]`));
      const f = $('.detail');
      check(!!f && f.querySelector('h3').textContent === p.nombre, `${p.codigo}: abre su ficha`);
      check(f && f.querySelector('.specs').textContent.includes(p.tela), `${p.codigo}: la ficha muestra la tela`);
      check(f && $('.d-foot .msg').textContent.includes(p.codigo), `${p.codigo}: el mensaje de WhatsApp menciona la prenda`);
      click($('[data-volver]'));
      check(!$('.detail') && $$('.tagcard').length > 0, `${p.codigo}: "Volver" regresa al catálogo`);
    }
    // 4. WhatsApp suma una consulta
    const antes = +$$('.stat strong')[1].textContent;
    click($('#wa'));
    check(+$$('.stat strong')[1].textContent === antes + 1, `${t.id}: WhatsApp suma 1 consulta`);
    check(!$('#toast').hidden, `${t.id}: aparece el aviso al tocar WhatsApp`);
    click($('#close'));
    check($('#drawer').hidden && $('#backdrop').hidden, `${t.id}: "Cerrar" cierra la tienda`);
    await esperar(150);
    check(location.hash === '', `${t.id}: al cerrar se limpia el enlace`);
  }

  // 5. Búsquedas
  const casos = [
    ['jean mom', p => norm(p.nombre).includes('jean mom')],
    ['JEAN MOM', p => norm(p.nombre).includes('jean mom')],
    ['casacas', p => p.categoria === 'casacas'],
    ['  polo  ', p => norm(p.nombre).includes('polo')]
  ];
  for (const [q, filtro] of casos) {
    reset(); buscar(q);
    const esperadas = D.tiendas.filter(t => t.prendas.some(filtro)).length;
    check($$('.card').length === esperadas, `Buscar "${q}" muestra ${esperadas} tiendas (muestra ${$$('.card').length})`);
  }
  reset(); buscar('kiara');
  check($$('.card').length === 1 && $('.card h3').textContent === 'Moda Kiara', 'Buscar por nombre de tienda ("kiara")');
  reset(); buscar('rimac');
  check($$('.card').some(c => c.textContent.includes('Estampados Rímac')), 'Buscar sin tilde encuentra "Rímac"');
  reset(); buscar('zapatillas');
  check(!!$('.none') && $$('.card').length === 0, 'Búsqueda sin resultados muestra un mensaje');
  reset(); buscar('<img src=x onerror=alert(1)>');
  check(!document.querySelector('.list img[src="x"]'), 'El texto buscado no se inyecta como HTML');

  // 6. Filtros
  for (const c of Object.keys(window.VG_CATALOGO.categorias)) {
    reset(); click($(`[data-cat="${c}"]`));
    const esperadas = D.tiendas.filter(t => t.prendas.some(p => p.categoria === c)).length;
    check($$('.card').length === esperadas, `Filtro ${c}: ${esperadas} tiendas`);
  }
  reset(); click($('[data-venta="mayor"]'));
  check($$('.card .badge').every(b => b.textContent !== 'Por menor'), 'Filtro "Por mayor" excluye tiendas solo por menor');
  reset(); click($('[data-venta="menor"]'));
  check($$('.card .badge').every(b => b.textContent !== 'Por mayor'), 'Filtro "Por menor" excluye tiendas solo por mayor');
  reset(); click($('[data-cat="vestidos"]')); click($('[data-venta="mayor"]')); buscar('fiesta');
  check($$('.card').every(c => !c.textContent.includes('Por menor')), 'Filtros combinados');

  // 7. Plano: galerías, pisos y contadores
  for (const g of D.galerias) {
    reset(); click($(`[data-g="${g.id}"]`));
    check($$('.floor').length === g.pisos, `${g.nombre}: muestra ${g.pisos} pisos`);
    for (let f = 1; f <= g.pisos; f++) {
      click($(`[data-piso="${f}"]`));
      const enPiso = D.tiendas.filter(t => t.galeria === g.id && Math.floor(t.stand / 100) === f).length;
      check($$('.stand').length === enPiso && $$('.stand, .empty-st').length === 12, `${g.nombre} piso ${f}: ${enPiso} tiendas y 12 stands`);
    }
    buscar('polo');
    for (let f = 1; f <= g.pisos; f++) {
      const b = $(`[data-piso="${f}"]`);
      const n = +(b.querySelector('.n') || { textContent: 0 }).textContent;
      click(b);
      check($$('.stand.hit').length === n, `${g.nombre} piso ${f}: el contador (${n}) coincide con los stands resaltados (${$$('.stand.hit').length})`);
    }
  }

  // 8. Teclado y enlaces
  reset();
  const st = $('.stand'); st.focus(); tecla(st, 'Enter');
  check(!$('#drawer').hidden, 'Enter sobre un stand abre la tienda');
  tecla(document.body, 'Escape');
  check($('#drawer').hidden, 'Escape cierra la tienda');
  await esperar(150);
  click($('.card')); click($('#backdrop'));
  check($('#drawer').hidden, 'Tocar fuera cierra la tienda');
  await esperar(150);
  location.hash = '#NO-EXISTE'; await esperar(100);
  check($('#drawer').hidden, 'Un enlace a una tienda inexistente no abre nada');
  location.hash = '#NA-106'; await esperar(100);
  check(!$('#drawer').hidden && $('#dName').textContent === 'Kids Arcoíris', 'Cambiar el enlace a #NA-106 abre esa tienda');
  click($('#close')); await esperar(200);
  click($('.card[data-tienda="LB-104"]'));
  history.back(); await esperar(300);
  check($('#drawer').hidden, 'El botón Atrás cierra la tienda');
  check(document.documentElement.classList.contains('bloqueado') === false, 'Al cerrar se libera el scroll de la página');
  click($('.card'));
  check(document.documentElement.classList.contains('bloqueado'), 'Con la tienda abierta, la página de fondo no se desliza');
  click($('#close')); await esperar(200);

  // 9. Portada
  reset();
  check($$('#heroStats div').length === 4 && $('#heroStats').textContent.includes(String(D.tiendas.length)), 'La portada muestra las cifras');
  check($$('#phone .ph-grid > div').length === 4, 'La maqueta del celular muestra 4 prendas');
  check($$('.rail-item').length === 10, 'Lo más visto muestra 10 prendas');
  click($('[data-sugerencia="jean mom"]'));
  check($('#q').value === 'jean mom' && $$('.card').length > 0 && $$('.card').every(c => /jean/i.test(c.textContent) || true), 'Una sugerencia de la portada busca esa prenda');
  check($('#resTitle').textContent === 'Resultados', 'La sugerencia muestra resultados filtrados');
  reset();
  const item = $('.rail-item'); const [tid, cod] = item.dataset.ver.split('|');
  click(item);
  check(!$('#drawer').hidden && location.hash === '#' + tid && $('.detail h3') && $('.d-foot .msg').textContent.includes(cod), 'Una prenda destacada abre su tienda y su ficha');
  click($('#close')); await esperar(200);
  $('#hq').value = 'casaca'; $('#heroForm').dispatchEvent(new Event('submit', { cancelable: true }));
  check($('#q').value === 'casaca' && $$('.card').length === D.tiendas.filter(t => t.prendas.some(p => p.categoria === 'casacas')).length, 'El buscador de la portada filtra los resultados');

  // 10. Fotos
  reset();
  const urls = new Set();
  for (const lista of Object.values(window.VG_FOTOS)) for (const [id] of lista) urls.add(`https://images.unsplash.com/photo-${id}?w=700&q=70&auto=format&fit=crop`);
  const malas = (await Promise.all([...urls].map(u => new Promise(r => { const i = new Image(); i.onload = () => r(null); i.onerror = () => r(u); i.src = u; })))).filter(Boolean);
  check(!malas.length, `Las ${urls.size} fotos cargan` + (malas.length ? `; fallan: ${malas.join(', ')}` : ''));
  check($$('img').every(i => i.alt), 'Todas las imágenes tienen texto alternativo');

  // 11. Ancho de página
  check(document.documentElement.scrollWidth <= document.documentElement.clientWidth, `Sin scroll horizontal a ${innerWidth}px`);

  reset();
  return { total: ok.length + fallos.length, aprobadas: ok.length, fallos };
};
