/*
 * Empaqueta los recorridos de `recorridos-fuente/` en páginas completas dentro
 * de `public/recorridos/`.
 *
 *   npm run generar:recorridos   (corre solo antes de cada build)
 *
 * El archivo fuente es un fragmento —comentario, <title>, <link>, <style> y
 * después el contenido—, porque así se publica también como artifact. Aquí se
 * parte en cabeza y cuerpo y se le arma el <head> que necesita una página del
 * sitio: canonical, Open Graph, favicon y el ajuste de las áreas seguras del
 * teléfono. Sin `noindex`: son contenido, y contestan lo que la gente busca.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RECORRIDOS } from '../src/data/recorridos.js'
import { DOMINIO, EMPRESA } from '../src/data/contacto.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const destino = resolve(raiz, 'public/recorridos')
mkdirSync(destino, { recursive: true })

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const r of RECORRIDOS) {
  const fuente = readFileSync(resolve(raiz, `recorridos-fuente/${r.slug}.html`), 'utf8')

  const corte = fuente.indexOf('</style>')
  if (corte < 0) throw new Error(`recorridos-fuente/${r.slug}.html no tiene <style>`)
  const cabeza = fuente.slice(0, corte + '</style>'.length).replace(/<title>[\s\S]*?<\/title>\s*/, '')
  const cuerpo = fuente.slice(corte + '</style>'.length).trim()

  const url = `${DOMINIO}/recorridos/${r.slug}`
  const titulo = `${r.titulo} · ${r.servicio.toUpperCase()} | ${EMPRESA}`

  const pagina = `<!DOCTYPE html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(titulo)}</title>
    <meta name="description" content="${esc(r.descripcion)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#A35C23" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${EMPRESA}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(titulo)}" />
    <meta property="og:description" content="${esc(r.descripcion)}" />
    <meta property="og:image" content="${DOMINIO}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(titulo)}" />
    <meta name="twitter:description" content="${esc(r.descripcion)}" />
    <meta name="twitter:image" content="${DOMINIO}/og-image.png" />

    <style>
      :root {
        color-scheme: light;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      html { scroll-padding-top: env(safe-area-inset-top, 0px); }
      body { margin: 0; padding: 0; }
      img { max-width: 100%; }
      [hidden] { display: none !important; }
    </style>
${cabeza.split('\n').map((l) => (l.trim() ? '    ' + l : l)).join('\n')}
  </head>
  <body>
${cuerpo}
  </body>
</html>
`
  writeFileSync(resolve(destino, `${r.slug}.html`), pagina)
  console.log('  ✓ public/recorridos/' + r.slug + '.html')
}
console.log(`${RECORRIDOS.length} recorridos empaquetados`)
