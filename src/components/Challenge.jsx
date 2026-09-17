import Icon from './Icon'
import Logo from './Logo'
import './Challenge.css'

const PAINS = [
  'Información dispersa',
  'Procesos manuales y lentos',
  'Falta de visibilidad del negocio',
  'Sistemas que no se integran',
  'Decisiones sin datos confiables',
]

const INPUTS = [
  { icon: 'message-circle', label: 'WhatsApp', tone: 'green' },
  { icon: 'globe', label: 'Web / Formularios' },
  { icon: 'instagram', label: 'Redes sociales' },
  { icon: 'mail', label: 'Correo / Llamadas' },
  { icon: 'file-spreadsheet', label: 'Excel y archivos' },
  { icon: 'database', label: 'Otros sistemas' },
]

const CORE = [
  'Captura y centraliza',
  'Integra y automatiza',
  'Unifica tu operación',
  'Convierte datos en acción',
  'Se adapta a tu negocio',
]

const RESULTS = [
  { icon: 'target', label: 'Oportunidades atendidas' },
  { icon: 'refresh-cw', label: 'Seguimiento constante' },
  { icon: 'list-checks', label: 'Menos tareas manuales' },
  { icon: 'activity', label: 'Información en tiempo real' },
  { icon: 'lightbulb', label: 'Mejores decisiones' },
  { icon: 'trending-up', label: 'Más ventas y crecimiento' },
]

function FlowArrow() {
  return (
    <div className="flow__arrow" aria-hidden="true">
      <Icon name="arrow-right" size={22} />
    </div>
  )
}

export default function Challenge() {
  return (
    <section id="desafio" className="section challenge">
      <div className="container">
        <div className="card challenge__card">
          <div className="challenge__copy">
            <span className="eyebrow eyebrow--purple">El desafío</span>
            <h2 className="challenge__title">
              Tu negocio <span className="challenge__accent">crece.</span>
              <br />
              ¿Tus procesos también?
            </h2>
            <p className="text-sm">
              Cuando la información está en todas partes, el control se pierde y las
              oportunidades se escapan.
            </p>
            <ul className="challenge__pains">
              {PAINS.map((p) => (
                <li key={p}>
                  <span className="icon-tile icon-tile--sm icon-tile--danger">
                    <Icon name="x" size={14} strokeWidth={2.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="challenge__flow">
            <div className="flow__col">
              <p className="flow__label">Entradas</p>
              <p className="flow__hint">Los datos llegan por todos lados</p>
              <ul className="flow__list card">
                {INPUTS.map((i) => (
                  <li key={i.label}>
                    <span className={`icon-tile icon-tile--sm icon-tile--soft ${i.tone === 'green' ? 'is-green' : ''}`}>
                      <Icon name={i.icon} size={16} />
                    </span>
                    {i.label}
                  </li>
                ))}
              </ul>
            </div>

            <FlowArrow />

            <div className="flow__col flow__col--core">
              <div className="card card--dark flow__core">
                <Logo variant="light" size={40} className="flow__brand" />
                <ul className="check-list flow__core-list">
                  {CORE.map((c) => (
                    <li key={c}>
                      <Icon name="check" size={16} strokeWidth={2.5} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <FlowArrow />

            <div className="flow__col">
              <p className="flow__label">Resultados</p>
              <p className="flow__hint">Más control, más ventas, menos trabajo manual</p>
              <ul className="flow__list card">
                {RESULTS.map((r) => (
                  <li key={r.label}>
                    <span className="icon-tile icon-tile--sm icon-tile--soft">
                      <Icon name={r.icon} size={16} />
                    </span>
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
