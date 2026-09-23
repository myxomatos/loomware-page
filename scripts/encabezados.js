/*
 * Genera dist/_headers: los encabezados de seguridad que Cloudflare Pages
 * manda con cada respuesta.
 *
 * Por qué generado y no escrito a mano: la Content-Security-Policy tiene que
 * autorizar los scripts en línea del sitio —el de consentimiento que inyecta
 * vite.config.js cuando hay VITE_GA_ID, y el de cada recorrido— y la forma
 * correcta de autorizarlos es por el hash de su contenido, no con
 * 'unsafe-inline'. El hash cambia cada vez que cambia el script, así que se
 * calcula aquí, después de construir, leyendo el HTML ya generado.
 *
 * Con 'unsafe-inline' la política dejaría pasar cualquier script inyectado en
 * el HTML, que es justo lo que la política existe para impedir. Con hashes,
 * sólo corre lo que nosotros escribimos.
 *
 * Este archivo es la única fuente de dist/_headers; antes había un
 * public/_headers escrito a mano y se quitó para que no hubiera dos archivos
 * peleándose el mismo trabajo.
 *
 * Se ejecuta solo en `npm run build` (postbuild).
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'

/* --- Todos los .html construidos --- */
function htmls(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) htmls(p, acc)
    else if (n.endsWith('.html')) acc.push(p)
  }
  return acc
}

/*
 * Hash de cada script en línea que el navegador sí ejecuta. Los bloques
 * `application/ld+json` son datos, no código: el navegador no los corre y la
 * CSP no los revisa, así que quedan fuera.
 */
const EJECUTABLE = /^(|text\/javascript|module|application\/javascript)$/i
const hashes = new Set()

for (const archivo of htmls(DIST)) {
  const html = readFileSync(archivo, 'utf8')
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attrs, cuerpo] = m
    if (/\bsrc\s*=/i.test(attrs)) continue // externo: lo cubre la lista de orígenes
    const tipo = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [, ''])[1]
    if (!EJECUTABLE.test(tipo)) continue
    if (!cuerpo.trim()) continue
    hashes.add(`'sha256-${createHash('sha256').update(cuerpo, 'utf8').digest('base64')}'`)
  }
}

/* --- La política --- */
const GTM = 'https://www.googletagmanager.com'
const GA = 'https://*.google-analytics.com https://*.analytics.google.com'

const csp = [
  "default-src 'self'",
  // Los hashes autorizan nuestros scripts en línea uno por uno.
  `script-src 'self' ${GTM} ${[...hashes].sort().join(' ')}`.trim(),
  // Los estilos en línea se quedan: React y los recorridos los escriben al
  // vuelo y no son un vector de ejecución como los scripts.
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${GA}`,
  "font-src 'self'",
  `connect-src 'self' ${GTM} ${GA}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const contenido = `# Generado por scripts/encabezados.js en cada build. No editar a mano:
# la CSP lleva el hash de cada script en línea y cambia cuando ellos cambian.

/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: ${csp}
  Cross-Origin-Opener-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`

writeFileSync(join(DIST, '_headers'), contenido)
console.log(`  ✓ dist/_headers · CSP con ${hashes.size} script${hashes.size === 1 ? '' : 's'} en línea autorizado${hashes.size === 1 ? '' : 's'}`)
