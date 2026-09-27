/*
 * Dibuja public/hero-operacion.svg: la maraña de hoy contra un solo sistema.
 *
 *   npm run hero:dibujo
 *
 * **Ya no es el hero.** Desde el 22 de septiembre de 2026 la portada enseña la
 * pantalla del sistema (`scripts/hero-sistema.js`), porque eso es lo que hacen
 * Bind, Holded, Alegra y Xero y era la mayor diferencia que quedaba contra
 * ellos. Este dibujo se queda porque alimenta **la tarjeta social**
 * (`scripts/og-imagen.js`), que es donde su idea funciona mejor: se lee de un
 * vistazo y en miniatura, que es como se ve un enlace compartido.
 *
 * Qué muestra y por qué: el titular dice «Excel, WhatsApp y programas que no se
 * hablan entre sí», y esto es exactamente eso —la maraña de hoy a la izquierda
 * y un solo sistema a la derecha—. Se lee en dos segundos y sin interpretar, que
 * es lo que pide una portada. Antes hubo un render 3D de catálogo (no decía nada
 * cierto de Loomware) y después la nave del recorrido del ERP (era de una pieza
 * de venta y encerraba el mensaje en distribución).
 *
 * El lienzo mide 580×400 porque en escritorio se muestra a ~500 px: dibujarlo
 * más grande hacía que las etiquetas llegaran a 7 px y no se leyeran. Va por
 * código y no a mano para que la paleta salga de los mismos valores que el
 * sitio: si el morado o el cobre cambian, se corre otra vez. Pesa ~5 KB contra
 * los 40 del WebP que sustituyó y es nítido a cualquier tamaño.
 */
import { writeFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Los mismos valores de src/styles/tokens.css. Un SVG servido como <img> no ve
// las variables CSS del documento, así que aquí van escritos.
const C = {
  tinta: '#0b1739',
  apagado: '#5b6480',
  morado: '#5326d9',
  cobre: '#a35c23',
  papel: '#f5f3ef',
  blanco: '#ffffff',
  filete: '#dfdcd3',
  filete2: '#c9c4b8',
  mono: "'Azeret Mono',ui-monospace,monospace",
}

const W = 580
const H = 400

/* Renglón de texto simulado: da la forma del contenido sin inventar contenido. */
const renglon = (x, y, w, o = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="${C.filete2}" opacity="${o}"/>`

/* --- Izquierda: las herramientas sueltas, unidas todas contra todas --- */
const ALTO_ISLA = 46
const ISLAS = [
  { n: 'EXCEL', x: 24, y: 74, w: 104, giro: -2.5 },
  { n: 'WHATSAPP', x: 138, y: 44, w: 118, giro: 1.8 },
  { n: 'CORREO', x: 30, y: 160, w: 100, giro: 2.2 },
  { n: 'PAPEL', x: 146, y: 140, w: 92, giro: -3 },
  { n: 'SISTEMA VIEJO', x: 52, y: 246, w: 142, giro: 1.4 },
]

/* --- Derecha: el sistema, con las áreas que escriben y leen lo mismo --- */
const AREAS = ['VENTAS', 'ALMACÉN', 'COMPRAS', 'CONTABILIDAD', 'DIRECCIÓN']
const SX = 322
const SY = 62
const SW = 234
const SH = 252

let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="A la izquierda, cinco herramientas sueltas —Excel, WhatsApp, correo, papel y un sistema viejo— unidas por líneas cruzadas, cada una con su propia información. A la derecha, un solo sistema donde ventas, almacén, compras, contabilidad y dirección escriben y leen lo mismo.">`
s += `<rect width="${W}" height="${H}" rx="16" fill="${C.papel}"/>`

// La maraña primero, para que quede por debajo de las tarjetas.
ISLAS.forEach((a, i) =>
  ISLAS.slice(i + 1).forEach((b) => {
    s += `<path d="M${a.x + a.w / 2} ${a.y + ALTO_ISLA / 2} L${b.x + b.w / 2} ${b.y + ALTO_ISLA / 2}" stroke="${C.filete2}" stroke-width="1.1" opacity=".85"/>`
  }),
)
ISLAS.forEach((o) => {
  const cx = o.x + o.w / 2
  const cy = o.y + ALTO_ISLA / 2
  s += `<g transform="rotate(${o.giro} ${cx} ${cy})">`
  s += `<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${ALTO_ISLA}" rx="8" fill="${C.blanco}" stroke="${C.filete}"/>`
  s += `<text x="${o.x + 12}" y="${o.y + 22}" font-family="${C.mono}" font-size="12" font-weight="700" letter-spacing=".9" fill="${C.apagado}">${o.n}</text>`
  s += renglon(o.x + 12, o.y + 31, o.w - 40, 0.8)
  s += `</g>`
})
s += `<text x="26" y="${H - 28}" font-family="${C.mono}" font-size="12" font-weight="500" letter-spacing="1" fill="${C.apagado}">HOY · CADA UNO POR SU LADO</text>`

// La flecha: el único morado del dibujo, porque es el paso que vendemos.
const MX = 268
s += `<path d="M${MX} 190 H${MX + 38}" stroke="${C.morado}" stroke-width="2.4" stroke-linecap="round"/>`
s += `<path d="M${MX + 30} 183 L${MX + 39} 190 L${MX + 30} 197" fill="none" stroke="${C.morado}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`

s += `<rect x="${SX + 5}" y="${SY + 7}" width="${SW}" height="${SH}" rx="12" fill="${C.tinta}" opacity=".06"/>`
s += `<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="12" fill="${C.blanco}" stroke="${C.cobre}" stroke-width="1.4"/>`
s += `<text x="${SX + 18}" y="${SY + 28}" font-family="${C.mono}" font-size="12.5" font-weight="700" letter-spacing="1.1" fill="${C.cobre}">UN SOLO SISTEMA</text>`
AREAS.forEach((n, i) => {
  const y = SY + 46 + i * 40
  s += `<rect x="${SX + 14}" y="${y}" width="${SW - 28}" height="31" rx="7" fill="${C.papel}"/>`
  s += `<circle cx="${SX + 30}" cy="${y + 15.5}" r="3.6" fill="${C.cobre}"/>`
  s += `<text x="${SX + 42}" y="${y + 20}" font-family="${C.mono}" font-size="11.5" font-weight="700" letter-spacing=".8" fill="${C.tinta}">${n}</text>`
  s += renglon(SX + SW - 82, y + 13, 62, 0.9)
})
s += `<text x="${SX}" y="${H - 28}" font-family="${C.mono}" font-size="12" font-weight="500" letter-spacing="1" fill="${C.morado}">TODOS ESCRIBEN LO MISMO</text>`
s += '</svg>'

const destino = resolve(raiz, 'public/hero-operacion.svg')
writeFileSync(destino, s)
console.log(`  hero-operacion.svg: ${(statSync(destino).size / 1024).toFixed(1)} KB · ${W}×${H}`)
