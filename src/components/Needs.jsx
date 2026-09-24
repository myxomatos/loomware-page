import { useState } from 'react'
import Icon from './Icon'
import ContactForm from './ContactForm'
import './Needs.css'

const NEEDS = [
  { id: 'vender', icon: 'rocket', label: 'Vender más' },
  { id: 'controlar', icon: 'sliders', label: 'Controlar operación' },
  { id: 'excel', icon: 'table', label: 'Dejar Excel' },
  { id: 'crm', icon: 'users', label: 'Implementar CRM' },
  { id: 'erp', icon: 'pie-chart', label: 'Implementar ERP' },
  { id: 'automatizar', icon: 'settings', label: 'Automatizar procesos' },
]

const IMPACT = [
  {
    icon: 'bar-chart',
    title: 'Más oportunidades atendidas',
    text: 'Convierte más leads en clientes.',
  },
  {
    icon: 'user',
    title: 'Mayor seguimiento comercial',
    text: 'Da visibilidad total a tu equipo.',
  },
  {
    icon: 'clock',
    title: 'Menos tareas manuales',
    text: 'Tu equipo se enfoca en lo que realmente importa.',
  },
  {
    icon: 'pie-chart',
    title: 'Más visibilidad operativa',
    text: 'Toma decisiones con datos reales.',
  },
]

export default function Needs() {
  const [selected, setSelected] = useState(NEEDS[0].id)
  const selectedLabel = NEEDS.find((n) => n.id === selected)?.label || ''

  return (
    <section id="necesidades" className="section needs">
      <div className="container">
        <header className="section__head">
          <h2>¿Qué necesita tu empresa?</h2>
          <p className="section__subtitle">
            Encuentra rápidamente la solución que impulsará tu crecimiento.
          </p>
        </header>

        <div className="needs__chips" role="group" aria-label="Selecciona tu necesidad principal">
          {NEEDS.map((n) => (
            <button
              key={n.id}
              type="button"
              className="chip"
              aria-pressed={selected === n.id}
              onClick={() => setSelected(n.id)}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </button>
          ))}
        </div>

        <div id="impacto" className="card card--dark impact">
          <h3 className="impact__title">Impacto que puedes lograr</h3>
          <ul className="impact__list">
              {IMPACT.map((i) => (
                <li key={i.title} className="impact__item">
                  <Icon name={i.icon} size={28} strokeWidth={1.75} />
                  <h4 className="impact__item-title">{i.title}</h4>
                  <p className="impact__item-text">{i.text}</p>
                </li>
              ))}
          </ul>
        </div>

        <ContactForm interes={selectedLabel} />
      </div>
    </section>
  )
}
