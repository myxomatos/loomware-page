/*
 * Recorta Azeret Mono a lo que el sitio de verdad viste con ella: etiquetas en
 * mayúsculas y cifras. Es la voz de los recorridos —el sitio y las piezas de
 * venta se leen como la misma empresa— y sólo aparece en eyebrows, números de
 * paso y datos, nunca en texto corrido.
 *
 *   npm run fuente:mono
 *
 * La fuente completa (25.6 KB) vive en fuentes-origen/, fuera de public/: sólo
 * es materia prima. Sin minúsculas el recorte baja de 17.2 a 11.9 KB.
 * Correrlo si alguna etiqueta llega a necesitar un signo nuevo.
 */
import subsetFont from 'subset-font'
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origen = resolve(raiz, 'fuentes-origen/azeret-mono-completa.woff2')
const destino = resolve(raiz, 'public/fonts/azeret-mono-subset.woff2')

const caracteres = [
  ...new Set('ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ0123456789' + ' .,;:·•/-–—()«»¿?¡!$%&+×=→↑↓✓#@…°'),
].sort().join('')

const kb = (p) => (statSync(p).size / 1024).toFixed(1)
const antes = kb(origen)
writeFileSync(destino, await subsetFont(readFileSync(origen), caracteres, { targetFormat: 'woff2' }))
console.log(`  glifos conservados: ${caracteres.length}`)
console.log(`  azeret-mono-subset.woff2: ${antes} KB → ${kb(destino)} KB`)
