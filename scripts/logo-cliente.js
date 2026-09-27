/*
 * Prepara el logotipo de un cliente para la sección de resultados.
 *
 *   node scripts/logo-cliente.js <origen> <destino.png>
 *
 * Deja el logo en un solo tono —el gris azulado del cuerpo de texto— y sin
 * fondo, que es como se ven los logotipos de cliente en un sitio serio: no
 * compiten con la marca de la casa ni meten una paleta ajena.
 *
 * El origen ideal es el archivo original del cliente (PNG con transparencia o
 * SVG). Cuando lo único que hay es una foto de pantalla, como pasó con
 * GT-SHOP, este script la rescata: separa por brillo —el logo es claro, el
 * fondo oscuro—, borra el reflejo de la pantalla por su posición y recorta a
 * lo que ocupa la marca. El resultado sirve, pero **pídele el original al
 * cliente en cuanto puedas**: una foto de una pantalla nunca va a dar un borde
 * limpio.
 */
import sharp from 'sharp'
import { argv } from 'node:process'

const [, , origen, destino] = argv
if (!origen || !destino) {
  console.error('  uso: node scripts/logo-cliente.js <origen> <destino.png>')
  process.exit(1)
}

// El tono del cuerpo de texto: presente, sin gritar.
const TINTA = { r: 70, g: 80, b: 105 }

const base = sharp(origen)
const { data, info } = await base.clone().greyscale().median(3).normalize()
  .raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info

const hist = new Array(256).fill(0)
for (const v of data) hist[v]++
const percentil = (p) => {
  let a = 0
  for (let v = 0; v < 256; v++) { a += hist[v]; if (a / data.length >= p) return v }
  return 255
}
const corte = percentil(0.86)

const alpha = Buffer.alloc(data.length)
for (let i = 0; i < data.length; i++) {
  const v = data[i]
  alpha[i] = v <= corte ? 0 : Math.min(255, Math.round(((v - corte) / (255 - corte)) * 300))
}

// El reflejo de la pantalla vive a los costados de la mitad de arriba, fuera
// del dibujo, que va centrado. Se borra por posición y no por brillo: los
// trazos del dibujo son casi tan tenues como el reflejo.
// La franja de arriba suele ser el borde de la pantalla o su reflejo.
const recorteArriba = Number(process.env.ARRIBA || 0)
if (recorteArriba > 0) {
  for (let y = 0; y < Math.round(H * recorteArriba); y++) {
    for (let x = 0; x < W; x++) alpha[y * W + x] = 0
  }
}

const recorteLados = Number(process.env.LADOS || 0)
if (recorteLados > 0) {
  for (let y = 0; y < Math.round(H * 0.55); y++) {
    for (let x = 0; x < W; x++) {
      if (x < W * recorteLados || x > W * (1 - recorteLados * 0.93)) alpha[y * W + x] = 0
    }
  }
}

const tinta = await sharp({ create: { width: W, height: H, channels: 3, background: TINTA } })
  .png().toBuffer()
// Dos pasos: primero la imagen con su transparencia, y sobre ella el recorte
// y el tamaño. En una sola cadena,  se come el .
const conAlfa = await sharp(tinta)
  .joinChannel(alpha, { raw: { width: W, height: H, channels: 1 } })
  .png()
  .toBuffer()

// Un respiro alrededor: pegado al borde, un logotipo se ve recortado.
const margen = Math.round(200 * 0.06)
await sharp(conAlfa)
  .trim({ threshold: 12 })
  .resize({ height: 200 - margen * 2, fit: 'inside', withoutEnlargement: true })
  .extend({ top: margen, bottom: margen, left: margen, right: margen, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  // Un solo tono y transparencia: con paleta el archivo baja a una fracción.
  .png({ compressionLevel: 9, palette: true, colours: 16 })
  .toFile(destino)

const m = await sharp(destino).metadata()
console.log(`  ${destino}: ${m.width}×${m.height}`)
