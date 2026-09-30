import { useState } from 'react'
import Icon from './Icon'
import ContactForm from './ContactForm'
import { servicioPorSlug } from '../data/servicios'
import './Needs.css'

/* Cada necesidad con las soluciones que la resuelven. Al tocar un chip se
   enseñan aquí mismo, con el resumen que ya está escrito en servicios.js:
   así el chip hace lo que el subtítulo promete y no hay texto nuevo que
   pueda desfasarse del de las páginas. */
const NEEDS = [
  { id: 'vender', icon: 'rocket', label: 'Vender más', con: ['crm', 'tienda-en-linea'] },
  { id: 'controlar', icon: 'sliders', label: 'Controlar operación', con: ['erp', 'apps-moviles'] },
  { id: 'excel', icon: 'table', label: 'Dejar Excel', con: ['erp', 'nomina'] },
  { id: 'crm', icon: 'users', label: 'Implementar CRM', con: ['crm'] },
  { id: 'erp', icon: 'pie-chart', label: 'Implementar ERP', con: ['erp'] },
  { id: 'automatizar', icon: 'settings', label: 'Automatizar procesos', con: ['automatizacion', 'software-a-medida'] },
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
  /* Nada preseleccionado: el interés que llega en el correo es el que la
     persona eligió, no el primero de la lista. */
  const [selected, setSelected] = useState(null)
  const elegida = NEEDS.find((n) => n.id === selected)
  const selectedLabel = elegida?.label || ''
  const soluciones = (elegida?.con || []).map(servicioPorSlug).filter(Boolean)

  return (
    <section id="necesidades" className="section needs">
      <div className="container">
        <header className="section__head">
          <h2>¿Qué necesita tu empresa?</h2>
          <p className="section__subtitle">
            Toca lo que quieres resolver y te decimos con qué se resuelve.
          </p>
        </header>

        <div className="needs__chips" role="group" aria-label="Selecciona tu necesidad principal">
          {NEEDS.map((n) => (
            <button
              key={n.id}
              type="button"
              className="chip"
              aria-pressed={selected === n.id}
              aria-controls="necesidad-respuesta"
              onClick={() => setSelected(selected === n.id ? null : n.id)}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </button>
          ))}
        </div>

        {/* La respuesta al chip. Es una región viva: quien usa un lector de
            pantalla se entera de que apareció sin tener que ir a buscarla. */}
        <div id="necesidad-respuesta" className="needs__respuesta" aria-live="polite">
          {soluciones.length > 0 && (
            <>
              <p className="needs__respuesta-titulo">
                Para <strong>{selectedLabel.toLowerCase()}</strong>, esto es lo que resuelve:
              </p>
              <ul className="needs__soluciones">
                {soluciones.map((s) => (
                  <li key={s.slug}>
                    <a href={`/servicios/${s.slug}`} className="needs__solucion">
                      <span className="icon-tile icon-tile--sm icon-tile--soft">
                        <Icon name={s.icon} size={18} />
                      </span>
                      <span className="needs__solucion-texto">
                        <strong>{s.nombre}</strong>
                        <span>{s.resumen}</span>
                      </span>
                      <Icon name="arrow-right" size={16} className="needs__solucion-flecha" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div id="impacto" className="card card--dark impact">
          <h3 className="impact__title">Lo que cambia en la operación</h3>
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
