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

/* Cuatro resultados concretos. Antes decían «Más oportunidades atendidas» y
   «Más visibilidad operativa», que es lo que dice cualquier sitio de software
   empresarial. Estas cuatro frases venían de la sección «El desafío», que
   contaba lo mismo más abajo y con mejores palabras; al quitarla, se quedan
   aquí, que es donde el visitante ya está decidiendo si escribe. */
const IMPACT = [
  {
    icon: 'target',
    title: 'Cada prospecto con dueño y fecha',
    text: 'Cada oportunidad tiene responsable y siguiente paso, a la vista de todos.',
  },
  {
    icon: 'activity',
    title: 'Inventario real, al minuto',
    text: 'Lo que dice el sistema es lo que hay en el piso.',
  },
  {
    icon: 'list-checks',
    title: 'Lo repetitivo corre solo',
    text: 'Tu equipo dedica el día a lo que sí decide.',
  },
  {
    icon: 'trending-up',
    title: 'Sabes cuánto vas a cerrar',
    text: 'Decides con el número de hoy y con la cuenta a la vista.',
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
