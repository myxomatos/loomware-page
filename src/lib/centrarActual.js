/*
 * Barra de servicios o industrias en celular: es una tira que se desliza de
 * lado y la opción de la página actual podía quedar fuera de la pantalla.
 * Se usa como ref de la tira: la desplaza hasta dejar la actual al centro y,
 * si la tira no cabe, le pone la clase desborda para desvanecer las orillas.
 */
export function centrarActual(tira) {
  if (!tira) return
  tira.classList.toggle('desborda', tira.scrollWidth > tira.clientWidth)
  const actual = tira.querySelector('.is-actual')
  if (!actual) return
  const t = tira.getBoundingClientRect()
  const a = actual.getBoundingClientRect()
  tira.scrollLeft += a.left + a.width / 2 - (t.left + t.width / 2)
}
