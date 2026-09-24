/*
 * Cloudflare Pages Function: proxy hacia la API DENUE del INEGI.
 *
 *   GET /api/denue/<método>/<parámetros…>
 *
 * El navegador nunca ve el token del INEGI: se toma de la variable de entorno
 * DENUE_TOKEN y se agrega aquí. Además exige la contraseña PROSPECT_KEY en el
 * encabezado X-Prospect-Key para que la herramienta no quede abierta al público.
 *
 * Variables en Cloudflare → Settings → Environment variables:
 *   DENUE_TOKEN   token obtenido en https://www.inegi.org.mx/servicios/api_denue.html
 *   PROSPECT_KEY  contraseña que se pide al abrir /prospectar
 */
const INEGI = 'https://www.inegi.org.mx/app/api/denue/v1/consulta'
const METHODS = new Set([
  'Buscar',
  'Nombre',
  'BuscarEntidad',
  'BuscarAreaAct',
  'BuscarAreaActEstr',
  'Ficha',
  'Cuantificar',
])

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

// INEGI espera la coma literal en "lat,lng" y en listas de códigos.
const segment = (s) => encodeURIComponent(s).replace(/%2C/gi, ',')

export async function onRequestGet({ request, env, params }) {
  /* Las dos de un jalón, no de una en una. Revisando en orden, la ausencia del
     token tapaba a la de la contraseña: desde fuera no había manera de saber si
     PROSPECT_KEY estaba puesta sin cargar antes DENUE_TOKEN, y quien está
     capturando variables en Cloudflare lo que quiere saber es si ya quedó todo. */
  const faltan = ['DENUE_TOKEN', 'PROSPECT_KEY'].filter((v) => !env[v])
  if (faltan.length) return json({ error: `Falta configurar: ${faltan.join(', ')}` }, 500)

  if (request.headers.get('x-prospect-key') !== env.PROSPECT_KEY) {
    return json({ error: 'Contraseña incorrecta' }, 401)
  }

  const path = Array.isArray(params.path) ? params.path : [params.path]
  if (!METHODS.has(path[0])) return json({ error: 'Método DENUE no permitido' }, 400)

  const url = `${INEGI}/${path.map(segment).join('/')}/${env.DENUE_TOKEN}`
  const upstream = await fetch(url, { headers: { accept: 'application/json' } })
  const text = await upstream.text()

  return new Response(text, {
    status: upstream.status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'private, max-age=600',
    },
  })
}
