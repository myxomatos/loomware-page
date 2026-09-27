/*
 * Dibuja el hero: la pantalla de inicio del sistema. Dos archivos, uno por forma.
 *
 *   npm run hero:sistema
 *     → public/hero-sistema.svg        580×440, para escritorio
 *     → public/hero-sistema-movil.svg  390×360, para celular
 *
 * Qué muestra y por qué. Bind, Holded, Alegra y Xero enseñan su sistema en la
 * portada; el estudio comparativo lo marcó como la mayor diferencia que quedaba
 * contra ellos.
 *
 * La primera versión abría un solo módulo —el ERP— y dejaba a los otros siete
 * como nombres en una lista. Ésta enseña **el inicio del sistema, donde cada uno
 * de los ocho módulos pone su propio recuadro**: el embudo del CRM, el dinero
 * por cobrar del ERP, la dispersión de la nómina, los pedidos de la tienda, los
 * flujos que corren solos, el módulo a medida en producción, la disponibilidad
 * de la nube y los técnicos en ruta. Es lo que de verdad ve alguien al abrir un
 * sistema de ocho módulos, y de paso dice en una imagen lo que el sitio dice en
 * palabras: que son ocho piezas de una sola cosa.
 *
 * Las dos reglas que lo gobiernan:
 *
 * 1. **No se enseña la pantalla de un cliente.** No se puede y no se debe: lo
 *    que Loomware construye es de quien lo pagó. Así que es una pantalla de
 *    ejemplo y lo dice adentro, en su esquina, igual que los recorridos dicen
 *    «cifras de ejemplo».
 *
 * 2. **Los nombres de cliente no se inventan.** Donde iría una razón social van
 *    renglones grises. Un nombre falso en una portada se lee como un cliente
 *    real; y así se ve de verdad una demostración pública de un sistema con
 *    datos de terceros, o sea que el dibujo dice algo cierto sobre cómo
 *    trabajamos. Las cifras y los estados sí van escritos: no identifican a
 *    nadie.
 *
 * Sin fecha en la barra: una fecha escrita envejece la imagen el día que pasa.
 * En su lugar va el selector de periodo, que es lo que trae cualquier sistema.
 *
 * Por qué dos archivos. El de escritorio se muestra a ~535 px y el de celular a
 * ~345. Con el mismo, en celular la barra lateral caería a 7 px y no se leería;
 * la versión de celular cambia la rejilla por una lista, que es como se ve un
 * sistema en un teléfono, y conserva los ocho módulos con su cifra. El navegador
 * descarga sólo uno, porque el `<picture>` del hero elige por ancho.
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
  verdeSuave: '#dcefe5',
  papel: '#f5f3ef',
  blanco: '#ffffff',
  filete: '#e0ddd5',
  filete2: '#cac5ba',
  gris: '#d7d3ca',
  sans: 'Inter,system-ui,-apple-system,Segoe UI,sans-serif',
  mono: "'Azeret Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
}

/*
 * Los ocho módulos y lo que cada uno pone en el inicio.
 *   nombre  como lo llama el sitio (barra lateral)
 *   corto   para la etiqueta del recuadro, que es angosta
 *   cifra   el dato grande
 *   pie     qué es esa cifra
 *   figura  el dibujito de la derecha del recuadro
 */
const MODULOS = [
  { nombre: 'CRM', corto: 'CRM', cifra: '18', pie: 'tratos abiertos', figura: 'embudo' },
  { nombre: 'ERP', corto: 'ERP', cifra: '$184,500', pie: 'por cobrar', figura: 'barras' },
  { nombre: 'Nómina', corto: 'NÓMINA', cifra: '42', pie: 'en la dispersión', figura: 'avance' },
  { nombre: 'Comercio en línea', corto: 'COMERCIO', cifra: '37', pie: 'pedidos hoy', figura: 'linea' },
  { nombre: 'Automatización', corto: 'AUTOMATIZACIÓN', cifra: '6', pie: 'flujos corriendo', figura: 'flujo' },
  { nombre: 'Software a medida', corto: 'A MEDIDA', cifra: 'v2.4', pie: 'módulo de rutas', figura: 'sello' },
  { nombre: 'Infraestructura cloud', corto: 'CLOUD', cifra: '99.9%', pie: 'disponibilidad', figura: 'dias' },
  { nombre: 'Apps móviles', corto: 'APPS', cifra: '12', pie: 'técnicos en ruta', figura: 'checks' },
]

const ALT =
  'Pantalla de ejemplo del inicio de un sistema Loomware: los ocho módulos —CRM, ' +
  'ERP, nómina, comercio en línea, automatización, software a medida, ' +
  'infraestructura cloud y apps móviles— cada uno con su propio dato: tratos ' +
  'abiertos, dinero por cobrar, gente en la dispersión, pedidos del día, flujos ' +
  'corriendo, el módulo a medida en producción, la disponibilidad y los técnicos ' +
  'en ruta.'

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

/* La marca, dibujada como en el logotipo del sitio. */
const marca = (x, y, e) =>
  `<g transform="translate(${x} ${y}) scale(${e})">` +
  `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="none" stroke="${C.tinta}" stroke-width="1.8" stroke-linejoin="round"/>` +
  `<path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" fill="none" stroke="${C.morado}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M15.5 8h4v4" fill="none" stroke="${C.morado}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  '</g>'

/*
 * Las figuritas de cada recuadro. Todas caben en una caja de 58×34 y se dibujan
 * desde su esquina superior izquierda, para poder acomodarlas sin pensar.
 */
function figura(tipo, x, y) {
  const g = []
  switch (tipo) {
    case 'embudo': // CRM: cuatro etapas que se angostan
      ;[56, 42, 30, 17].forEach((w, i) => {
        g.push(
          `<rect x="${x}" y="${y + i * 9}" width="${w}" height="6" rx="3" fill="${i === 3 ? C.morado : C.filete2}"/>`,
        )
      })
      break
    case 'barras': // ERP: seis semanas de facturación
      ;[10, 16, 13, 21, 18, 26].forEach((h, i) => {
        g.push(
          `<rect x="${x + i * 10}" y="${y + 32 - h}" width="7" height="${h}" rx="2" fill="${i >= 4 ? C.morado : C.filete2}"/>`,
        )
      })
      break
    case 'avance': // Nómina: el cálculo, terminado
      g.push(`<rect x="${x}" y="${y + 10}" width="56" height="7" rx="3.5" fill="${C.filete}"/>`)
      g.push(`<rect x="${x}" y="${y + 10}" width="56" height="7" rx="3.5" fill="${C.verde}"/>`)
      g.push(texto(x, y + 30, 'cálculo listo', { tam: 7.5, color: C.verde }))
      break
    case 'linea': // Comercio: la curva del día
      g.push(
        `<polyline points="${x},${y + 28} ${x + 11},${y + 20} ${x + 22},${y + 24} ${x + 33},${y + 12} ${x + 44},${y + 16} ${x + 55},${y + 5}" fill="none" stroke="${C.morado}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      )
      g.push(`<circle cx="${x + 55}" cy="${y + 5}" r="2.6" fill="${C.morado}"/>`)
      break
    case 'flujo': // Automatización: tres pasos encadenados
      ;[0, 1, 2].forEach((i) => {
        const cx = x + 6 + i * 23
        g.push(`<circle cx="${cx}" cy="${y + 16}" r="5" fill="${C.moradoSuave}" stroke="${C.morado}" stroke-width="1.4"/>`)
        if (i < 2) {
          g.push(
            `<line x1="${cx + 6}" y1="${y + 16}" x2="${cx + 16}" y2="${y + 16}" stroke="${C.filete2}" stroke-width="1.6" stroke-dasharray="2 2"/>`,
          )
        }
      })
      break
    case 'sello': // A medida: el estado del módulo
      g.push(caja(x, y + 8, 58, 17, { r: 8.5, fill: C.verdeSuave }))
      g.push(texto(x + 29, y + 20, 'en producción', { tam: 7.5, peso: 600, color: C.verde, centro: true }))
      break
    case 'dias': // Cloud: siete días en verde
      ;[0, 1, 2, 3, 4, 5, 6].forEach((i) => {
        g.push(`<rect x="${x + i * 8.6}" y="${y + 12}" width="6" height="12" rx="1.6" fill="${C.verde}" opacity="${0.55 + i * 0.07}"/>`)
      })
      break
    case 'checks': // Apps: visitas cerradas
      ;[0, 1, 2].forEach((i) => {
        const yy = y + 5 + i * 11
        g.push(
          `<path d="M${x} ${yy + 3}l2.6 2.6L${x + 8} ${yy - 1}" fill="none" stroke="${i === 2 ? C.filete2 : C.verde}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        )
        g.push(`<rect x="${x + 14}" y="${yy}" width="${[40, 32, 26][i]}" height="4.5" rx="2.25" fill="${C.gris}"/>`)
      })
      break
    default:
      break
  }
  return g.join('')
}

const envolver = (w, h, partes) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" ` +
  `role="img" aria-label="${esc(ALT)}">${partes.join('')}</svg>`

/* ====================================================== escritorio: 580×420 === */
function escritorio() {
  const W = 580
  // 440 y no 420: con 420 el último renglón de recuadros se salía nueve píxeles
  // del marco. La ventana mide lo que su contenido necesita.
  const H = 440
  const p = []

  // Sombra corta y baja: la ventana se despega del papel sin parecer que flota.
  p.push(`<rect x="8" y="18" width="564" height="416" rx="16" fill="${C.tinta}" opacity="0.06"/>`)
  p.push(caja(2, 8, 576, 420, { r: 16, stroke: C.filete }))

  /* --- barra superior --- */
  p.push('<path d="M2 24a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v20H2Z" fill="#faf9f6"/>')
  p.push(`<line x1="2" y1="44" x2="578" y2="44" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(marca(18, 17, 0.82))
  p.push(texto(44, 31, 'Loomware', { tam: 13, peso: 700, color: C.tinta }))

  // Selector de periodo en vez de una fecha: una fecha escrita envejece el día
  // que pasa, y esto es lo que trae cualquier sistema.
  const PERIODOS = ['Hoy', 'Semana', 'Mes']
  p.push(caja(438, 15, 124, 21, { r: 10.5, fill: C.papel, stroke: C.filete }))
  let px = 440
  PERIODOS.forEach((t, i) => {
    const w = i === 0 ? 34 : i === 1 ? 50 : 34
    if (i === 0) p.push(caja(px, 17, w, 17, { r: 8.5, fill: C.blanco, stroke: C.filete }))
    p.push(
      texto(px + w / 2, 29, t, {
        tam: 9,
        peso: i === 0 ? 600 : 400,
        color: i === 0 ? C.tinta : C.apagado,
        centro: true,
      }),
    )
    px += w + 2
  })

  /* --- barra lateral: los ocho módulos con su nombre completo --- */
  const SB = 168
  p.push(`<path d="M2 44h${SB - 2}v384H18a16 16 0 0 1-16-16Z" fill="${C.papel}"/>`)
  p.push(`<line x1="${SB}" y1="44" x2="${SB}" y2="428" stroke="${C.filete}" stroke-width="1"/>`)

  // «Inicio» es lo que está abierto: es la pantalla que se está viendo.
  p.push(caja(8, 56, SB - 18, 26, { r: 7, fill: C.moradoSuave }))
  p.push(`<rect x="8" y="56" width="3" height="26" rx="1.5" fill="${C.morado}"/>`)
  p.push(`<circle cx="24" cy="69" r="3" fill="${C.morado}"/>`)
  p.push(texto(36, 73, 'Inicio', { tam: 11.5, peso: 600, color: C.morado }))

  p.push(texto(18, 104, 'MÓDULOS', { tam: 8.5, mono: true, peso: 500, ls: 1.4, color: C.cobre }))
  MODULOS.forEach((m, i) => {
    const y = 122 + i * 29
    p.push(`<circle cx="24" cy="${y}" r="3" fill="${C.filete2}"/>`)
    p.push(texto(36, y + 4, m.nombre, { tam: 11.5, color: C.texto }))
  })

  p.push(`<line x1="16" y1="374" x2="${SB - 16}" y2="374" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(texto(18, 394, 'Un solo sistema.', { tam: 10.5, peso: 600, color: C.tinta }))
  p.push(texto(18, 408, 'Todos escriben aquí.', { tam: 10.5, color: C.apagado }))

  /* --- el inicio: un recuadro por módulo --- */
  const X = SB + 18
  const FIN = 562
  p.push(texto(X, 72, 'Inicio', { tam: 14, peso: 700, color: C.tinta }))
  // La etiqueta que impide el malentendido: esto no es la pantalla de un cliente.
  p.push(caja(FIN - 118, 60, 118, 17, { r: 8.5, fill: C.cobreSuave }))
  p.push(
    texto(FIN - 59, 72, 'PANTALLA DE EJEMPLO', {
      tam: 7.5, mono: true, peso: 500, ls: 0.6, color: C.cobre, centro: true,
    }),
  )

  const COLS = 2
  const GX = 10
  const GY = 9
  const ancho = (FIN - X - GX) / COLS
  const alto = 75
  MODULOS.forEach((m, i) => {
    const cx = X + (i % COLS) * (ancho + GX)
    const cy = 90 + Math.floor(i / COLS) * (alto + GY)
    p.push(caja(cx, cy, ancho, alto, { r: 10, stroke: C.filete }))
    p.push(texto(cx + 13, cy + 18, m.corto, { tam: 7.5, mono: true, peso: 500, ls: 0.8, color: C.cobre }))
    p.push(texto(cx + 13, cy + 42, m.cifra, { tam: 17, peso: 700, color: C.tinta }))
    p.push(texto(cx + 13, cy + 57, m.pie, { tam: 8.5, color: C.apagado }))
    p.push(figura(m.figura, cx + ancho - 71, cy + 20))
  })

  return envolver(W, H, p)
}

/* ========================================================== celular: 390×360 === */
function celular() {
  const W = 390
  const H = 360
  const p = []
  const X = 18
  const FIN = 372

  p.push(`<rect x="6" y="12" width="378" height="344" rx="14" fill="${C.tinta}" opacity="0.06"/>`)
  p.push(caja(2, 4, 386, 348, { r: 14, stroke: C.filete }))

  p.push('<path d="M2 18a14 14 0 0 1 14-14h358a14 14 0 0 1 14 14v18H2Z" fill="#faf9f6"/>')
  p.push(`<line x1="2" y1="36" x2="388" y2="36" stroke="${C.filete}" stroke-width="1"/>`)
  p.push(marca(14, 10, 0.78))
  p.push(texto(38, 24, 'Loomware', { tam: 12.5, peso: 700, color: C.tinta }))
  p.push(caja(FIN - 96, 11, 96, 18, { r: 9, fill: C.papel, stroke: C.filete }))
  p.push(caja(FIN - 94, 13, 30, 14, { r: 7, fill: C.blanco, stroke: C.filete }))
  p.push(texto(FIN - 79, 23, 'Hoy', { tam: 8.5, peso: 600, color: C.tinta, centro: true }))
  p.push(texto(FIN - 42, 23, 'Semana', { tam: 8.5, color: C.apagado, centro: true }))

  p.push(texto(X, 60, 'Inicio', { tam: 13.5, peso: 700, color: C.tinta }))
  p.push(caja(FIN - 112, 49, 112, 16, { r: 8, fill: C.cobreSuave }))
  p.push(
    texto(FIN - 56, 60, 'PANTALLA DE EJEMPLO', {
      tam: 7.5, mono: true, peso: 500, ls: 0.5, color: C.cobre, centro: true,
    }),
  )

  /* En un teléfono un sistema se ve como lista, no como rejilla: los ocho
     módulos, cada uno con su cifra, uno por renglón. */
  MODULOS.forEach((m, i) => {
    const y = 84 + i * 33
    if (i % 2 === 1) p.push(caja(X - 8, y, FIN - X + 16, 29, { r: 7, fill: '#fafaf8' }))
    p.push(`<circle cx="${X + 5}" cy="${y + 15}" r="3" fill="${i === 0 ? C.morado : C.filete2}"/>`)
    p.push(texto(X + 18, y + 19, m.nombre, { tam: 11.5, color: C.texto }))
    p.push(texto(FIN - 66, y + 19, m.cifra, { tam: 12, peso: 700, color: C.tinta, fin: true }))
    p.push(texto(FIN, y + 19, m.pie, { tam: 8.5, color: C.apagado, fin: true }))
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
