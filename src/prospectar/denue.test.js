// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buscarPorGiro } from './denue'

// El proxy /api/denue es la frontera: se simula lo que devuelve el INEGI a través de él.
const responder = (cuerpo, status = 200) =>
  vi.stubGlobal('fetch', vi.fn(async () => new Response(cuerpo, { status })))
beforeEach(() => sessionStorage.setItem('prospect_key', 'clave-prueba'))
afterEach(() => vi.unstubAllGlobals())

const REGISTRO = {
  CLEE: '09014467112000783013027439S2',
  Id: '6258107',
  Nombre: '101 SUCURSAL LLANO DE LA TORRE',
  Razon_social: 'COMERCIALIZADORA INTEGRAL DE BAÑOS Y REVESTIMIENTOS',
}

describe('búsqueda en el DENUE', () => {
  it('entrega los negocios cuando el INEGI los manda como lista', async () => {
    responder(JSON.stringify([REGISTRO]))
    const r = await buscarPorGiro('ferreterias', '09')
    expect(r).toHaveLength(1)
    expect(r[0].nombre).toBe('101 SUCURSAL LLANO DE LA TORRE')
  })

  it('entrega los negocios cuando el INEGI manda la lista dentro de un texto', async () => {
    // Así llegó en producción el 2026-09-29: "[{\"CLEE\":…}]"
    responder(JSON.stringify(JSON.stringify([REGISTRO])))
    const r = await buscarPorGiro('ferreterias', '09')
    expect(r).toHaveLength(1)
    expect(r[0].razon).toBe('COMERCIALIZADORA INTEGRAL DE BAÑOS Y REVESTIMIENTOS')
  })
})
