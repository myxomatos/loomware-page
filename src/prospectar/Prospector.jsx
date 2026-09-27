import { useMemo, useState } from 'react'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { ESTADOS, ALCALDIAS_CDMX, SECTORES_SCIAN, ESTRATOS } from './catalogs'
import {
  AuthError,
  PAGE_SIZE,
  buscarPorGiro,
  buscarPorActividad,
  buscarCerca,
  getKey,
  setKey,
  clearKey,
  toCsv,
} from './denue'
import './prospector.css'

// En desarrollo el proxy de Vite no pide contraseña; en producción sí.
const NEEDS_KEY = !import.meta.env.DEV

const MODES = [
  { id: 'giro', label: 'Por giro y estado' },
  { id: 'actividad', label: 'Por actividad, zona y tamaño' },
  { id: 'cerca', label: 'Cerca de un punto' },
]

function Gate({ onEnter }) {
  const [value, setValue] = useState('')
  return (
    <form
      className="gate card"
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) onEnter(value.trim())
      }}
    >
      <a href="/" aria-label="Loomware — inicio">
        <Logo />
      </a>
      <h1 className="h3">Prospección de empresas</h1>
      <p className="text-xs">Herramienta interna. Escribe la contraseña para continuar.</p>
      <input
        className="field"
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn--primary btn--block">
        Entrar
      </button>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="pf">
      <span className="pf__label">{label}</span>
      {children}
    </label>
  )
}

export default function Prospector() {
  const [authed, setAuthed] = useState(!NEEDS_KEY || Boolean(getKey()))
  const [mode, setMode] = useState('giro')
  const [q, setQ] = useState({
    palabra: '',
    estado: '09',
    municipio: '',
    sector: '',
    scian: '',
    estrato: '0',
    nombre: '',
    lat: '19.4326',
    lng: '-99.1332',
    metros: '2000',
  })
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ estratos: new Set(), tel: false, correo: false })
  const [selected, setSelected] = useState(new Set())

  const set = (k) => (e) => setQ((v) => ({ ...v, [k]: e.target.value }))

  const run = async (p = 1) => {
    setStatus('loading')
    setError('')
    setSelected(new Set())
    try {
      let data
      if (mode === 'giro') data = await buscarPorGiro(q.palabra, q.estado, p)
      else if (mode === 'actividad')
        data = await buscarPorActividad({ ...q, scian: q.scian || q.sector }, p)
      else data = await buscarCerca(q.palabra, q.lat, q.lng, q.metros)
      setRows(data)
      setPage(p)
      setStatus('done')
    } catch (err) {
      if (err instanceof AuthError) {
        clearKey()
        setAuthed(false)
      }
      setRows([])
      setStatus('error')
      setError(err.message)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(1)
  }

  const visible = useMemo(
    () =>
      rows.filter((r) => {
        if (filters.tel && !r.telefono) return false
        if (filters.correo && !r.correo) return false
        if (filters.estratos.size && !filters.estratos.has(r.estrato)) return false
        return true
      }),
    [rows, filters],
  )

  const toggleEstrato = (label) =>
    setFilters((f) => {
      const next = new Set(f.estratos)
      next.has(label) ? next.delete(label) : next.add(label)
      return { ...f, estratos: next }
    })

  const toggleRow = (id) =>
    setSelected((s) => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const exportCsv = () => {
    const subset = selected.size ? visible.filter((r) => selected.has(r.id)) : visible
    const blob = new Blob([toCsv(subset)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `prospectos-denue-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  // Los estratos presentes en el resultado, en el orden del catálogo.
  const estratosPresentes = useMemo(() => {
    const present = new Set(rows.map((r) => r.estrato).filter(Boolean))
    const order = ESTRATOS.map(([, l]) => l)
    return [...present].sort((a, b) => {
      const ia = order.findIndex((o) => a.startsWith(o))
      const ib = order.findIndex((o) => b.startsWith(o))
      return ia - ib
    })
  }, [rows])

  if (!authed) {
    return (
      <main className="prospect prospect--gate">
        <Gate
          onEnter={(k) => {
            setKey(k)
            setAuthed(true)
          }}
        />
      </main>
    )
  }

  const paged = mode !== 'cerca'

  return (
    <main className="prospect">
      <header className="prospect__head">
        <a href="/" className="prospect__brand" aria-label="Ir al sitio">
          <Logo />
        </a>
        <div>
          <h1 className="h3">Prospección de empresas</h1>
          <p className="text-xs">
            Datos del DENUE (INEGI). Busca por giro, zona y tamaño; filtra y exporta a Excel.
          </p>
        </div>
      </header>

      <form className="card prospect__form" onSubmit={onSubmit}>
        <div className="prospect__modes" role="tablist" aria-label="Tipo de búsqueda">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              className="chip"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="prospect__fields">
          {mode === 'giro' && (
            <>
              <Field label="Giro o palabra clave">
                <input
                  className="field"
                  placeholder="software, restaurante, ferretería…"
                  value={q.palabra}
                  onChange={set('palabra')}
                  required
                />
              </Field>
              <Field label="Estado">
                <select className="field" value={q.estado} onChange={set('estado')}>
                  {ESTADOS.map(([c, n]) => (
                    <option key={c} value={c}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          {mode === 'actividad' && (
            <>
              <Field label="Estado">
                <select className="field" value={q.estado} onChange={set('estado')}>
                  {ESTADOS.filter(([c]) => c !== '00').map(([c, n]) => (
                    <option key={c} value={c}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={q.estado === '09' ? 'Alcaldía' : 'Municipio (clave INEGI, 3 dígitos)'}>
                {q.estado === '09' ? (
                  <select className="field" value={q.municipio} onChange={set('municipio')}>
                    <option value="">Toda la CDMX</option>
                    {ALCALDIAS_CDMX.map(([c, n]) => (
                      <option key={c} value={c}>
                        {n}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="field"
                    placeholder="vacío = todo el estado"
                    inputMode="numeric"
                    maxLength={3}
                    value={q.municipio}
                    onChange={set('municipio')}
                  />
                )}
              </Field>
              <Field label="Sector SCIAN">
                <select className="field" value={q.sector} onChange={set('sector')}>
                  <option value="">Todos los sectores</option>
                  {SECTORES_SCIAN.map(([c, n]) => (
                    <option key={c} value={c}>
                      {c} · {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Código SCIAN específico (opcional)">
                <input
                  className="field"
                  placeholder="3, 4 o 6 dígitos, ej. 541510"
                  inputMode="numeric"
                  value={q.scian}
                  onChange={set('scian')}
                />
              </Field>
              <Field label="Tamaño (personas ocupadas)">
                <select className="field" value={q.estrato} onChange={set('estrato')}>
                  <option value="0">Cualquier tamaño</option>
                  {ESTRATOS.map(([c, n]) => (
                    <option key={c} value={c}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nombre contiene (opcional)">
                <input className="field" value={q.nombre} onChange={set('nombre')} />
              </Field>
            </>
          )}

          {mode === 'cerca' && (
            <>
              <Field label="Giro o palabra clave">
                <input
                  className="field"
                  placeholder="todos"
                  value={q.palabra}
                  onChange={set('palabra')}
                />
              </Field>
              <Field label="Latitud">
                <input className="field" value={q.lat} onChange={set('lat')} required />
              </Field>
              <Field label="Longitud">
                <input className="field" value={q.lng} onChange={set('lng')} required />
              </Field>
              <Field label="Radio en metros (máx. 5000)">
                <input
                  className="field"
                  type="number"
                  min={100}
                  max={5000}
                  step={100}
                  value={q.metros}
                  onChange={set('metros')}
                />
              </Field>
            </>
          )}
        </div>

        <div className="prospect__actions">
          <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
            <Icon name="search" size={16} />
            {status === 'loading' ? 'Buscando…' : 'Buscar'}
          </button>
          {mode === 'cerca' && (
            <span className="text-xs">
              Tip: en Google Maps, clic derecho sobre el punto → copia las coordenadas.
            </span>
          )}
        </div>
      </form>

      {status === 'error' && (
        <p className="prospect__error" role="alert">
          {error}
        </p>
      )}

      {status === 'done' && (
        <section className="prospect__results">
          <div className="prospect__toolbar">
            <div className="prospect__count">
              <strong>{visible.length}</strong> de {rows.length} resultados
              {paged && ` · página ${page}`}
              {selected.size > 0 && ` · ${selected.size} seleccionados`}
            </div>

            <div className="prospect__filters">
              {estratosPresentes.map((e) => (
                <button
                  key={e}
                  type="button"
                  className="chip"
                  aria-pressed={filters.estratos.has(e)}
                  onClick={() => toggleEstrato(e)}
                >
                  {e.replace(' personas', '')}
                </button>
              ))}
              <button
                type="button"
                className="chip"
                aria-pressed={filters.tel}
                onClick={() => setFilters((f) => ({ ...f, tel: !f.tel }))}
              >
                <Icon name="phone" size={14} />
                Con teléfono
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={filters.correo}
                onClick={() => setFilters((f) => ({ ...f, correo: !f.correo }))}
              >
                <Icon name="mail" size={14} />
                Con correo
              </button>
            </div>

            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={exportCsv}
              disabled={!visible.length}
            >
              Exportar {selected.size ? `${selected.size} ` : ''}a Excel (CSV)
            </button>
          </div>

          {visible.length === 0 ? (
            <p className="prospect__empty">
              Sin resultados con estos criterios. Prueba otra palabra, quita filtros o amplía la zona.
            </p>
          ) : (
            <div className="prospect__table-wrap">
              <table className="prospect__table">
                <thead>
                  <tr>
                    <th>
                      <span className="visually-hidden">Seleccionar</span>
                    </th>
                    <th>Empresa</th>
                    <th>Actividad</th>
                    <th>Personal</th>
                    <th>Contacto</th>
                    <th>Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r.id} className={selected.has(r.id) ? 'is-selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.has(r.id)}
                          onChange={() => toggleRow(r.id)}
                          aria-label={`Seleccionar ${r.nombre}`}
                        />
                      </td>
                      <td>
                        <strong>{r.nombre}</strong>
                        {r.razon && r.razon !== r.nombre && (
                          <span className="prospect__sub">{r.razon}</span>
                        )}
                      </td>
                      <td className="prospect__act">{r.actividad}</td>
                      <td className="prospect__nowrap">{r.estrato.replace(' personas', '')}</td>
                      <td>
                        {r.telefono && (
                          <a href={`tel:${r.telefono.replace(/\D/g, '')}`} className="prospect__link">
                            <Icon name="phone" size={13} />
                            {r.telefono}
                          </a>
                        )}
                        {r.correo && (
                          <a href={`mailto:${r.correo}`} className="prospect__link">
                            <Icon name="mail" size={13} />
                            {r.correo}
                          </a>
                        )}
                        {r.web && (
                          <a
                            href={r.web.startsWith('http') ? r.web : `https://${r.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="prospect__link"
                          >
                            <Icon name="globe" size={13} />
                            {r.web}
                          </a>
                        )}
                        {!r.telefono && !r.correo && !r.web && <span className="prospect__sub">—</span>}
                      </td>
                      <td>
                        <span className="prospect__sub">{r.direccion}</span>
                        {r.lat && r.lng && (
                          <a
                            href={`https://www.google.com/maps?q=${r.lat},${r.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="prospect__link"
                          >
                            <Icon name="map-pin" size={13} />
                            Ver en mapa
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {paged && (
            <div className="prospect__pager">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                disabled={page === 1 || status === 'loading'}
                onClick={() => run(page - 1)}
              >
                ← Anterior
              </button>
              <span className="text-xs">Página {page}</span>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                disabled={rows.length < PAGE_SIZE || status === 'loading'}
                onClick={() => run(page + 1)}
              >
                Siguiente →
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
