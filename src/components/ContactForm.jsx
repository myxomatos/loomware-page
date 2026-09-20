import { useState } from 'react'
import Icon from './Icon'
import { EMAIL, whatsappUrl } from '../data/contacto'
import './ContactForm.css'

/*
 * El formulario se envía a functions/api/contacto.js, que manda el correo con
 * Resend. Esa función sólo existe en Cloudflare: en `npm run dev` la petición
 * falla y se muestra el aviso de abajo, que ofrece escribir por correo.
 */
const ENDPOINT = '/api/contacto'
const FALLBACK_EMAIL = EMAIL

const INITIAL = { nombre: '', empresa: '', correo: '', telefono: '', necesidad: '', acepta: false }

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
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // Honeypot: los bots lo llenan; la persona nunca lo ve. Lo valida el servidor.
    const _gotcha = e.currentTarget.elements._gotcha.value

    setError('')
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, interes, _gotcha }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error((data && data.error) || `Error ${res.status}`)
      window.location.assign('/gracias')
    } catch (err) {
      setStatus('error')
      setError(
        import.meta.env.DEV
          ? 'En local no corre la función de Cloudflare; prueba el formulario en el sitio publicado.'
          : err.message,
      )
    }
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

        <label className="contact__acepta">
          <input
            type="checkbox"
            name="acepta"
            required
            checked={values.acepta}
            onChange={onChange}
          />
          <span>
            He leído y acepto el{' '}
            <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">
              aviso de privacidad
            </a>
            . Mis datos se usan sólo para atender esta solicitud.
          </span>
        </label>

        {status === 'error' && (
          <p className="contact__error" role="alert">
            {error}{' '}
            <a href={buildMailto(values, interes)}>Escríbenos por correo</a>.
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

        <div className="contact__o">
          <span>o</span>
        </div>
        <a
          href={whatsappUrl('Hola, prefiero platicar por WhatsApp sobre un diagnóstico para mi empresa.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--whatsapp-outline btn--block"
        >
          <Icon name="whatsapp" size={20} strokeWidth={0} />
          Mejor por WhatsApp
        </a>
      </form>
    </div>
  )
}
