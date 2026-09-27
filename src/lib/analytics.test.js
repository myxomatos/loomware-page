// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { marcarLead, reportarLead } from './analytics'

// gtag es la frontera con Google: se revisa lo que recibe.
beforeEach(() => {
  window.gtag = vi.fn()
  sessionStorage.clear()
})
afterEach(() => {
  delete window.gtag
  vi.restoreAllMocks()
})

describe('conversión de un prospecto', () => {
  it('cuenta una sola vez, con el método por el que llegó', () => {
    marcarLead('calculadora')
    reportarLead()
    expect(window.gtag).toHaveBeenCalledTimes(1)
    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', { metodo: 'calculadora' })
  })

  it('no vuelve a contar si se recarga /gracias', () => {
    marcarLead('formulario')
    reportarLead()
    reportarLead()
    expect(window.gtag).toHaveBeenCalledTimes(1)
  })

  it('no cuenta a quien abre /gracias sin haber enviado nada', () => {
    reportarLead()
    expect(window.gtag).not.toHaveBeenCalled()
  })

  it('si el navegador bloquea sessionStorage, no truena y no cuenta', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('bloqueado', 'SecurityError')
    })
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('bloqueado', 'SecurityError')
    })
    expect(() => marcarLead('formulario')).not.toThrow()
    expect(() => reportarLead()).not.toThrow()
    expect(window.gtag).not.toHaveBeenCalled()
  })
})
