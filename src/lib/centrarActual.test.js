// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { centrarActual } from './centrarActual'

// jsdom no maqueta: cada prueba le da a la tira y a la opción actual las medidas que
// tendrían en un celular, como las reporta el navegador.
function tira({ ancho, contenido, actual }) {
  const nav = document.createElement('nav')
  nav.innerHTML = '<a>CRM</a><a class="is-actual">Nómina</a><a>ERP</a>'
  Object.defineProperty(nav, 'clientWidth', { value: ancho })
  Object.defineProperty(nav, 'scrollWidth', { value: contenido })
  nav.getBoundingClientRect = () => ({ left: 60, width: ancho })
  nav.querySelector('.is-actual').getBoundingClientRect = () => actual
  return nav
}

describe('centrarActual', () => {
  it('desliza la tira hasta dejar la opción actual al centro', () => {
    // Tira de 300 px que empieza en x=60: su centro está en x=210.
    // La opción actual va de x=420 a x=520 (centro en 470): hay que avanzar 260 px.
    const nav = tira({ ancho: 300, contenido: 900, actual: { left: 420, width: 100 } })
    centrarActual(nav)
    expect(nav.scrollLeft).toBe(260)
  })

  it('marca la tira que no cabe, para desvanecer sus orillas', () => {
    const nav = tira({ ancho: 300, contenido: 900, actual: { left: 160, width: 100 } })
    centrarActual(nav)
    expect(nav.classList.contains('desborda')).toBe(true)
  })

  it('deja sin marca la tira que cabe completa', () => {
    const nav = tira({ ancho: 900, contenido: 900, actual: { left: 160, width: 100 } })
    centrarActual(nav)
    expect(nav.classList.contains('desborda')).toBe(false)
  })

  it('no hace nada cuando React desmonta la tira y llama con null', () => {
    expect(() => centrarActual(null)).not.toThrow()
  })
})
