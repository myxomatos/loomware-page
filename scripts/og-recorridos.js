/*
 * Dibuja una tarjeta social por recorrido: public/recorridos/og-<slug>.png,
 * 1200×630.
 *
 *   npm run og:recorridos       (necesita el sitio servido; BASE_URL si no es :4173)
 *
 * Por qué. Los ocho recorridos compartían `og-image.png`, la tarjeta genérica
 * del sitio. Y estas páginas **existen para mandarse por WhatsApp**: lo primero
 * que ve el prospecto no es la página, es la tarjeta del enlace. Ocho enlaces
 * distintos que se previsualizan idénticos parecen el mismo enlace mandado
 * ocho veces, y el que recibe el del ERP y después el de nómina no distingue
 * uno de otro.
 *
 * Cada tarjeta lleva la escena del propio recorrido —la bodega con su camión,
 * el tablero de corcho, los dos maniquíes—, que es lo mejor que tiene esa
 * página y lo único que la hace reconocible de un vistazo.
 *
 * Va con la paleta del recorrido —papel #EEEBE6, cobre para el dato, tinta
 * casi negra— y no con el morado del sitio, porque la tarjeta debe parecerse a
 * lo que abre. Es la misma decisión que se tomó al dibujar la pantalla del ERP
 * dentro de la página.
 *
 * Las escenas salen de `npm run recorridos:escenas`, que las hornea con su
 * estilo calculado; aquí sólo se pegan. Si una falta, esa tarjeta se salta y
 * el empaquetador deja la genérica: nunca se publica una tarjeta a medias.
 */
import sharp from 'sharp'
import { writeFileSync, readFileSync, existsSync, statSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { RECORRIDOS } from '../src/data/recorridos.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.BASE_URL || 'http://localhost:4173'
const edge = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

// La etiqueta es la del propio recorrido, no una inventada aquí: se lee de su
// fuente para que la tarjeta y la página digan lo mismo.
function etiqueta(slug) {
  const fuente = resolve(raiz, `recorridos-fuente/${slug}.html`)
  if (!existsSync(fuente)) return null
  const m = readFileSync(fuente, 'utf8').match(/<div class="eyebrow lbl">([^<]*)</)
  return m ? m[1].trim() : null
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function pagina({ titulo, resumen, lbl, escena }) {
  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:'Archivo';src:url('${base}/fonts/archivo-subset.woff2') format('woff2');font-weight:700}
  @font-face{font-family:'Inter';src:url('${base}/fonts/inter-latin.woff2') format('woff2');font-weight:100 900}
  @font-face{font-family:'Azeret Mono';src:url('${base}/fonts/azeret-mono-subset.woff2') format('woff2');font-weight:400 700}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;background:#EEEBE6;color:#191A1E;
    font-family:Inter,system-ui,sans-serif;
    display:grid;grid-template-columns:1fr 520px;align-items:center;gap:48px;padding:60px 68px}
  .marca{display:flex;align-items:center;gap:13px;margin-bottom:38px}
  .marca b{font-family:'Azeret Mono',monospace;font-size:27px;font-weight:700;letter-spacing:-.01em}
  .lbl{font-family:'Azeret Mono',monospace;font-size:17px;font-weight:500;letter-spacing:.1em;
    text-transform:uppercase;color:#A35C23;margin-bottom:20px}
  h1{font-family:'Azeret Mono',monospace;font-size:54px;line-height:1.08;letter-spacing:-.04em;
    font-weight:700;text-transform:uppercase;max-width:15ch}
  p{margin-top:24px;font-size:22px;line-height:1.45;color:#4E5058;max-width:30ch}
  .escena{display:flex;align-items:center;justify-content:center}
  .escena svg{width:100%;height:auto;max-height:500px}
</style>
<div>
  <div class="marca">
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke="#191A1E" stroke-width="1.8"/>
      <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#EEEBE6" stroke-width="4.6"/>
      <path d="M15.5 8h4v4" stroke="#EEEBE6" stroke-width="4.6"/>
      <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#A35C23" stroke-width="1.9"/>
      <path d="M15.5 8h4v4" stroke="#A35C23" stroke-width="1.9"/>
    </svg>
    <b>Loomware</b>
  </div>
  <div class="lbl">${esc(lbl)}</div>
  <h1>${esc(titulo)}</h1>
  <p>${esc(resumen)}</p>
</div>
<div class="escena">${escena}</div>
`
}

const tmpHtml = resolve(raiz, 'dist/_ogr.html')
const tmpPng = resolve(raiz, 'dist/_ogr.png')
let hechas = 0
let saltadas = 0

for (const r of RECORRIDOS) {
  const svg = resolve(raiz, `public/recorridos/escena-${r.slug}.svg`)
  const lbl = etiqueta(r.slug)
  if (!existsSync(svg) || !lbl) {
    console.log(`  · ${r.slug}: se salta (falta ${!lbl ? 'la etiqueta' : 'la escena'})`)
    saltadas++
    continue
  }
  writeFileSync(
    tmpHtml,
    pagina({ titulo: r.titulo, resumen: r.resumen, lbl, escena: readFileSync(svg, 'utf8') }),
  )
  execFileSync(edge, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    `--user-data-dir=${resolve(raiz, 'dist/_ogr-perfil')}`,
    '--virtual-time-budget=15000', '--window-size=1200,630',
    `--screenshot=${tmpPng}`, `${base}/_ogr.html?v=${Date.now()}`,
  ], { stdio: 'ignore' })

  const destino = resolve(raiz, `public/recorridos/og-${r.slug}.png`)
  await sharp(tmpPng).png({ quality: 82, compressionLevel: 9, palette: true }).toFile(destino)
  console.log(`  · og-${r.slug}.png: ${(statSync(destino).size / 1024).toFixed(0)} KB`)
  hechas++
}

for (const f of [tmpHtml, tmpPng]) { if (existsSync(f)) unlinkSync(f) }
console.log(`\n  ✓ ${hechas} tarjetas${saltadas ? `, ${saltadas} saltadas` : ''}`)
