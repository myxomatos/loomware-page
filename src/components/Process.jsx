import Icon from './Icon'
import './Process.css'

// Optional: link "Agendar ahora" to a scheduling page (Calendly, Cal.com…).
// Without it the button scrolls to the diagnostic form.
const SCHEDULE_URL = import.meta.env.VITE_SCHEDULE_URL || ''

const STEPS = [
  {
    n: '01',
    icon: 'search',
    title: 'Diagnóstico',
    text: 'Entendemos tu operación, objetivos y puntos críticos actuales.',
  },
  {
    n: '02',
    icon: 'pencil',
    title: 'Diseño',
    text: 'Definimos la solución, alcance e integraciones necesarias.',
  },
  {
    n: '03',
    icon: 'settings',
    title: 'Implementación',
    text: 'Configuramos, desarrollamos e integramos la solución con tu equipo.',
  },
  {
    n: '04',
    icon: 'bar-chart',
    title: 'Escalamiento',
    text: 'Medimos resultados, optimizamos y evolucionamos contigo.',
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
            Un proceso claro para resultados reales
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
          <h3 className="schedule__title">Agenda una llamada</h3>
          <p className="text-xs">Una llamada de 30 minutos, sin costo, para entender tu operación.</p>
          <a className="btn btn--outline btn--sm" {...scheduleProps}>
            Agendar ahora
            <Icon name="arrow-right" size={16} />
          </a>
        </aside>
      </div>
    </section>
  )
}
