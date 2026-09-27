/*
 * Recorta Archivo a los caracteres que aparecen en titulares y botones.
 *
 *   npm run fuente:titulares
 *
 * Por qué otra tipografía: el estudio comparativo del 22 de septiembre de 2026
 * encontró que los sitios del grupo de arriba —Xero con National 2, Yoco con
 * Sharp Grotesk, Vercel con Geist— usan una tipografía de titular que nadie más
 * puede usar, mientras que Inter, con ser excelente, la tiene medio internet.
 *
 * Archivo es de Omnibus-Type, una fundición de Buenos Aires, y ya es la del
 * texto de los recorridos: usarla en los titulares del sitio cierra el círculo
 * entre las dos piezas. Inter se queda en el cuerpo, donde es imbatible, y
 * Azeret Mono en las etiquetas y las cifras.
 *
 * La fuente completa vive en fuentes-origen/, fuera de public/.
 */
import subsetFont from 'subset-font'
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origen = resolve(raiz, 'fuentes-origen/archivo-completa.woff2')
const destino = resolve(raiz, 'public/fonts/archivo-subset.woff2')

// Titulares y botones: letras, acentos del español y los signos que aparecen.
const caracteres = [
  ...new Set(
    'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789' +
      'ÁÉÍÓÚÜáéíóúü¿?¡!.,;:()«»“”"\'…–—-/&%$+×=→ ',
  ),
].sort().join('')

const kb = (p) => (statSync(p).size / 1024).toFixed(1)
const antes = kb(origen)
// Los titulares usan un solo peso: fijar el eje variable en 700 corta la
// fuente casi a la mitad. Si algún día se titula en otro peso, se amplía aquí.
writeFileSync(
  destino,
  await subsetFont(readFileSync(origen), caracteres, {
    targetFormat: 'woff2',
    variationAxes: { wght: { min: 700, max: 700 } },
  }),
)
console.log(`  glifos conservados: ${caracteres.length}`)
console.log(`  archivo-subset.woff2: ${antes} KB → ${kb(destino)} KB`)
