/*
 * Recorta las dos tipografías que usan los recorridos y las deja en
 * public/fonts/, para servirlas desde el propio dominio.
 *
 *   npm run fuente:recorridos
 *     → public/fonts/azeret-mono-recorridos.woff2
 *     → public/fonts/archivo-recorridos.woff2
 *
 * **Por qué existe.** Los ocho recorridos pedían sus tipografías a Google
 * Fonts, y **nuestra propia Content-Security-Policy las bloquea**: dice
 * `style-src 'self'` y `font-src 'self'`, así que ni la hoja de
 * fonts.googleapis.com ni los archivos de fonts.gstatic.com llegan a cargar.
 * Medido el 2026-09-25 con la CSP de producción inyectada: **cero tipografías
 * en el documento**, y el titular midiendo 280 px en vez de 331. Desde que la
 * CSP entró, el 22 de septiembre, los ocho se veían con la monoespaciada que
 * trajera el aparato —Consolas, Menlo, Droid Sans Mono, lo que hubiera—.
 *
 * Los subconjuntos que ya existían no servían para esto: el de Azeret Mono es
 * **sólo mayúsculas**, porque en el sitio esa tipografía es para etiquetas y
 * cifras, y el de Archivo tiene el eje fijo en 700. Los recorridos usan las dos
 * para texto corrido y en cuatro pesos.
 *
 * **Los caracteres salen de los propios archivos**, no de una lista escrita a
 * mano: se leen los ocho de recorridos-fuente/ y se conserva todo lo que
 * aparece ahí, más el alfabeto español completo como piso, por si mañana
 * alguien escribe una palabra con una letra que hoy no está. Un glifo que
 * falte no da error: se cae a otra tipografía y nadie se entera.
 *
 * Las dos son variables, así que va **un archivo por familia** con el eje de
 * peso abierto en el rango que se usa, en vez de tres pesos sueltos.
 */
import subsetFont from 'subset-font'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fuentes = resolve(raiz, 'recorridos-fuente')

// Piso: el alfabeto español y lo que cualquier texto necesita, aunque hoy no
// aparezca en ningún recorrido.
const PISO =
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz' +
  'ÁÉÍÓÚÜáéíóúü0123456789 .,;:·/-()[]«»“”"\'¿?¡!$%&+=<>@#*…°–—→↑↓✓❚▶'

const vistos = new Set(PISO)
for (const f of readdirSync(fuentes).filter((x) => x.endsWith('.html'))) {
  for (const ch of readFileSync(resolve(fuentes, f), 'utf8')) vistos.add(ch)
}
// Fuera los de control y los espacios raros: no se dibujan.
const caracteres = [...vistos]
  .filter((c) => c.codePointAt(0) > 31 && c !== ' ')
  .sort()
  .join('')

const kb = (n) => (n / 1024).toFixed(1)

const TRABAJOS = [
  {
    origen: 'fuentes-origen/azeret-mono-completa.woff2',
    destino: 'public/fonts/azeret-mono-recorridos.woff2',
    // El recorrido la usa de 400 a 700: cuerpo, etiquetas y titulares.
    eje: { wght: { min: 400, max: 700 } },
  },
  {
    origen: 'fuentes-origen/archivo-completa.woff2',
    destino: 'public/fonts/archivo-recorridos.woff2',
    // Sólo el texto de los pasos, de 400 a 600.
    eje: { wght: { min: 400, max: 600 } },
  },
]

console.log(`  glifos conservados: ${caracteres.length}`)
for (const t of TRABAJOS) {
  const src = readFileSync(resolve(raiz, t.origen))
  const out = await subsetFont(src, caracteres, { targetFormat: 'woff2', variationAxes: t.eje })
  writeFileSync(resolve(raiz, t.destino), out)
  const eje = Object.entries(t.eje).map(([k, v]) => `${k} ${v.min}–${v.max}`).join(', ')
  console.log(`  ${t.destino.split('/').pop().padEnd(32)} ${kb(src.length)} KB → ${kb(out.length)} KB   (${eje})`)
}
