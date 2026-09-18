/*
 * Cliente de la API DENUE a través del proxy /api/denue
 * (functions/api/denue en producción, proxy de Vite en desarrollo).
 */
const KEY_STORAGE = 'prospect_key'
export const PAGE_SIZE = 50

export class AuthError extends Error {}

export const getKey = () => sessionStorage.getItem(KEY_STORAGE) || ''
export const setKey = (k) => sessionStorage.setItem(KEY_STORAGE, k)
export const clearKey = () => sessionStorage.removeItem(KEY_STORAGE)

// INEGI espera la coma literal en "lat,lng".
const seg = (s) => encodeURIComponent(String(s).trim()).replace(/%2C/gi, ',')

async function call(parts) {
  const res = await fetch(`/api/denue/${parts.map(seg).join('/')}`, {
    headers: { 'x-prospect-key': getKey() },
  })
  if (res.status === 401) throw new AuthError('Contraseña incorrecta')
  const text = await res.text()
  let data = null
  try {
    data = JSON.parse(text)
  } catch {
    data = null
  }
  if (!res.ok) throw new Error((data && data.error) || `Error ${res.status} del INEGI`)
  if (Array.isArray(data)) return data.map(normalize)
  // El INEGI responde texto plano (con HTTP 200) tanto para errores como para "sin resultados".
  const msg = ((data && (data.message || data.error)) || text).trim()
  if (/no autorizado|clave/i.test(msg)) throw new Error('Token del INEGI inválido o sin configurar (DENUE_TOKEN).')
  if (!msg || /no se encontr|sin resultados|no hay/i.test(msg)) return []
  throw new Error(msg.slice(0, 200))
}

/** Palabra clave en un estado ("00" = todo México). Pagina de PAGE_SIZE. */
export const buscarPorGiro = (palabra, estado, page = 1) =>
  call(['BuscarEntidad', palabra || 'todos', estado, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE])

/** Actividad SCIAN + zona + tamaño. Vacío = "0" (sin filtro). */
export const buscarPorActividad = ({ estado, municipio, scian, estrato, nombre }, page = 1) => {
  const code = (scian || '').replace(/\D/g, '')
  const sector = code.length === 2 ? code : '0'
  const subsector = code.length === 3 ? code : '0'
  const rama = code.length === 4 ? code : '0'
  const clase = code.length === 6 ? code : '0'
  return call([
    'BuscarAreaActEstr',
    estado || '0',
    municipio || '0',
    '0', // localidad
    '0', // AGEB
    '0', // manzana
    sector,
    subsector,
    rama,
    clase,
    nombre || '0',
    (page - 1) * PAGE_SIZE + 1,
    page * PAGE_SIZE,
    '0', // id
    estrato || '0',
  ])
}

/** Palabra clave alrededor de una coordenada, radio en metros (máx. 5000). */
export const buscarCerca = (palabra, lat, lng, metros) =>
  call(['Buscar', palabra || 'todos', `${lat},${lng}`, Math.min(Number(metros) || 1000, 5000)])

const pick = (r, ...keys) => {
  for (const k of keys) {
    if (r[k] != null && String(r[k]).trim() !== '') return String(r[k]).trim()
  }
  return ''
}

function normalize(r) {
  // A veces 'Calle' ya trae el tipo de vialidad ('CALZADA DE LA VIRGEN'); no repetirlo.
  const tipo = pick(r, 'Tipo_vialidad')
  const nombreCalle = pick(r, 'Calle')
  const repetido = tipo && nombreCalle.toUpperCase().startsWith(tipo.toUpperCase() + ' ')
  const calle = [repetido ? '' : tipo, nombreCalle, pick(r, 'Num_Exterior')].filter(Boolean).join(' ')
  return {
    id: pick(r, 'Id', 'id'),
    nombre: pick(r, 'Nombre', 'nombre'),
    razon: pick(r, 'Razon_social', 'razon_social'),
    actividad: pick(r, 'Clase_actividad', 'clase_actividad'),
    estrato: pick(r, 'Estrato', 'estrato'),
    direccion: [calle, pick(r, 'Colonia'), pick(r, 'CP')].filter(Boolean).join(', '),
    ubicacion: pick(r, 'Ubicacion', 'ubicacion'),
    telefono: pick(r, 'Telefono', 'telefono'),
    correo: pick(r, 'Correo_e', 'correo_e').toLowerCase(),
    web: pick(r, 'Sitio_internet', 'sitio_internet').toLowerCase(),
    lat: pick(r, 'Latitud'),
    lng: pick(r, 'Longitud'),
  }
}

const CSV_COLUMNS = [
  ['nombre', 'Nombre'],
  ['razon', 'Razón social'],
  ['actividad', 'Actividad'],
  ['estrato', 'Personal'],
  ['telefono', 'Teléfono'],
  ['correo', 'Correo'],
  ['web', 'Sitio web'],
  ['direccion', 'Dirección'],
  ['ubicacion', 'Municipio / estado'],
  ['lat', 'Latitud'],
  ['lng', 'Longitud'],
]

/** CSV con BOM para que Excel abra los acentos correctamente. */
export function toCsv(rows) {
  const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
  const lines = [CSV_COLUMNS.map(([, h]) => esc(h)).join(',')]
  for (const r of rows) lines.push(CSV_COLUMNS.map(([k]) => esc(r[k])).join(','))
  return '﻿' + lines.join('\r\n')
}
