// Revisa que js/data.js, js/catalogo.js y js/fotos.js sean coherentes.
// Uso: node tests/validar-datos.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const window = {};
for (const f of ['js/data.js', 'js/catalogo.js', 'js/fotos.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(raiz, f), 'utf8'), { window }, { filename: f });
}
const { VG_DATA: data, VG_CATALOGO: cat, VG_FOTOS: fotos } = window;

const errores = [];
const error = msg => errores.push(msg);

const galerias = new Map();
for (const g of data.galerias) {
  if (galerias.has(g.id)) error(`Galería repetida: ${g.id}`);
  galerias.set(g.id, g);
  for (const campo of ['nombre', 'direccion', 'entrada', 'mapa']) if (!g[campo]) error(`Galería ${g.id} sin ${campo}`);
  if (!(Number.isInteger(g.pisos) && g.pisos >= 1)) error(`Galería ${g.id}: pisos inválido`);
}

const ids = new Set(), stands = new Set(), codigos = new Set();
for (const t of data.tiendas) {
  const donde = `Tienda ${t.id}`;
  if (ids.has(t.id)) error(`${donde}: id repetido`);
  ids.add(t.id);
  const g = galerias.get(t.galeria);
  if (!g) { error(`${donde}: galería "${t.galeria}" no existe`); continue; }
  if (t.id !== `${t.galeria}-${t.stand}`) error(`${donde}: el id debería ser ${t.galeria}-${t.stand}`);
  const piso = Math.floor(t.stand / 100), pos = t.stand % 100;
  if (piso < 1 || piso > g.pisos) error(`${donde}: piso ${piso} no existe en ${g.nombre}`);
  if (pos < 1 || pos > 12) error(`${donde}: posición ${pos} fuera del plano (1 a 12)`);
  const clave = `${t.galeria}-${t.stand}`;
  if (stands.has(clave)) error(`${donde}: stand ocupado por otra tienda`);
  stands.add(clave);
  if (!t.nombre || !t.nombre.trim()) error(`${donde}: sin nombre`);
  if (!cat.ventas[t.venta]) error(`${donde}: venta "${t.venta}" inválida`);
  if (!/^51\d{9}$/.test(t.whatsapp)) error(`${donde}: WhatsApp "${t.whatsapp}" debe ser 51 + 9 dígitos`);
  if (!(Number.isInteger(t.consultas) && t.consultas >= 0)) error(`${donde}: consultas inválido`);
  if (t.foto !== undefined && t.foto !== null && !fs.existsSync(path.join(raiz, t.foto))) error(`${donde}: no existe la foto ${t.foto}`);
  if (!t.prendas || !t.prendas.length) error(`${donde}: no tiene prendas`);
  const nombres = new Set();
  for (const p of t.prendas || []) {
    const dp = `${donde} / ${p.codigo}`;
    if (codigos.has(p.codigo)) error(`${dp}: código repetido`);
    codigos.add(p.codigo);
    if (nombres.has(p.nombre)) error(`${dp}: nombre repetido en la misma tienda`);
    nombres.add(p.nombre);
    if (!cat.categorias[p.categoria]) error(`${dp}: categoría "${p.categoria}" inválida`);
    for (const campo of ['nombre', 'tela', 'tallas']) if (!p[campo]) error(`${dp}: sin ${campo}`);
    if (!(p.precioUnidad > 0)) error(`${dp}: precio por unidad inválido`);
    if (t.venta !== 'menor') {
      if (!(p.precioDocena > 0)) error(`${dp}: falta precio por docena`);
      else if (p.precioDocena >= p.precioUnidad * 12) error(`${dp}: la docena (S/ ${p.precioDocena}) no es más barata que 12 unidades (S/ ${p.precioUnidad * 12})`);
    }
    if (!(Number.isInteger(p.stock) && p.stock >= 0)) error(`${dp}: stock inválido`);
    if (!(Number.isInteger(p.vistas) && p.vistas >= 0)) error(`${dp}: vistas inválido`);
    if (!Array.isArray(p.colores) || !p.colores.length) error(`${dp}: sin colores`);
    else for (const c of p.colores) if (!/^#[0-9A-Fa-f]{6}$/.test(c)) error(`${dp}: color "${c}" inválido`);
    if (new Set(p.colores).size !== (p.colores || []).length) error(`${dp}: colores repetidos`);
    if (p.foto && !fs.existsSync(path.join(raiz, p.foto))) error(`${dp}: no existe la foto ${p.foto}`);
    const ninos = /niñ|escolar/i.test(p.nombre);
    if (ninos && !/^2 /.test(p.tallas)) error(`${dp}: prenda de niños con tallas de adulto (${p.tallas})`);
  }
}

for (const [grupo, lista] of Object.entries(fotos)) {
  if (grupo !== 'tiendas' && !cat.categorias[grupo]) error(`Fotos: grupo "${grupo}" no es una categoría`);
  const vistos = new Set();
  for (const [id, autor, pagina] of lista) {
    if (!/^\d{10,13}-[0-9a-f]{12}$/.test(id)) error(`Fotos ${grupo}: id "${id}" con formato raro`);
    if (vistos.has(id)) error(`Fotos ${grupo}: foto repetida ${id}`);
    vistos.add(id);
    if (!autor || !pagina) error(`Fotos ${grupo}: ${id} sin autor o página`);
  }
}
for (const c of Object.keys(cat.categorias)) {
  if (!fotos[c] || !fotos[c].length) error(`Categoría ${c} sin fotos referenciales`);
  if (!cat.descripciones[c]) error(`Categoría ${c} sin descripción`);
}

const total = data.tiendas.reduce((n, t) => n + t.prendas.length, 0);
if (errores.length) {
  console.log(`✗ ${errores.length} problemas:\n- ` + errores.join('\n- '));
  process.exit(1);
}
console.log(`✓ Datos correctos: ${data.galerias.length} galerías, ${data.tiendas.length} tiendas, ${total} prendas.`);
