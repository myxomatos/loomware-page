// Vive fuera de functions/: Cloudflare Pages convierte en ruta cada archivo de esa carpeta.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onRequestPost } from '../functions/api/contacto'

// Resend es el único límite externo: se simula su API y se revisa lo que recibe.
let enviado
beforeEach(() => {
  enviado = null
  vi.stubGlobal('fetch', vi.fn(async (_url, init) => {
    enviado = JSON.parse(init.body)
    return new Response('{}', { status: 200 })
  }))
})
afterEach(() => vi.unstubAllGlobals())

const ENV = { RESEND_API_KEY: 're_prueba' }
const enviar = (datos, env = ENV) =>
  onRequestPost({
    request: new Request('https://loomware.com.mx/api/contacto', { method: 'POST', body: JSON.stringify(datos) }),
    env,
  })
const BASE = { nombre: 'Laura', contacto: 'laura@empresa.mx', necesidad: 'Inventario', acepta: true }

describe('formulario de contacto', () => {
  it('manda el aviso con el correo del prospecto como respuesta', async () => {
    const res = await enviar(BASE)
    expect(res.status).toBe(200)
    expect(enviado.to).toEqual(['aldo_sanchez@loomware.com.mx'])
    expect(enviado.reply_to).toBe('laura@empresa.mx')
  })

  it('toma como WhatsApp el contacto que no trae arroba', async () => {
    const res = await enviar({ ...BASE, contacto: '55 1234 5678' })
    expect(res.status).toBe(200)
    expect(enviado.reply_to).toBeUndefined()
    expect(enviado.text).toContain('WhatsApp / teléfono: 55 1234 5678')
  })

  it('rechaza un correo mal escrito en vez de guardarlo como teléfono', async () => {
    const res = await enviar({ ...BASE, contacto: 'laura@empresa' })
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'El correo no parece válido' })
    expect(enviado).toBeNull()
  })

  it('pide el aviso de privacidad aceptado del lado del servidor', async () => {
    const res = await enviar({ ...BASE, acepta: 'true' })
    expect(res.status).toBe(400)
    expect(enviado).toBeNull()
  })

  it('pide nombre y alguna forma de contestar', async () => {
    expect((await enviar({ ...BASE, nombre: '  ' })).status).toBe(400)
    expect((await enviar({ ...BASE, contacto: '' })).status).toBe(400)
    expect(enviado).toBeNull()
  })

  it('a un bot que llena el campo oculto le contesta bien sin mandar nada', async () => {
    const res = await enviar({ ...BASE, _gotcha: 'spam' })
    expect(res.status).toBe(200)
    expect(enviado).toBeNull()
  })

  it('manda a varias bandejas si LEAD_TO trae varias', async () => {
    await enviar(BASE, { ...ENV, LEAD_TO: 'a@loomware.com.mx, b@loomware.com.mx' })
    expect(enviado.to).toEqual(['a@loomware.com.mx', 'b@loomware.com.mx'])
  })
})
