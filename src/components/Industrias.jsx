import Icon from './Icon'
import { INDUSTRIAS } from '../data/industrias'
import { servicioPorSlug } from '../data/servicios'
import './Industrias.css'

export default function Industrias() {
  return (
    <section id="industrias" className="section industrias">
      <div className="container">
        <header className="section__head">
          <span className="eyebrow eyebrow--purple">Por giro</span>
          <h2>Cada giro tiene sus fugas. Estas son las que más vemos.</h2>
          <p className="section__subtitle">Encuentra tu operación y lo que suele resolverla.</p>
        </header>

        <ul className="industrias__grid">
          {INDUSTRIAS.map((g) => (
            <li key={g.id} className="card industria">
              <span className="icon-tile icon-tile--soft">
                <Icon name={g.icon} size={24} />
              </span>
              <h3 className="industria__nombre">{g.nombre}</h3>
              <p className="industria__dolor">{g.dolor}</p>
              <div className="industria__solucion">
                <span className="industria__etiqueta">Lo que suele resolverlo</span>
                <span className="industria__chips">
                {g.servicios.map((slug) => {
                  const s = servicioPorSlug(slug)
                  return s ? (
                    <a key={slug} href={`/servicios/${slug}`} className="chip chip--soft">
                      {s.nombre}
                    </a>
                  ) : null
                })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
