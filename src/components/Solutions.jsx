import Icon from './Icon'
import { SERVICIOS } from '../data/servicios'
import './Solutions.css'

/*
 * Las tarjetas salen de src/data/servicios.js, el mismo archivo que genera las
 * páginas /servicios/<slug>. Así el inicio y las páginas nunca se desfasan.
 *
 * Van en dos niveles. Las marcadas con `entrada` son por donde suele empezar
 * un cliente y llevan tarjeta completa; las demás acompañan y van en lista.
 * Ocho tarjetas iguales no le decían al visitante por dónde arrancar.
 *
 * El enlace al recorrido vive en el hero, no aquí: tenerlo en los dos lugares
 * de la misma página partía la atención sin agregar nada.
 */
const ENTRADA = SERVICIOS.filter((s) => s.entrada)
const RESTO = SERVICIOS.filter((s) => !s.entrada)

export default function Solutions() {
  return (
    <section id="soluciones" className="section section--soft solutions">
      <div className="container">
        <header className="section__head">
          <h2>Soluciones que se hablan entre sí</h2>
          <p className="section__subtitle">
            Cada una resuelve un área, y todas escriben en el mismo lugar. Así el dato se
            captura una vez y aparece donde tiene que aparecer.
          </p>
        </header>

        <p className="solutions__grupo">Por donde suelen empezar</p>
        <ul className="solutions__grid">
          {ENTRADA.map((s) => (
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
              </a>
              <div className="solution__acciones">
                <a href={`/servicios/${s.slug}`} className="solution__more">
                  Ver más
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="solutions__grupo">Y todo lo que las acompaña</p>
        <ul className="solutions__lista">
          {RESTO.map((s) => (
            <li key={s.slug} id={`solucion-${s.slug}`}>
              <a href={`/servicios/${s.slug}`} className="solution-row">
                <span className="icon-tile icon-tile--sm icon-tile--soft">
                  <Icon name={s.icon} size={18} />
                </span>
                <span className="solution-row__texto">
                  <strong>{s.nombre}</strong>
                  <span>{s.resumen}</span>
                </span>
                <Icon name="arrow-right" size={16} className="solution-row__flecha" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
