/*
 * Video de "Ver cómo funciona" en el hero.
 *
 * Mientras esté vacío, el enlace lleva a la sección del proceso. Con una URL,
 * abre el video en una ventana sobre la página.
 *
 * Acepta:
 *   - YouTube (recomendado): 'https://www.youtube.com/watch?v=XXXX' o 'https://youtu.be/XXXX'.
 *     Súbelo como "No listado" para que no aparezca en búsquedas de YouTube
 *     pero sí se pueda reproducir aquí. Ventajas: no pesa en el sitio, se
 *     adapta a la conexión del visitante, y YouTube es un canal más.
 *   - Un MP4 propio: '/video/loomware.mp4' (ponerlo en public/video/). Sólo si
 *     pesa menos de ~15 MB; si no, tarda en cargar en celular.
 */
export const VIDEO_URL = ''

// Devuelve { tipo: 'youtube', id } o { tipo: 'archivo', url } o null.
export function videoFuente(url = VIDEO_URL) {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (yt) return { tipo: 'youtube', id: yt[1] }
  return { tipo: 'archivo', url }
}
