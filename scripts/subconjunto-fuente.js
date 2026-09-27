/*
 * Recorta la fuente Inter a los caracteres que el sitio realmente usa.
 *
 *   npm run fuente:subconjunto
 *
 * La fuente completa pesa 83 KB y era el recurso más pesado de la página; el
 * español necesita una fracción de sus glifos. El recorte queda en ~1 KB.
 *
 * Correrlo cuando se agregue texto con caracteres nuevos (otro idioma, símbolos).
 * La fuente original está en fuentes-origen/, fuera de public/.
 */
import subsetFont from 'subset-font'
import { readFileSync, writeFileSync, existsSync, copyFileSync, statSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fuente = resolve(raiz, 'public/fonts/inter-latin.woff2')
// La fuente completa vive fuera de public/ para no publicarla: sólo es la
// materia prima del recorte.
const respaldo = resolve(raiz, 'fuentes-origen/inter-latin-completa.woff2')

// Todo el texto que puede aparecer en pantalla: componentes, datos y HTML.
const carpetas = ['src', 'scripts']
const sueltos = ['index.html', 'gracias.html', 'prospectar.html', 'aviso-de-privacidad.html']

const listar = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listar(join(d, e.name)) : [join(d, e.name)],
  )

let texto = ''
for (const c of carpetas) {
  for (const f of listar(resolve(raiz, c))) {
    if (/\.(jsx?|css|html|md)$/.test(f)) texto += readFileSync(f, 'utf8')
  }
}
for (const f of sueltos) texto += readFileSync(resolve(raiz, f), 'utf8')

// Más un juego base: letras, dígitos, acentos del español y signos de uso común.
const base =
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789' +
  'áéíóúüÁÉÍÓÚÜ¿?¡!.,;:()[]{}«»“”"\'`´…–—-_/\\|@#$%&*+=<>~^' +
  '°·•©®™→←↑↓✓✗ '

const caracteres = [...new Set(base + texto)].sort().join('')

if (!existsSync(respaldo)) copyFileSync(fuente, respaldo)

const kb = (p) => Math.round(statSync(p).size / 1024)
const antes = kb(respaldo)

const recortada = await subsetFont(readFileSync(respaldo), caracteres, {
  targetFormat: 'woff2',
})
writeFileSync(fuente, recortada)

console.log(`  glifos conservados: ${caracteres.length}`)
console.log(`  inter-latin.woff2: ${antes} KB → ${kb(fuente)} KB`)
