import Icon from './Icon'
import { SERVICIOS } from '../data/servicios'
import './Solutions.css'

/*
 * Las tarjetas salen de src/data/servicios.js, el mismo archivo que genera las
 * páginas /servicios/<slug>. Así el inicio y las páginas nunca se desfasan.
 */
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
          {SERVICIOS.map((s) => (
            <li key={s.slug} id={`solucion-${s.slug}`} className="card solution">
              <a href={`/servicios/${s.slug}`} className="solution__link">
                <span className="icon-tile">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="solution__title">{s.nombre}</h3>
                <p className="solution__text">{s.resumen}</p>
                <span className="chip chip--soft solution__tag">
                  <Icon name={s.beneficio.icon} size={14} />
                  {s.beneficio.label}
                </span>
                <span className="solution__more">
                  Ver más
                  <Icon name="arrow-right" size={14} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
