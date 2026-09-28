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
          {/* Un titular, una oración. Antes eran dos y caían en tres renglones;
              la segunda pertenece al subtítulo, que es donde se explica. */}
          <h2>Cada giro tiene sus propias fugas</h2>
          <p className="section__subtitle">
            Estas son las que más vemos. Encuentra tu operación y lo que suele resolverla.
          </p>
        </header>

        <ul className="industrias__grid">
          {INDUSTRIAS.map((g) => (
            <li key={g.id} className="card industria">
              <span className="icon-tile icon-tile--soft">
                <Icon name={g.icon} size={24} />
              </span>
              {/* Un solo enlace por tarjeta, y es el del nombre: su capa cubre la
                  tarjeta entera, así que se pica donde sea. En celular ya era así
                  —es como se toca un giro en el teléfono— y en escritorio faltaba. */}
              <h3 className="industria__nombre">
                <a href={`/industrias/${g.id}`}>{g.nombre}</a>
              </h3>
              <p className="industria__dolor">{g.dolor}</p>
              {/* La pista visual, no un segundo enlace al mismo destino. */}
              <span className="link-arrow industria__ver">
                Ver cómo lo resolvemos
                <Icon name="arrow-right" size={14} />
              </span>
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
