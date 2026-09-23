import { useState } from 'react'
import Icon from './Icon'
import { EMAIL, WHATSAPP, whatsappUrl } from '../data/contacto'
import { clicWhatsApp } from '../lib/analytics'
import './ContactForm.css'

/*
 * El formulario se envía a functions/api/contacto.js, que manda el correo con
 * Resend. Esa función sólo existe en Cloudflare: en `npm run dev` la petición
 * falla y se muestra el aviso de abajo, que ofrece escribir por correo.
 */
const ENDPOINT = '/api/contacto'
const FALLBACK_EMAIL = EMAIL

/* Tres campos. El de contacto acepta un WhatsApp o un correo, y el servidor
   distingue cuál es por la arroba. */
const INITIAL = { nombre: '', contacto: '', necesidad: '', acepta: false }

const BENEFITS = [
  'Análisis de tus canales y procesos',
  'Oportunidades de mejora identificadas',
  'Propuesta de solución y estimación',
]

function buildMailto(values, interes) {
  const subject = `Solicitud de diagnóstico — ${values.nombre}`
  const lines = [
    `Nombre: ${values.nombre}`,
    `WhatsApp o correo: ${values.contacto}`,
    interes ? `Interés principal: ${interes}` : null,
    '',
    'Necesidad:',
    values.necesidad || '(sin detalle)',
  ].filter((l) => l !== null)
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export default function ContactForm({ interes = '', titulo, intro, origen = 'Inicio' }) {
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
        body: JSON.stringify({ ...values, interes, origen, _gotcha }),
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
        <h3 className="contact__title">{titulo || 'Lleva tu negocio al siguiente nivel'}</h3>
        <p className="text-xs">
          {intro ||
            'Recibe un diagnóstico sin costo y descubre cómo podemos ayudarte a crecer con más control y eficiencia.'}
        </p>
        <ul className="check-list">
          {BENEFITS.map((b) => (
            <li key={b}>
              <Icon name="check" size={15} strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>

        <div className="contact__directo">
          <p className="contact__directo-titulo">¿Prefieres hablar directo?</p>
          <a
            href={whatsappUrl('Hola, prefiero platicar por WhatsApp sobre un diagnóstico para mi empresa.')}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__directo-enlace"
            onClick={() => clicWhatsApp('formulario')}
          >
            <span className="icon-tile icon-tile--sm icon-tile--soft">
              <Icon name="message-phone" size={16} />
            </span>
            <span>
              <strong>WhatsApp</strong> {WHATSAPP.display}
            </span>
          </a>
          <a href={`mailto:${EMAIL}`} className="contact__directo-enlace">
            <span className="icon-tile icon-tile--sm icon-tile--soft">
              <Icon name="mail" size={16} />
            </span>
            <span>
              <strong>Correo</strong> {EMAIL}
            </span>
          </a>
        </div>
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

        {/* Un solo campo de contacto: la gente escribe lo que prefiere que le
            contesten, y el servidor reconoce cuál es por la arroba. */}
        <label className="visually-hidden" htmlFor="f-contacto">
          WhatsApp o correo
        </label>
        <input
          id="f-contacto"
          className="field"
          type="text"
          name="contacto"
          placeholder="WhatsApp o correo"
          autoComplete="email tel"
          required
          minLength={6}
          value={values.contacto}
          onChange={onChange}
        />

        <label className="visually-hidden" htmlFor="f-necesidad">
          Qué quieres resolver
        </label>
        <textarea
          id="f-necesidad"
          className="field"
          name="necesidad"
          placeholder="¿Qué quieres resolver?"
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
          {status === 'sending' ? 'Enviando…' : 'Solicitar diagnóstico'}
        </button>

        <p className="contact__note">
          <Icon name="lock" size={13} />
          Tus datos se usan sólo para contestarte.
        </p>

      </form>
    </div>
  )
}
