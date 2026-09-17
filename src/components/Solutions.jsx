import Icon from './Icon'
import './Solutions.css'

const SOLUTIONS = [
  {
    id: 'crm',
    icon: 'users',
    title: 'CRM',
    text: 'Gestiona clientes, ventas y oportunidades en una sola plataforma.',
    tag: { icon: 'bar-chart', label: 'Convierte más oportunidades' },
  },
  {
    id: 'erp',
    icon: 'pie-chart',
    title: 'ERP',
    text: 'Conecta finanzas, inventario y operación en un sistema preparado para crecer.',
    tag: { icon: 'clock', label: 'Control total de tu negocio' },
  },
  {
    id: 'software',
    icon: 'code',
    title: 'Desarrollo de software',
    text: 'Soluciones a medida que se adaptan a tus procesos y objetivos.',
    tag: { icon: 'sliders', label: 'Hecho para tu operación' },
  },
  {
    id: 'automatizacion',
    icon: 'bot',
    title: 'Automatización',
    text: 'Reduce tareas manuales y acelera procesos con flujos inteligentes.',
    tag: { icon: 'shield-check', label: 'Ahorra tiempo y costos' },
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Infraestructura cloud',
    text: 'Seguridad, rendimiento y disponibilidad para una operación sin fricciones.',
    tag: { icon: 'cloud', label: 'Siempre disponible, siempre segura' },
  },
  {
    id: 'apps',
    icon: 'smartphone',
    title: 'Apps móviles',
    text: 'Experiencias móviles funcionales para equipos, clientes y operaciones críticas.',
    tag: { icon: 'smartphone', label: 'Tu negocio en cualquier lugar' },
  },
]

export default function Solutions() {
  return (
    <section id="soluciones" className="section section--soft solutions">
      <div className="container">
        <header className="section__head">
          <h2>Nuestras soluciones</h2>
          <p className="section__subtitle">
            Tecnología conectada para cada área crítica de tu operación.
          </p>
        </header>

        <ul className="solutions__grid">
          {SOLUTIONS.map((s) => (
            <li key={s.id} id={`solucion-${s.id}`} className="card solution">
              <span className="icon-tile">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="solution__title">{s.title}</h3>
              <p className="solution__text">{s.text}</p>
              <span className="chip chip--soft solution__tag">
                <Icon name={s.tag.icon} size={14} />
                {s.tag.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="solutions__more">
          <a href="#necesidades" className="link-arrow">
            Ver todas las soluciones
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
