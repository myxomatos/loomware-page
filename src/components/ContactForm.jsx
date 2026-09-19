import { useState } from 'react'
import Icon from './Icon'
import './ContactForm.css'

/*
 * Where the form posts to. Set VITE_FORM_ENDPOINT in .env (see .env.example)
 * to a Formspree / Web3Forms / own API URL that accepts JSON. Without it the
 * form falls back to opening the visitor's email client with the message
 * pre-filled, so the submit button always does something useful.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
const FALLBACK_EMAIL = 'aldo_sanchez@loomware.com.mx'

const INITIAL = { nombre: '', empresa: '', correo: '', telefono: '', necesidad: '' }

const BENEFITS = [
  'Análisis de tus canales y procesos',
  'Oportunidades de mejora identificadas',
  'Propuesta de solución y estimación',
]

function buildMailto(values, interes) {
  const subject = `Solicitud de diagnóstico — ${values.empresa || values.nombre}`
  const lines = [
    `Nombre: ${values.nombre}`,
    `Empresa: ${values.empresa}`,
    `Correo: ${values.correo}`,
    `WhatsApp / teléfono: ${values.telefono}`,
    interes ? `Interés principal: ${interes}` : null,
    '',
    'Necesidad:',
    values.necesidad || '(sin detalle)',
  ].filter((l) => l !== null)
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export default function ContactForm({ interes = '' }) {
  const [values, setValues] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // Honeypot: bots fill every field; humans never see this one.
    if (e.currentTarget.elements._gotcha.value) return

    setError('')

    if (!ENDPOINT) {
      window.location.href = buildMailto(values, interes)
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, interes, origen: 'Sitio web — formulario de diagnóstico' }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setValues(INITIAL)
    } catch {
      setStatus('error')
      setError('No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a ' + FALLBACK_EMAIL)
    }
  }

  const reset = () => {
    setValues(INITIAL)
    setStatus('idle')
    setError('')
  }

  return (
    <div id="contacto" className="card contact">
      <div className="contact__intro">
        <h3 className="contact__title">Lleva tu negocio al siguiente nivel</h3>
        <p className="text-xs">
          Recibe un diagnóstico sin costo y descubre cómo podemos ayudarte a crecer con más
          control y eficiencia.
        </p>
        <ul className="check-list">
          {BENEFITS.map((b) => (
            <li key={b}>
              <Icon name="check" size={15} strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {status === 'success' ? (
        <div className="contact__success" role="status" aria-live="polite">
          <span className="icon-tile icon-tile--round">
            <Icon name="check" size={24} strokeWidth={2.5} />
          </span>
          <h4>¡Listo! Recibimos tu solicitud.</h4>
          <p className="text-xs">
            {ENDPOINT
              ? 'Te contactaremos en menos de 24 horas hábiles.'
              : 'Se abrió tu cliente de correo con la solicitud lista para enviar.'}
          </p>
          <button type="button" className="btn btn--outline btn--sm" onClick={reset}>
            Enviar otra solicitud
          </button>
        </div>
      ) : (
        <form className="contact__form" onSubmit={onSubmit}>
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            className="visually-hidden"
            aria-hidden="true"
          />
          <input type="hidden" name="interes" value={interes} />

          {interes && (
            <p className="contact__interes">
              Interés seleccionado: <strong>{interes}</strong>
            </p>
          )}

          <label className="visually-hidden" htmlFor="f-nombre">
            Nombre completo
          </label>
          <input
            id="f-nombre"
            className="field"
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            autoComplete="name"
            required
            minLength={2}
            value={values.nombre}
            onChange={onChange}
          />

          <label className="visually-hidden" htmlFor="f-empresa">
            Empresa
          </label>
          <input
            id="f-empresa"
            className="field"
            type="text"
            name="empresa"
            placeholder="Empresa"
            autoComplete="organization"
            required
            value={values.empresa}
            onChange={onChange}
          />

          <label className="visually-hidden" htmlFor="f-correo">
            Correo corporativo
          </label>
          <input
            id="f-correo"
            className="field"
            type="email"
            name="correo"
            placeholder="Correo corporativo"
            autoComplete="email"
            inputMode="email"
            required
            value={values.correo}
            onChange={onChange}
          />

          <label className="visually-hidden" htmlFor="f-telefono">
            WhatsApp o teléfono
          </label>
          <input
            id="f-telefono"
            className="field"
            type="tel"
            name="telefono"
            placeholder="WhatsApp o teléfono"
            autoComplete="tel"
            inputMode="tel"
            required
            minLength={8}
            value={values.telefono}
            onChange={onChange}
          />

          <label className="visually-hidden" htmlFor="f-necesidad">
            Cuéntanos brevemente tu necesidad
          </label>
          <textarea
            id="f-necesidad"
            className="field"
            name="necesidad"
            placeholder="Cuéntanos brevemente tu necesidad"
            rows={3}
            maxLength={1000}
            value={values.necesidad}
            onChange={onChange}
          />

          {status === 'error' && (
            <p className="contact__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--block"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando…' : 'Solicitar diagnóstico gratuito'}
          </button>

          <p className="contact__note">
            <Icon name="lock" size={13} />
            Tu información está segura. No enviamos spam.
          </p>
        </form>
      )}
    </div>
  )
}
