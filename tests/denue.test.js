// Vive fuera de functions/: Cloudflare Pages convierte en ruta cada archivo de esa carpeta.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onRequestGet } from '../functions/api/denue/[[path]]'

// El INEGI es el único límite externo: se simula y se revisa a qué URL se le pidió.
let pedida
beforeEach(() => {
  pedida = null
  vi.stubGlobal('fetch', vi.fn(async (url) => {
    pedida = url
    return new Response('[]', { status: 200 })
  }))
})
afterEach(() => vi.unstubAllGlobals())

const ENV = { DENUE_TOKEN: 'token-prueba', PROSPECT_KEY: 'clave-prueba' }
const consultar = (path, clave = 'clave-prueba') =>
  onRequestGet({
    request: new Request('https://loomware.com.mx/api/denue', { headers: { 'x-prospect-key': clave } }),
    env: ENV,
    params: { path },
  })

describe('proxy del DENUE', () => {
  it('agrega el token al final y deja pasar la coma de las coordenadas', async () => {
    const res = await consultar(['Buscar', 'todos', '19.43,-99.13', '500'])
    expect(res.status).toBe(200)
    expect(pedida).toBe(
      'https://www.inegi.org.mx/app/api/denue/v1/consulta/Buscar/todos/19.43,-99.13/500/token-prueba',
    )
  })

  it('pide la contraseña', async () => {
    const res = await consultar(['Buscar', 'todos'], 'otra')
    expect(res.status).toBe(401)
    expect(pedida).toBeNull()
  })

  it.each([['..'], ['.']])('no deja salir de la API con un segmento «%s»', async (seg) => {
    const res = await consultar(['Ficha', seg, seg, 'app', 'otra'])
    expect(res.status).toBe(400)
    expect(pedida).toBeNull()
  })
})
