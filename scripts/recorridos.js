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
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RECORRIDOS } from '../src/data/recorridos.js'
import { servicioPorSlug } from '../src/data/servicios.js'
import { DOMINIO, EMPRESA } from '../src/data/contacto.js'
import { basePublica } from './base-publica.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const destino = resolve(raiz, 'public/recorridos')
mkdirSync(destino, { recursive: true })

/* Reemplaza una vez y se queja si no encontró nada: si un recorrido cambia de
   forma, más vale que el build lo diga a que publique una página a medias. */
function reemplazarUna(texto, de, a, slug, que) {
  if (!texto.includes(de)) {
    throw new Error(`recorridos: en "${slug}" no se pudo ${que}. ¿Cambió recorridos-fuente/${slug}.html?`)
  }
  return texto.replace(de, a)
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const r of RECORRIDOS) {
  const fuente = readFileSync(resolve(raiz, `recorridos-fuente/${r.slug}.html`), 'utf8')

  const corte = fuente.indexOf('</style>')
  if (corte < 0) throw new Error(`recorridos-fuente/${r.slug}.html no tiene <style>`)
  const cabeza = fuente.slice(0, corte + '</style>'.length).replace(/<title>[\s\S]*?<\/title>\s*/, '')
  let cuerpo = fuente.slice(corte + '</style>'.length).trim()

  /* --- Ajustes de la versión que vive dentro del sitio ---
   *
   * La fuente se queda como está, porque también se publica como artifact
   * suelto para mandar por WhatsApp, y ahí sí hace falta decir de dónde viene
   * y enlazar en absoluto. Aquí, dentro del sitio, sobra.
   */

  // 1. El logotipo regresa al inicio. Suelto no llevaba a ningún lado, y quien
  //    terminaba el recorrido tenía que usar el botón de atrás del navegador.
  cuerpo = reemplazarUna(cuerpo, '<span class="brand__id">', '<a class="brand__id" href="/" aria-label="Ir al inicio de Loomware">', r.slug, 'abrir el logotipo')
  cuerpo = reemplazarUna(
    cuerpo,
    '<span class="brand__name">Loomware</span>\n    </span>',
    '<span class="brand__name">Loomware</span>\n    </a>',
    r.slug, 'cerrar el logotipo'
  )

  // 2. Fuera la etiqueta del dominio: ya estás en él.
  cuerpo = cuerpo.replace(
    /\s*<a class="brand__site"[\s\S]*?<\/a>/,
    ''
  )

  // 3. «Formulario del sitio» va al formulario, en esta misma pestaña. Antes
  //    apuntaba a la página del servicio y abría una pestaña nueva, así que
  //    aterrizabas arriba de otra página en vez de en el formulario.
  cuerpo = cuerpo.replace(
    /<a href="https:\/\/[^"]*?\/servicios\/[^"]*"[^>]*>formulario del sitio<\/a>/,
    '<a href="/#contacto">formulario del sitio</a>'
  )

  const url = `${DOMINIO}/recorridos/${r.slug}`
  // El nombre del servicio tal como lo dice el sitio: "Nómina", no "NOMINA".
  const servicio = servicioPorSlug(r.servicio)
  if (!servicio) throw new Error(`recorridos: el servicio "${r.servicio}" no existe en servicios.js`)
  const titulo = `${r.titulo} · ${servicio.nombre} | ${EMPRESA}`

  /* Cada recorrido lleva su propia tarjeta social: estas páginas existen para
     mandarse por WhatsApp y lo primero que ve el prospecto es la tarjeta del
     enlace, no la página. Con la genérica, ocho enlaces distintos se
     previsualizaban idénticos. Se dibujan con `npm run og:recorridos`, que
     necesita el sitio servido; si una falta, esa se queda con la del sitio y
     nunca se publica una tarjeta rota. */
  const BASE = basePublica()
  const tarjeta = existsSync(resolve(raiz, `public/recorridos/og-${r.slug}.png`))
    ? `${BASE}/recorridos/og-${r.slug}.png`
    : `${BASE}/og-image.png`

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
    <meta property="og:image" content="${tarjeta}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(titulo)}" />
    <meta name="twitter:description" content="${esc(r.descripcion)}" />
    <meta name="twitter:image" content="${tarjeta}" />

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

    <style>
      /* El logotipo es un enlace al inicio sólo en la versión del sitio, así que
         su estilo vive aquí y no en la fuente: sin subrayado ni azul de enlace,
         y con una señal al pasar encima para que se note que lleva a algún lado. */
      .brand__id { color: inherit; text-decoration: none; border-radius: 6px; }
      .brand__id:hover .brand__name { color: var(--signal); }
      .brand__id:focus-visible { outline: 2px solid var(--signal); outline-offset: 4px; }
    </style>
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
