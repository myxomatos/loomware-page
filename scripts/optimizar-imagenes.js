/*
 * Convierte las ilustraciones del hero a WebP, al tamaño máximo en que se
 * muestran (con margen para pantallas de alta densidad). Los PNG originales se
 * conservan como fuente y como respaldo para navegadores sin WebP.
 *
 *   npm run optimizar:imagenes
 *
 * Correrlo sólo cuando cambien los PNG; los WebP se versionan.
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const publico = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// ancho: el mayor que se llega a mostrar ×2 para pantallas de alta densidad.
const IMAGENES = [
  { entrada: 'hero_desktop-1400w.png', salida: 'hero-desktop.webp', ancho: 1200 },
  { entrada: 'hero_tablet-1400w.png', salida: 'hero-tablet.webp', ancho: 1280 },
  { entrada: 'hero_mobile-1400w.png', salida: 'hero-mobile.webp', ancho: 860 },
]

const kb = (ruta) => Math.round(statSync(ruta).size / 1024)

for (const img of IMAGENES) {
  const origen = resolve(publico, img.entrada)
  const destino = resolve(publico, img.salida)
  const { width, height } = await sharp(origen)
    .resize({ width: img.ancho, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(destino)
  console.log(`  ${img.entrada} ${kb(origen)} KB → ${img.salida} ${width}×${height} ${kb(destino)} KB`)
}
