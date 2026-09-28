/*
 * Dibuja una tarjeta social por página del sitio: las ocho de servicio, las seis
 * de giro y la calculadora.
 *
 *   npm run og:paginas          (necesita el sitio servido; BASE_URL si no es :4173)
 *
 * Por qué. Medido el 2026-09-27: **quince páginas compartían `og-image.png`**, la
 * tarjeta genérica del sitio. Es el mismo problema que ya se resolvió en los
 * ocho recorridos y con el mismo argumento: lo primero que ve alguien cuando le
 * mandas un enlace no es la página, es la tarjeta. Quince enlaces distintos que
 * se previsualizan idénticos parecen el mismo enlace mandado quince veces, y
 * quien recibe el de nómina y después el de comercio no distingue uno de otro.
 *
 * Qué lleva cada una: la etiqueta con el nombre de la solución o del giro, el
 * titular de esa misma página y su resumen. Todo sale de `src/data/servicios.js`
 * y `src/data/industrias.js` —no hay un texto nuevo que pueda desfasarse del de
 * la página— y va en la paleta del sitio, morado y papel cálido, porque son
 * páginas del sitio. Los recorridos usan su propia paleta de cobre a propósito:
 * su tarjeta tiene que parecerse a lo que abre.
 *
 * Sin ilustración y a todo el ancho: lo que distingue una tarjeta de otra es el
 * titular, y el dibujo de la operación es el mismo para las quince, así que
 * ponerlo las volvería a igualar.
 */
import sharp from 'sharp'
import { writeFileSync, existsSync, statSync, unlinkSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { capturar, exigirDistintos } from './capturar.js'
import { SERVICIOS } from '../src/data/servicios.js'
import { INDUSTRIAS } from '../src/data/industrias.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.BASE_URL || 'http://localhost:4173'
const edge = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* El titular se parte en dos: lo de antes de los dos puntos va en morado, que es
   el acento de la marca, y el resto en tinta. «ERP: finanzas, inventario y…» */
function titular(h1) {
  const i = h1.indexOf(':')
  if (i < 0) return esc(h1)
  return '<span>' + esc(h1.slice(0, i)) + '</span>' + esc(h1.slice(i))
}

const pagina = ({ lbl, h1, resumen }) => `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:'Inter';src:url('${base}/fonts/inter-latin.woff2') format('woff2');font-weight:100 900}
  @font-face{font-family:'Azeret Mono';src:url('${base}/fonts/azeret-mono-subset.woff2') format('woff2');font-weight:400 700}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;
    font-family:Inter,system-ui,sans-serif;color:#0b1739;
    background:radial-gradient(120% 90% at 82% 18%,#ebe6fb 0%,#f7f5f1 55%,#ffffff 100%);
    display:flex;flex-direction:column;justify-content:center;padding:64px 80px}
  .marca{display:flex;align-items:center;gap:12px;margin-bottom:auto}
  .marca b{font-size:30px;font-weight:700;letter-spacing:-.02em}
  .lbl{font-family:'Azeret Mono',monospace;font-size:17px;font-weight:500;
    letter-spacing:.1em;text-transform:uppercase;color:#9b5721;margin-bottom:20px}
  h1{font-size:62px;line-height:1.04;letter-spacing:-.015em;font-weight:700;max-width:19ch}
  h1 span{color:#5326d9}
  p{margin-top:26px;font-size:25px;line-height:1.4;color:#465069;max-width:36ch}
  .pie{margin-top:auto;font-family:'Azeret Mono',monospace;font-size:16px;
    letter-spacing:.06em;color:#465069}
</style>
<div class="marca">
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 19H4.8a2.8 2.8 0 1 1 .05-5.6 4 4 0 0 1 4.58-5.31A5 5 0 0 1 19 11a4 4 0 0 1 0 8Z" stroke="#0b1739" stroke-width="1.8"/>
    <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#fff" stroke-width="4.6"/>
    <path d="M15.5 8h4v4" stroke="#fff" stroke-width="4.6"/>
    <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#5326d9" stroke-width="1.9"/>
    <path d="M15.5 8h4v4" stroke="#5326d9" stroke-width="1.9"/>
  </svg><b>Loomware</b>
</div>
<div class="lbl">${esc(lbl)}</div>
<h1>${titular(h1)}</h1>
<p>${esc(resumen)}</p>
<div class="pie">loomware.com.mx</div>`

/* Las quince páginas, cada una con lo que ya está escrito en sus datos. */
const TARJETAS = [
  ...SERVICIOS.map((s) => ({
    destino: `public/og/servicios-${s.slug}.png`,
    lbl: s.nombre,
    h1: s.h1,
    resumen: s.resumen,
  })),
  ...INDUSTRIAS.map((g) => ({
    destino: `public/og/industrias-${g.id}.png`,
    lbl: g.nombre,
    h1: g.h1,
    resumen: g.dolor.split('. ')[0] + '.',
  })),
  {
    destino: 'public/og/calculadora.png',
    lbl: 'Con tus propios números',
    h1: '¿Cuánto te cuesta tu Excel?',
    resumen: 'Seis preguntas de un toque y el número se mueve solo. Sin dejar un dato.',
  },
]

mkdirSync(resolve(raiz, 'public/og'), { recursive: true })
const tmpHtml = resolve(raiz, 'dist/_ogp.html')
const tmpPng = resolve(raiz, 'dist/_ogp.png')
let total = 0

for (const t of TARJETAS) {
  writeFileSync(tmpHtml, pagina(t))
  await capturar({
    edge,
    url: `${base}/_ogp.html?v=${Date.now()}`,
    destino: tmpPng,
    perfil: resolve(raiz, 'dist/_ogp-perfil'),
    quien: t.destino,
  })
  const destino = resolve(raiz, t.destino)
  await sharp(tmpPng).png({ quality: 82, compressionLevel: 9, palette: true }).toFile(destino)
  const kb = statSync(destino).size / 1024
  total += kb
  console.log(`  · ${t.destino.replace('public/og/', '')}: ${kb.toFixed(0)} KB`)
}

for (const f of [tmpHtml, tmpPng]) if (existsSync(f)) unlinkSync(f)

/* La prueba que faltaba: quince tarjetas que existen para distinguir quince
   enlaces no sirven de nada si dos salen iguales. */
const distintas = exigirDistintos(TARJETAS.map((t) => resolve(raiz, t.destino)))
console.log(`\n  ✓ ${TARJETAS.length} tarjetas, las ${distintas} distintas · ${total.toFixed(0)} KB\n`)
