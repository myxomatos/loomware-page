import { useState } from 'react'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { PREGUNTAS, calcular, pesos, FACTOR_PRESTACIONES, HORAS_MES, DIAS_HABILES } from '../data/calculadora'
import { EMAIL, whatsappUrl } from '../data/contacto'
import { rastrear } from '../lib/analytics'
import './calculadora.css'

/*
 * La cuenta se actualiza en cuanto se contesta cada pregunta: ver el número
 * moverse es la mitad del argumento. El correo se pide al final y sólo para
 * mandar el desglose; el resultado se enseña primero.
 */
const ENDPOINT = '/api/contacto'

export default function Calculadora() {
  const [r, setR] = useState({})
  // Dos campos: la cuenta ya viaja en el mensaje, así que sólo falta a quién
  // contestarle. Pedir la empresa aquí era un campo de más.
  const [datos, setDatos] = useState({ nombre: '', correo: '', acepta: false })
  const [estado, setEstado] = useState('idle')
  const [error, setError] = useState('')

  const res = calcular(r)
  const contestadas = PREGUNTAS.filter((p) => r[p.id] !== undefined).length

  const responder = (id, valor) => {
    setR((prev) => ({ ...prev, [id]: valor }))
    if (contestadas === 0) rastrear('calculadora_inicio')
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setDatos((d) => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEstado('enviando')

    // El correo le llega a Loomware con las respuestas y la cuenta ya hecha.
    const resumen = [
      ...PREGUNTAS.map((p) => {
        const op = p.opciones.find((o) => o.valor === r[p.id])
        return `${p.pregunta} → ${op ? op.label : '—'}`
      }),
      '',
      `Recaptura evitable: ${pesos(res.recaptura)} al mes (${Math.round(res.horasRecaptura)} horas)`,
      `Dinero detenido por facturar tarde: ${pesos(res.detenido)}`,
      `Costo por hora usado: ${pesos(res.costoHora)}`,
    ].join('\n')

    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...datos,
          necesidad: resumen,
          interes: 'Calculadora',
          origen: 'Calculadora',
          _gotcha: '',
        }),
      })
      const data = await resp.json().catch(() => null)
      if (!resp.ok) throw new Error((data && data.error) || `Error ${resp.status}`)
      rastrear('generate_lead', { metodo: 'calculadora' })
      window.location.assign('/gracias')
    } catch (err) {
      setEstado('error')
      setError(
        import.meta.env.DEV
          ? 'En local no corre la función de Cloudflare; pruébalo en el sitio publicado.'
          : err.message,
      )
    }
  }

  return (
    <>
      <header className="calc__nav">
        <div className="container calc__nav-inner">
          <a href="/" aria-label="Loomware — inicio">
            <Logo />
          </a>
          <a href="/#contacto" className="btn btn--outline btn--pill btn--sm">
            Diagnóstico
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </header>

      <main id="contenido" className="container calc">
        <div className="calc__intro">
          <span className="eyebrow">Con tus propios números</span>
          <h1>¿Cuánto te cuesta tu Excel?</h1>
          <p className="lead">
            Seis preguntas de un toque. Calculamos con tus números lo que hoy se va en capturar
            el mismo dato más de una vez, y cuánto dinero trae detenido facturar tarde. La cuenta
            completa queda a la vista para que la revises.
          </p>
        </div>

        <div className="calc__cols">
          <ol className="calc__preguntas">
            {PREGUNTAS.map((p, i) => (
              <li key={p.id} className={`calc__q ${r[p.id] !== undefined ? 'is-lista' : ''}`}>
                <div className="calc__q-head">
                  <span className="calc__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="h4">{p.pregunta}</h2>
                    <p className="calc__ayuda">{p.ayuda}</p>
                  </div>
                </div>
                <div className="calc__ops" role="group" aria-label={p.pregunta}>
                  {p.opciones.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      className={`calc__op ${r[p.id] === o.valor ? 'is-activa' : ''}`}
                      aria-pressed={r[p.id] === o.valor}
                      onClick={() => responder(p.id, o.valor)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <aside className="calc__panel">
            <div className="calc__tarjeta">
              <p className="calc__avance">
                {contestadas} de {PREGUNTAS.length} contestadas
              </p>

              {!res && (
                <p className="calc__espera">
                  El número aparece en cuanto contestes las seis. Tus respuestas se quedan en
                  esta pantalla.
                </p>
              )}

              {res && (
                <>
                  {res.capturaUnaVez ? (
                    <div className="calc__cifra calc__cifra--bien">
                      <span className="calc__etq">Recaptura</span>
                      <strong>$0</strong>
                      <p>Capturas una sola vez. Ese lado ya lo tienes resuelto.</p>
                    </div>
                  ) : (
                    <div className="calc__cifra">
                      <span className="calc__etq">Se va cada mes en capturar lo mismo</span>
                      <strong>{pesos(res.recaptura)}</strong>
                      <p>
                        Son {Math.round(res.horasRecaptura)} horas al mes de tu gente tecleando
                        algo que ya estaba tecleado.
                      </p>
                    </div>
                  )}

                  {!res.facturaElMismoDia && (
                    <div className="calc__cifra calc__cifra--sec">
                      <span className="calc__etq">Detenido por facturar tarde</span>
                      <strong>{pesos(res.detenido)}</strong>
                      <p>Dinero que ya entregaste y que todavía no puedes cobrar.</p>
                    </div>
                  )}

                  <details className="calc__cuenta">
                    <summary>Ver la cuenta completa</summary>
                    <ul>
                      <li>
                        Costo por hora: {pesos(r.sueldo)} × {FACTOR_PRESTACIONES} de prestaciones
                        ÷ {HORAS_MES} horas = <b>{pesos(res.costoHora)}</b>
                      </li>
                      <li>
                        Horas de captura al mes: {r.personas} personas × {r.minutos} min ×{' '}
                        {DIAS_HABILES} días = <b>{Math.round(res.horasMes)} horas</b>
                      </li>
                      <li>
                        Costo de esas horas: <b>{pesos(res.costoCaptura)}</b>
                      </li>
                      <li>
                        Parte evitable: se captura {r.veces} veces, así que{' '}
                        {r.veces > 1 ? `${r.veces - 1} de ${r.veces}` : '0'} sobran ={' '}
                        <b>{pesos(res.recaptura)}</b>
                      </li>
                      {!res.facturaElMismoDia && (
                        <li>
                          Detenido: {pesos(r.facturacion)} ÷ 30 días × {r.diasFactura} días ={' '}
                          <b>{pesos(res.detenido)}</b>
                        </li>
                      )}
                    </ul>
                    <p className="calc__nota">
                      Solo dos valores son nuestros: el {FACTOR_PRESTACIONES} de prestaciones y las{' '}
                      {HORAS_MES} horas al mes. Todo lo demás lo contestaste tú.
                    </p>
                  </details>

                  <form className="calc__form" onSubmit={enviar}>
                    <p className="calc__form-titulo">Recibe el desglose y cómo bajarlo</p>
                    <label className="visually-hidden" htmlFor="c-nombre">Nombre</label>
                    <input id="c-nombre" className="field" name="nombre" placeholder="Nombre"
                      required minLength={2} value={datos.nombre} onChange={onChange} autoComplete="name" />
                    <label className="visually-hidden" htmlFor="c-correo">Correo</label>
                    <input id="c-correo" className="field" type="email" name="correo"
                      placeholder="Correo" required value={datos.correo} onChange={onChange}
                      autoComplete="email" inputMode="email" />
                    <label className="calc__acepta">
                      <input type="checkbox" name="acepta" required checked={datos.acepta} onChange={onChange} />
                      <span>
                        Acepto el{' '}
                        <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">
                          aviso de privacidad
                        </a>
                        .
                      </span>
                    </label>
                    {estado === 'error' && (
                      <p className="calc__error" role="alert">
                        {error} <a href={`mailto:${EMAIL}`}>Escríbenos por correo</a>.
                      </p>
                    )}
                    <button type="submit" className="btn btn--primary btn--block"
                      disabled={estado === 'enviando'}>
                      {estado === 'enviando' ? 'Enviando…' : 'Recibir el desglose'}
                    </button>
                    <a
                      className="calc__wa"
                      href={whatsappUrl('Hola, hice la calculadora en loomware.com.mx y me interesa revisar mis números.')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      o mándanos un WhatsApp
                    </a>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
