/*
 * Captura una página con Edge y **espera de verdad** a que el archivo esté.
 *
 * Por qué existe. Los generadores de tarjetas llamaban a Edge con execFileSync
 * y leían el PNG en la línea siguiente. `execFileSync` espera a que el proceso
 * termine, pero el archivo tarda un instante más en quedar escrito y cerrado, y
 * el PNG anterior seguía ahí: entonces sharp leía **la tarjeta de la vuelta
 * pasada**. No truena, no avisa, y el resultado es un puñado de tarjetas
 * repetidas con nombres distintos.
 *
 * Se detectó el 2026-09-28 comparando huellas: de quince tarjetas nuevas sólo
 * salieron cuatro distintas, y al regenerar las ocho de los recorridos quedaron
 * dos. Las que estaban en el repositorio sí eran distintas, así que la carrera
 * llevaba ahí desde el principio y sólo se veía cuando la máquina iba lenta.
 *
 * Aquí se borra el destino antes de capturar y se espera hasta que exista y su
 * tamaño deje de cambiar. Si no aparece, truena con el nombre de la página: vale
 * más un guion detenido que ocho enlaces que previsualizan lo mismo.
 */
import { existsSync, unlinkSync, statSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { basename } from 'node:path'
import { execFileSync } from 'node:child_process'

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

export async function capturar({ edge, url, destino, ancho = 1200, alto = 630, perfil, quien = url }) {
  if (existsSync(destino)) unlinkSync(destino)

  const args = [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--no-first-run',
    '--virtual-time-budget=15000', `--window-size=${ancho},${alto}`,
    `--screenshot=${destino}`, url,
  ]
  if (perfil) args.splice(4, 0, `--user-data-dir=${perfil}`)
  execFileSync(edge, args, { stdio: 'ignore' })

  /* El proceso ya terminó; el archivo puede tardar. Se espera a que exista y a
     que su tamaño se repita dos veces, que es cuando está cerrado. */
  let previo = -1
  for (let i = 0; i < 60; i++) {
    if (existsSync(destino)) {
      const ahora = statSync(destino).size
      if (ahora > 0 && ahora === previo) return ahora
      previo = ahora
    }
    await dormir(100)
  }
  throw new Error(`capturar: el navegador no dejó la captura de ${quien}`)
}

/* Comprueba que un grupo de archivos sea de verdad distinto entre sí. Es la
   prueba que faltaba: sin ella, la carrera de arriba pasaba inadvertida y se
   publicaban tarjetas repetidas con nombres distintos. */
export function exigirDistintos(rutas) {
  const huella = (p) => createHash('md5').update(readFileSync(p)).digest('hex')
  const vistas = new Map()
  const repetidas = []
  for (const p of rutas) {
    const h = huella(p)
    if (vistas.has(h)) repetidas.push(basename(p) + ' = ' + basename(vistas.get(h)))
    else vistas.set(h, p)
  }
  if (repetidas.length) {
    throw new Error(
      'hay tarjetas repetidas, que es justo lo que estas tarjetas existen para evitar:\n      ' +
        repetidas.join('\n      '),
    )
  }
  return vistas.size
}
