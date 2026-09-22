/*
 * Genera servicios/<slug>.html para cada entrada de src/data/servicios.js.
 *
 * Corre solo antes de cada build (script "prebuild"). Los archivos generados
 * se versionan para que Vite los vea como entradas normales y para que un
 * cambio de contenido quede visible en el diff.
 *
 * El <head> lleva título, descripción, canonical, Open Graph y los datos
 * estructurados (Service + FAQPage) en el HTML estático: así Google los lee
 * aunque no ejecute JavaScript.
 */
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SERVICIOS } from '../src/data/servicios.js'
import { INDUSTRIAS } from '../src/data/industrias.js'
import { RECORRIDOS } from '../src/data/recorridos.js'
import { DOMINIO, EMPRESA, EMAIL, TELEFONOS } from '../src/data/contacto.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const carpeta = resolve(raiz, 'servicios')
const carpetaInd = resolve(raiz, 'industrias')
mkdirSync(carpeta, { recursive: true })
mkdirSync(carpetaInd, { recursive: true })

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const ldService = (s) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.nombre,
    serviceType: s.nombre,
    description: s.descripcion,
    url: s.slug ? `${DOMINIO}/servicios/${s.slug}` : `${DOMINIO}/industrias/${s.id}`,
    areaServed: { '@type': 'Country', name: 'México' },
    provider: {
      '@type': 'Organization',
      name: EMPRESA,
      url: DOMINIO,
      email: EMAIL,
      telephone: TELEFONOS[0].display,
    },
  })

const ldFaq = (s) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  })

const plantilla = (s, tipo = 'servicio') => {
  const ruta = tipo === 'servicio' ? `servicios/${s.slug}` : `industrias/${s.id}`
  const attr = tipo === 'servicio' ? `data-servicio="${s.slug}"` : `data-industria="${s.id}"`
  const entrada = tipo === 'servicio' ? '/src/servicio/main.jsx' : '/src/industria/main.jsx'
  return `<!DOCTYPE html>
<html lang="es-MX" ${attr}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(s.titulo)}</title>
    <meta name="description" content="${esc(s.descripcion)}" />
    <link rel="canonical" href="${DOMINIO}/${ruta}" />
    <meta name="theme-color" content="#6338FF" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${EMPRESA}" />
    <meta property="og:url" content="${DOMINIO}/${ruta}" />
    <meta property="og:title" content="${esc(s.titulo)}" />
    <meta property="og:description" content="${esc(s.descripcion)}" />
    <meta property="og:image" content="${DOMINIO}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(s.titulo)}" />
    <meta name="twitter:description" content="${esc(s.descripcion)}" />
    <meta name="twitter:image" content="${DOMINIO}/og-image.png" />
    <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />

    ${tipo === 'servicio' ? `<script type="application/ld+json">${ldService(s)}</script>
    <script type="application/ld+json">${ldFaq(s)}</script>` : `<script type="application/ld+json">${ldService(s)}</script>`}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entrada}"></script>
  </body>
</html>
`
}

// Borra páginas de servicios que ya no existen en los datos.
for (const archivo of readdirSync(carpeta)) {
  const slug = archivo.replace(/\.html$/, '')
  if (archivo.endsWith('.html') && !SERVICIOS.some((s) => s.slug === slug)) {
    unlinkSync(resolve(carpeta, archivo))
    console.log('  − servicios/' + archivo + ' (ya no está en los datos)')
  }
}

for (const s of SERVICIOS) {
  writeFileSync(resolve(carpeta, `${s.slug}.html`), plantilla(s))
  console.log('  ✓ servicios/' + s.slug + '.html')
}
console.log(`${SERVICIOS.length} páginas de servicio generadas`)

for (const archivo of readdirSync(carpetaInd)) {
  const id = archivo.replace(/.html$/, '')
  if (archivo.endsWith('.html') && !INDUSTRIAS.some((i) => i.id === id)) {
    unlinkSync(resolve(carpetaInd, archivo))
    console.log('  − industrias/' + archivo + ' (ya no está en los datos)')
  }
}
for (const g of INDUSTRIAS) {
  writeFileSync(resolve(carpetaInd, `${g.id}.html`), plantilla(g, 'industria'))
  console.log('  ✓ industrias/' + g.id + '.html')
}
console.log(`${INDUSTRIAS.length} páginas de industria generadas`)

// sitemap.xml con todo lo indexable. /gracias y /prospectar quedan fuera a propósito.
const hoy = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: DOMINIO + '/', prioridad: '1.0', frecuencia: 'monthly' },
  ...SERVICIOS.map((s) => ({ loc: `${DOMINIO}/servicios/${s.slug}`, prioridad: '0.8', frecuencia: 'monthly' })),
  ...INDUSTRIAS.map((g) => ({ loc: `${DOMINIO}/industrias/${g.id}`, prioridad: '0.7', frecuencia: 'monthly' })),
  ...RECORRIDOS.map((r) => ({ loc: `${DOMINIO}/recorridos/${r.slug}`, prioridad: '0.7', frecuencia: 'yearly' })),
  { loc: DOMINIO + '/calculadora', prioridad: '0.8', frecuencia: 'monthly' },
  { loc: DOMINIO + '/aviso-de-privacidad', prioridad: '0.2', frecuencia: 'yearly' },
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${u.frecuencia}</changefreq>
    <priority>${u.prioridad}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(raiz, 'public/sitemap.xml'), sitemap)
console.log(`sitemap.xml con ${urls.length} URL`)
