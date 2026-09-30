import { useState } from 'react'
import Icon from './Icon'
import { EMAIL, WHATSAPP, whatsappUrl } from '../data/contacto'
import { clicWhatsApp, marcarLead } from '../lib/analytics'
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

/* Lo que el visitante recibe, en el orden en que lo recibe. Antes eran tres
   frases de plantilla de propuesta —«Oportunidades de mejora
   identificadas»— que no decían qué pasa ni cuándo. */
const BENEFITS = [
  'Una llamada de 30 minutos, sin costo y sin compromiso',
  'Revisamos cómo entra y se mueve un dato hoy',
  'Y te decimos qué conviene resolver primero',
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
      marcarLead('formulario')
      window.location.assign('/gracias')
    } catch (err) {
      setStatus('error')
      /* Lo que el servidor contesta sobre los datos —«Falta tu nombre»— sí se
         enseña, porque es lo que hay que corregir. Lo que contesta sobre su
         propia configuración —«Falta configurar RESEND_API_KEY»— no: eso es
         nuestro y el visitante no puede hacer nada con él. */
      const suyo = /^(Falta tu |El correo |Déjanos |Es necesario )/.test(err.message || '')
      setError(
        import.meta.env.DEV
          ? 'En local no corre la función de Cloudflare; prueba el formulario en el sitio publicado.'
          : suyo
            ? err.message
            : 'No pudimos enviar tu solicitud en este momento.',
      )
    }
  }

  return (
    <div id="contacto" className="card contact">
      <div className="contact__intro">
        <h3 className="contact__title">{titulo || 'Empecemos por el diagnóstico'}</h3>
        <p className="text-xs">
          {intro ||
            'Cuéntanos qué quieres resolver. Empezamos con una llamada de 30 minutos, sin costo, para entender tu operación y decirte por dónde conviene empezar.'}
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
          // Un solo valor: el navegador ignora «email tel» completo y entonces no
          // autocompleta nada. Se queda el correo, que es lo que más se escribe aquí.
          autoComplete="email"
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
