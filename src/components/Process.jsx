import Icon from './Icon'
import './Process.css'

// Si algún día se conecta una agenda de verdad (Calendly, Cal.com…), esta
// variable la trae y el botón sí agenda. Mientras no exista, el botón no
// promete agendar: lleva al formulario y lo dice con esas palabras.
const SCHEDULE_URL = import.meta.env.VITE_SCHEDULE_URL || ''

const STEPS = [
  {
    n: '01',
    icon: 'search',
    title: 'Diagnóstico',
    text: 'Recorremos cómo operas hoy: qué se captura, quién lo captura y dónde se vuelve a teclear.',
  },
  {
    n: '02',
    icon: 'pencil',
    title: 'Diseño',
    text: 'Definimos qué se construye, hasta dónde llega y con qué se tiene que conectar.',
  },
  {
    n: '03',
    icon: 'settings',
    title: 'Implementación',
    text: 'Lo construimos y lo conectamos, con la gente que lo va a usar enfrente.',
  },
  {
    n: '04',
    icon: 'bar-chart',
    title: 'Acompañamiento',
    text: 'Medimos que se use, ajustamos lo que estorba y lo crecemos con tu operación.',
  },
]

export default function Process() {
  const scheduleProps = SCHEDULE_URL
    ? { href: SCHEDULE_URL, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#contacto' }

  return (
    <section id="proceso" className="section section--soft process">
      <div className="container process__inner">
        <div className="process__main">
          <h2 className="process__title">
            De la primera llamada al sistema operando
            <Icon name="arrow-right" size={26} className="process__title-arrow" />
          </h2>

          <ol className="process__steps">
            {STEPS.map((s, i) => (
              <li key={s.n} className="step">
                <div className="step__badges">
                  <span className="step__num" aria-hidden="true">
                    {s.n}
                  </span>
                  <span className="step__icon">
                    <Icon name={s.icon} size={18} />
                  </span>
                  {i < STEPS.length - 1 && <span className="step__line" aria-hidden="true" />}
                </div>
                <h3 className="h4 step__title">
                  <span className="visually-hidden">Paso {s.n}: </span>
                  {s.title}
                </h3>
                <p className="step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="card schedule">
          <span className="icon-tile icon-tile--acento schedule__icon">
            <Icon name="calendar" size={26} />
          </span>
          <h3 className="schedule__title">{SCHEDULE_URL ? 'Agenda una llamada' : 'La primera llamada es sin costo'}</h3>
          <p className="text-xs">
            Treinta minutos, sin compromiso, para entender tu operación y decirte por dónde
            conviene empezar.
          </p>
          <a className="btn btn--outline btn--sm" {...scheduleProps}>
            {SCHEDULE_URL ? 'Agendar ahora' : 'Pedir la llamada'}
            <Icon name="arrow-right" size={16} />
          </a>
        </aside>
      </div>
    </section>
  )
}
