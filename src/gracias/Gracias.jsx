import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { EMAIL, WHATSAPP, whatsappUrl } from '../data/contacto'
import './gracias.css'

const PASOS = [
  {
    icon: 'search',
    title: 'Revisamos tu solicitud',
    text: 'Analizamos tu operación y los puntos que nos compartiste.',
  },
  {
    icon: 'phone',
    title: 'Te contactamos',
    text: 'En menos de 24 horas hábiles, por el medio que prefieras.',
  },
  {
    icon: 'calendar',
    title: 'Agendamos tu diagnóstico',
    text: 'Sin costo y sin compromiso, en la fecha que mejor te acomode.',
  },
]

export default function Gracias() {
  return (
    <main className="gracias">
      <div className="gracias__card">
        <a href="/" aria-label="Loomware — inicio">
          <Logo size={36} />
        </a>

        <span className="gracias__check">
          <Icon name="check" size={34} strokeWidth={2.75} />
        </span>

        <h1 className="gracias__title text-gradient">¡Gracias!</h1>
        <p className="gracias__lead">
          Recibimos tu solicitud. En un momento nos comunicamos contigo.
        </p>

        <ol className="gracias__pasos">
          {PASOS.map((p, i) => (
            <li key={p.title} className="paso">
              <span className="paso__icon">
                <Icon name={p.icon} size={18} />
              </span>
              <div>
                <h2 className="paso__title">
                  <span className="paso__num">{i + 1}.</span> {p.title}
                </h2>
                <p className="paso__text">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="gracias__contacto">
          <p className="text-xs">¿Prefieres adelantarnos algo? Escríbenos o llámanos.</p>
          <div className="gracias__medios">
            <a className="chip" href={`mailto:${EMAIL}`}>
              <Icon name="mail" size={15} />
              {EMAIL}
            </a>
            <a className="chip" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="message-circle" size={15} />
              WhatsApp {WHATSAPP.display}
            </a>
          </div>
        </div>

        <a href="/" className="btn btn--outline">
          Volver al inicio
          <Icon name="arrow-right" size={16} />
        </a>
      </div>

      <p className="gracias__pie">Ideas de hoy. Negocios más grandes mañana.</p>
    </main>
  )
}
