/*
 * Escribe el HTML de cada página dentro de su <div id="root">, después del
 * build.
 *
 *   npm run build     lo corre solo, en el postbuild
 *   npm run prerender  para correrlo aparte (requiere un `vite build` antes)
 *
 * Por qué, con la medición: 17 de las 25 URLs del sitemap llegaban a Google con
 * el cuerpo vacío. El porqué largo está en `src/prerender.jsx`.
 *
 * Cómo. Vite construye dos veces: una para el navegador —lo que ya hacía— y una
 * para Node, que produce `dist-ssr/prerender.js`. Este guion pide a ese módulo
 * el HTML de cada página y lo mete en el hueco. El navegador después **hidrata**
 * ese HTML en vez de volver a dibujarlo, así que el visitante ve el texto desde
 * el primer pintado y no hay un segundo dibujado que lo reemplace.
 *
 * Qué NO toca:
 *   · `prospectar.html`, que es privada y con contraseña: su contenido no debe
 *     quedar escrito en un archivo público.
 *   · Los ocho recorridos, que son HTML a mano y ya traen su texto.
 *
 * Si una página falla, el guion se detiene con su nombre y el build se cae. Es
 * a propósito: vale más un build roto que publicar la mitad de las páginas con
 * texto y la otra mitad sin él, que es imposible de notar a ojo.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(raiz, 'dist')
const SSR = join(raiz, 'dist-ssr', 'prerender.js')

if (!existsSync(SSR)) {
  console.error('\n  x falta dist-ssr/prerender.js — corre antes: vite build --ssr src/prerender.jsx --outDir dist-ssr\n')
  process.exit(1)
}

const { render } = await import('file://' + SSR)

/* Qué se prerenderiza, y con qué clave. Los servicios y los giros salen de sus
   carpetas, así que al agregar uno entra aquí solo. */
const deCarpeta = (carpeta, tipo) =>
  existsSync(join(DIST, carpeta))
    ? readdirSync(join(DIST, carpeta))
        .filter((f) => f.endsWith('.html'))
        .map((f) => ({ archivo: join(carpeta, f), tipo, clave: f.replace('.html', '') }))
    : []

const PAGINAS = [
  { archivo: 'index.html', tipo: 'inicio' },
  { archivo: 'calculadora.html', tipo: 'calculadora' },
  { archivo: 'aviso-de-privacidad.html', tipo: 'aviso' },
  { archivo: 'gracias.html', tipo: 'gracias' },
  ...deCarpeta('servicios', 'servicio'),
  ...deCarpeta('industrias', 'industria'),
]

const HUECO = '<div id="root"></div>'
const palabras = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

let total = 0
console.log('\n  prerenderizado')
for (const p of PAGINAS) {
  const ruta = join(DIST, p.archivo)
  if (!existsSync(ruta)) {
    console.error('  x no existe ' + p.archivo + ' — ¿cambió el build?')
    process.exit(1)
  }
  let html = readFileSync(ruta, 'utf8')
  if (!html.includes(HUECO)) {
    console.error('  x ' + p.archivo + ' no trae el hueco «' + HUECO + '»')
    process.exit(1)
  }
  let cuerpo
  try {
    cuerpo = render(p.tipo, p.clave)
  } catch (e) {
    console.error('  x ' + p.archivo + ' no se pudo dibujar: ' + e.message)
    console.error('    Casi siempre es un window/document en el cuerpo de un componente.')
    process.exit(1)
  }
  const n = palabras(cuerpo)
  if (n < 40) {
    console.error('  x ' + p.archivo + ' salió con ' + n + ' palabras: algo no se dibujó')
    process.exit(1)
  }
  writeFileSync(ruta, html.replace(HUECO, '<div id="root">' + cuerpo + '</div>'))
  console.log('  · ' + p.archivo.padEnd(38) + String(n).padStart(5) + ' palabras')
  total += n
}
console.log('\n  ✓ ' + PAGINAS.length + ' páginas con su texto en el HTML · ' + total + ' palabras que antes no llegaban\n')
