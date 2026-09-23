/*
 * Dibuja el hero: la pantalla del sistema. Dos archivos, uno por forma.
 *
 *   npm run hero:sistema
 *     → public/hero-sistema.svg        580×400, para escritorio
 *     → public/hero-sistema-movil.svg  390×330, para celular
 *
 * Qué muestra y por qué. Bind, Holded, Alegra y Xero enseñan su sistema en la
 * portada; el estudio comparativo lo marcó como nuestra mayor pobreza visual.
 * Esto es esa pantalla: **un solo sistema con sus ocho módulos**, que es
 * literalmente lo que vende Loomware —«soluciones que se hablan entre sí»—, y
 * el de ERP abierto con sus cifras, su tabla y su gráfica.
 *
 * Las dos reglas que gobiernan este dibujo:
 *
 * 1. **No se enseña la pantalla de un cliente.** No se puede y no se debe: lo
 *    que Loomware construye es de quien lo pagó. Así que es una pantalla de
 *    ejemplo, y lo dice adentro, en su propia esquina. Igual que los recorridos
 *    dicen «cifras de ejemplo».
 *
 * 2. **Los nombres de cliente no se inventan.** Donde iría una razón social van
 *    renglones grises: un nombre falso en una portada se lee como un cliente
 *    real. Además así se ve de verdad una demostración pública de un sistema con
 *    datos de terceros, o sea que el dibujo dice algo cierto sobre cómo
 *    trabajamos. Los folios, los estados y los montos sí van escritos, porque no
 *    identifican a nadie.
 *
 * Por qué dos archivos. El de escritorio se muestra a ~535 px y el de celular a
 * ~358. Si se usara el mismo, en celular la barra lateral caería a 7 px y no se
 * leería nada; la versión de celular cambia la barra por una fila de módulos,
 * baja de tres cifras a dos y de cuatro renglones a tres. El navegador descarga
 * sólo uno, porque el `<picture>` del hero elige por ancho.
 *
 * Va por código para que la paleta salga de los mismos valores que el sitio: si
 * el morado o el cobre cambian, se corre otra vez.
 */
import { writeFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Los mismos valores de src/styles/tokens.css. Un SVG servido como <img> no ve
// las variables CSS del documento, así que aquí van escritos.
const C = {
  tinta: '#0b1739',
  texto: '#465069',
  apagado: '#5b6480',
  morado: '#5326d9',
  moradoSuave: '#e8e3fb',
  cobre: '#a35c23',
  cobreSuave: '#f6ebe0',
  verde: '#12643c',
  verdeSuave: '#e3f0e9',
  papel: '#f5f3ef',
  blanco: '#ffffff',
  filete: '#e0ddd5',
  filete2: '#cac5ba',
  gris: '#d7d3ca',
  sans: 'Inter,system-ui,-apple-system,Segoe UI,sans-serif',
  mono: "'Azeret Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
}

const MODULOS = [
  'CRM',
  'ERP',
  'Nómina',
  'Comercio en línea',
  'Automatización',
  'Software a medida',
  'Infraestructura cloud',
  'Apps móviles',
]
const ACTIVO = 1 // ERP: es el módulo abierto

/* En el teléfono los nombres van cortos, como en cualquier sistema: con los
   largos, la segunda fila de pestañas se salía y «Apps móviles» quedaba fuera
   del lienzo. Los nombres completos siguen en el texto alternativo. */
const MODULOS_CORTOS = [
  'CRM',
  'ERP',
  'Nómina',
  'Comercio',
  'Automatización',
  'A medida',
  'Cloud',
  'Apps',
]

const ALT =
  'Pantalla de ejemplo de un sistema Loomware: los ocho módulos —CRM, ERP, ' +
  'nómina, comercio en línea, automatización, software a medida, infraestructura ' +
  'cloud y apps móviles— y el de ERP abierto, con el dinero por cobrar, el ' +
  'inventario, los pedidos del día y la facturación por semana.'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const texto = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}"` +
  ` font-family="${o.mono ? C.mono : C.sans}"` +
  ` font-size="${o.tam || 12}"` +
  ` font-weight="${o.peso || 400}"` +
  ` fill="${o.color || C.texto}"` +
  (o.ls ? ` letter-spacing="${o.ls}"` : '') +
  (o.fin ? ' text-anchor="end"' : '') +
  (o.centro ? ' text-anchor="middle"' : '') +
  `>${esc(t)}</text>`

const caja = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 10}"` +
  ` fill="${o.fill || C.blanco}"` +
  (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : '') +
  '/>'

/* Renglón simulado: da la forma del contenido sin inventar contenido. Es lo que
   va donde iría el nombre de un cliente. */
const renglon = (x, y, w, o = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" fill="${C.gris}" opacity="${o}"/>`

/* La marca, dibujada como en el logotipo del sitio. */
const marca = (x, y, e) =>
  `<g transform="translate(${x} ${y}) scale(${e})">` +
  `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="none" stroke="${C.tinta}" stroke-width="1.8" stroke-linejoin="round"/>` +
  `<path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" fill="none" stroke="${C.morado}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M15.5 8h4v4" fill="none" stroke="${C.morado}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  '</g>'

const FILAS = [
  ['OC-1182', 96, 'Surtido', C.verde, C.verdeSuave, '$12,480'],
  ['OC-1183', 124, 'En ruta', C.morado, C.moradoSuave, '$8,950'],
  ['OC-1184', 78, 'Por surtir', C.cobre, C.cobreSuave, '$23,100'],
  ['OC-1185', 110, 'Facturado', C.apagado, '#eeebe4', '$5,640'],
]
const ALTURAS = [18, 26, 22, 31, 27, 36, 33, 42]

const envolver = (w, h, partes) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" ` +
  `role="img" aria-label="${esc(ALT)}">${partes.join('')}</svg>`

/* ====================================================== escritorio: 580×400 === */
function escritorio() {
  const W = 580
  const H = 400
  const p = []

  // Sombra corta y baja: la ventana se despega del papel sin parecer que flota.
  p.push(`<rect x="8" y="18" width="564" height="376" rx="16" fill="${C.tinta}" opacity="0.06"/>`)
  p.push(caja(2, 8, 576, 380, { r: 16, stroke: C.filete }))

  p.push('<path d="M2 24a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v20H2Z" fill="#faf9f6"/>')
  p.push(`<line x1="2" y1="44" x2="578" y2="44" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(marca(18, 17, 0.82))
  p.push(texto(44, 31, 'Loomware', { tam: 13, peso: 700, color: C.tinta }))
  p.push(caja(452, 16, 110, 20, { r: 10, fill: C.papel, stroke: C.filete }))
  p.push(texto(507, 30, 'Septiembre 2026', { tam: 9.5, mono: true, color: C.apagado, fin: true }))

  // --- barra lateral: ancha lo necesario para «Infraestructura cloud» ---
  const SB = 168
  p.push(`<path d="M2 44h${SB - 2}v344H18a16 16 0 0 1-16-16Z" fill="${C.papel}"/>`)
  p.push(`<line x1="${SB}" y1="44" x2="${SB}" y2="388" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(texto(18, 66, 'MÓDULOS', { tam: 8.5, mono: true, peso: 500, ls: 1.4, color: C.cobre }))

  MODULOS.forEach((m, i) => {
    const y = 80 + i * 30
    if (i === ACTIVO) {
      p.push(caja(8, y - 13, SB - 18, 26, { r: 7, fill: C.moradoSuave }))
      p.push(`<rect x="8" y="${y - 13}" width="3" height="26" rx="1.5" fill="${C.morado}"/>`)
    }
    p.push(`<circle cx="24" cy="${y}" r="3" fill="${i === ACTIVO ? C.morado : C.filete2}"/>`)
    p.push(
      texto(36, y + 4, m, {
        tam: 11.5,
        peso: i === ACTIVO ? 600 : 400,
        color: i === ACTIVO ? C.morado : C.texto,
      }),
    )
  })

  p.push(`<line x1="16" y1="336" x2="${SB - 16}" y2="336" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(texto(18, 356, 'Un solo sistema.', { tam: 10.5, peso: 600, color: C.tinta }))
  p.push(texto(18, 371, 'Todos escriben aquí.', { tam: 10.5, color: C.apagado }))

  // --- cuerpo ---
  const X = SB + 18
  const FIN = 562
  p.push(texto(X, 70, 'ERP · Distribuidora', { tam: 14, peso: 700, color: C.tinta }))
  // La etiqueta que impide el malentendido: esto no es la pantalla de un cliente.
  p.push(caja(FIN - 118, 58, 118, 17, { r: 8.5, fill: C.cobreSuave }))
  p.push(texto(FIN - 59, 70, 'PANTALLA DE EJEMPLO', { tam: 7.5, mono: true, peso: 500, ls: 0.6, color: C.cobre, centro: true }))

  const TARJETAS = [
    ['POR COBRAR', '$184,500', '14 vencidas', C.cobre],
    ['INVENTARIO', '1,248 pzas', '3 por resurtir', C.apagado],
    ['PEDIDOS HOY', '37', '+18% vs ayer', C.verde],
  ]
  const ancho = (FIN - X - 24) / 3
  TARJETAS.forEach(([lbl, cifra, pie, colorPie], i) => {
    const x = X + i * (ancho + 12)
    p.push(caja(x, 88, ancho, 64, { r: 10, stroke: C.filete }))
    p.push(texto(x + 12, 106, lbl, { tam: 8.5, mono: true, peso: 500, ls: 0.8, color: C.cobre }))
    p.push(texto(x + 12, 130, cifra, { tam: 19, peso: 700, color: C.tinta }))
    p.push(texto(x + 12, 144, pie, { tam: 9, color: colorPie }))
  })

  const enc = { tam: 8.5, mono: true, peso: 500, ls: 0.8, color: C.cobre }
  p.push(texto(X, 180, 'FOLIO', enc))
  p.push(texto(X + 74, 180, 'CLIENTE', enc))
  p.push(texto(X + 216, 180, 'ESTADO', enc))
  p.push(texto(FIN, 180, 'MONTO', { ...enc, fin: true }))
  p.push(`<line x1="${X}" y1="188" x2="${FIN}" y2="188" stroke="${C.filete}" stroke-width="1"/>`)

  FILAS.forEach(([folio, anchoNombre, estado, colorEstado, fondoEstado, monto], i) => {
    const y = 208 + i * 26
    if (i % 2 === 1) p.push(caja(X - 8, y - 13, FIN - X + 16, 24, { r: 6, fill: '#fafaf8' }))
    p.push(texto(X, y + 4, folio, { tam: 11, mono: true, color: C.texto }))
    p.push(renglon(X + 74, y, anchoNombre, 0.9))
    p.push(caja(X + 216, y - 9, 64, 17, { r: 8.5, fill: fondoEstado }))
    p.push(texto(X + 248, y + 3, estado, { tam: 8.5, peso: 600, color: colorEstado, centro: true }))
    p.push(texto(FIN, y + 4, monto, { tam: 11, mono: true, color: C.tinta, fin: true }))
  })

  p.push(texto(X, 336, 'FACTURADO POR SEMANA', enc))
  const BASE = 376
  ALTURAS.forEach((h, i) => {
    const x = X + i * 34
    const reciente = i >= ALTURAS.length - 2
    p.push(
      `<rect x="${x}" y="${BASE - h}" width="20" height="${h}" rx="3" fill="${reciente ? C.morado : C.filete2}"${reciente ? '' : ' opacity="0.85"'}/>`,
    )
  })
  p.push(`<line x1="${X}" y1="${BASE}" x2="${FIN}" y2="${BASE}" stroke="${C.filete}" stroke-width="1"/>`)

  return envolver(W, H, p)
}

/* ========================================================== celular: 390×330 === */
function celular() {
  const W = 390
  const H = 330
  const p = []
  const X = 18
  const FIN = 372

  p.push(`<rect x="6" y="12" width="378" height="314" rx="14" fill="${C.tinta}" opacity="0.06"/>`)
  p.push(caja(2, 4, 386, 318, { r: 14, stroke: C.filete }))

  p.push('<path d="M2 18a14 14 0 0 1 14-14h358a14 14 0 0 1 14 14v18H2Z" fill="#faf9f6"/>')
  p.push(`<line x1="2" y1="36" x2="388" y2="36" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(marca(14, 10, 0.78))
  p.push(texto(38, 24, 'Loomware', { tam: 12.5, peso: 700, color: C.tinta }))
  p.push(caja(FIN - 108, 10, 108, 18, { r: 9, fill: C.papel, stroke: C.filete }))
  p.push(texto(FIN - 54, 23, 'Septiembre 2026', { tam: 9, mono: true, color: C.apagado, centro: true }))

  /* Los módulos, en fila: en un teléfono un sistema se navega por pestañas, no
     por barra lateral, y así los ocho nombres caben legibles en dos renglones. */
  const FILA1 = [0, 1, 2, 3]
  const FILA2 = [4, 5, 6, 7]
  let x = X
  FILA1.forEach((i) => {
    const t = MODULOS_CORTOS[i]
    const w = 13 + t.length * 6.1
    const act = i === ACTIVO
    p.push(caja(x, 48, w, 21, { r: 10.5, fill: act ? C.moradoSuave : C.papel, stroke: act ? C.moradoSuave : C.filete }))
    p.push(texto(x + w / 2, 62, t, { tam: 10, peso: act ? 600 : 400, color: act ? C.morado : C.texto, centro: true }))
    x += w + 7
  })
  x = X
  FILA2.forEach((i) => {
    const t = MODULOS_CORTOS[i]
    const w = 13 + t.length * 6.1
    p.push(caja(x, 75, w, 21, { r: 10.5, fill: C.papel, stroke: C.filete }))
    p.push(texto(x + w / 2, 89, t, { tam: 10, color: C.texto, centro: true }))
    x += w + 7
  })

  p.push(texto(X, 122, 'ERP · Distribuidora', { tam: 13.5, peso: 700, color: C.tinta }))
  p.push(caja(FIN - 112, 111, 112, 16, { r: 8, fill: C.cobreSuave }))
  p.push(texto(FIN - 56, 122, 'PANTALLA DE EJEMPLO', { tam: 7.5, mono: true, peso: 500, ls: 0.5, color: C.cobre, centro: true }))

  /* Dos cifras, no tres: en un teléfono la tercera se vuelve ilegible. */
  const TARJETAS = [
    ['POR COBRAR', '$184,500', '14 vencidas', C.cobre],
    ['PEDIDOS HOY', '37', '+18% vs ayer', C.verde],
  ]
  const ancho = (FIN - X - 12) / 2
  TARJETAS.forEach(([lbl, cifra, pie, colorPie], i) => {
    const cx = X + i * (ancho + 12)
    p.push(caja(cx, 136, ancho, 62, { r: 10, stroke: C.filete }))
    p.push(texto(cx + 12, 154, lbl, { tam: 8.5, mono: true, peso: 500, ls: 0.8, color: C.cobre }))
    p.push(texto(cx + 12, 178, cifra, { tam: 20, peso: 700, color: C.tinta }))
    p.push(texto(cx + 12, 192, pie, { tam: 9, color: colorPie }))
  })

  const enc = { tam: 8.5, mono: true, peso: 500, ls: 0.8, color: C.cobre }
  p.push(texto(X, 222, 'FOLIO', enc))
  p.push(texto(X + 78, 222, 'CLIENTE', enc))
  p.push(texto(FIN, 222, 'MONTO', { ...enc, fin: true }))
  p.push(`<line x1="${X}" y1="230" x2="${FIN}" y2="230" stroke="${C.filete}" stroke-width="1"/>`)

  FILAS.slice(0, 3).forEach(([folio, anchoNombre, , , , monto], i) => {
    const y = 250 + i * 26
    if (i % 2 === 1) p.push(caja(X - 8, y - 13, FIN - X + 16, 24, { r: 6, fill: '#fafaf8' }))
    p.push(texto(X, y + 4, folio, { tam: 11, mono: true, color: C.texto }))
    p.push(renglon(X + 78, y, Math.min(anchoNombre, 150), 0.9))
    p.push(texto(FIN, y + 4, monto, { tam: 11, mono: true, color: C.tinta, fin: true }))
  })

  return envolver(W, H, p)
}

/* ------------------------------------------------------------------ salida --- */
for (const [nombre, svg] of [
  ['hero-sistema.svg', escritorio()],
  ['hero-sistema-movil.svg', celular()],
]) {
  const destino = resolve(raiz, 'public', nombre)
  writeFileSync(destino, svg)
  console.log(`  ✓ public/${nombre} · ${(statSync(destino).size / 1024).toFixed(1)} KB`)
}
