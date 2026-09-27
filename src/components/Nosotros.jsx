import Icon from './Icon'
import { equipoVisible } from '../data/equipo'
import { CIUDAD } from '../data/contacto'
import './Nosotros.css'

const PRINCIPIOS = [
  {
    icon: 'search',
    title: 'Primero entendemos, luego proponemos',
    text: 'Cada proyecto empieza con un diagnóstico. No vendemos un sistema antes de saber cómo opera tu empresa.',
  },
  {
    icon: 'users',
    title: 'Implementamos con tu equipo, no a sus espaldas',
    text: 'Quien va a usar el sistema participa desde el diseño. Un software que nadie adopta es dinero tirado.',
  },
  {
    icon: 'trending-up',
    title: 'Nos quedamos después de la entrega',
    text: 'Medimos, ajustamos y crecemos el sistema con la operación. La entrega es el inicio, no el final.',
  },
]

export default function Nosotros() {
  const equipo = equipoVisible()

  return (
    <section id="nosotros" className="section nosotros">
      <div className="container">
        <div className="nosotros__grid">
          <div className="nosotros__copy">
            <span className="eyebrow eyebrow--purple">Quiénes somos</span>
            <h2 className="nosotros__title">
              Ponemos orden en la operación y nos quedamos hasta que funcione
            </h2>
            <p>
              Loomware nace en {CIUDAD} para atender a empresas que hoy operan entre hojas de
              cálculo, WhatsApp y programas que no se hablan entre sí. Les ayudamos a elegir e
              implementar la herramienta correcta —un CRM, un ERP, una automatización o software a
              la medida— sin obligarlas a cambiar su forma de trabajar para caber en un sistema.
            </p>
            <p>
              Somos un equipo pequeño y eso es deliberado: la persona que hace el diagnóstico es
              la misma que diseña la solución y la que responde el WhatsApp cuando algo falla.
            </p>
          </div>

          <ul className="nosotros__principios">
            {PRINCIPIOS.map((p) => (
              <li key={p.title} className="principio">
                <span className="icon-tile icon-tile--soft">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <h3 className="h4">{p.title}</h3>
                  <p className="principio__text">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {equipo.length > 0 && (
          <ul className="nosotros__equipo">
            {equipo.map((p) => (
              <li key={p.nombre} className="card persona">
                <img
                  className="persona__foto"
                  src={p.foto}
                  alt={`${p.nombre}, ${p.cargo}`}
                  width="120"
                  height="120"
                  loading="lazy"
                />
                <div>
                  <h3 className="persona__nombre">{p.nombre}</h3>
                  <p className="persona__cargo">{p.cargo}</p>
                  {p.bio && <p className="persona__bio">{p.bio}</p>}
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow persona__linkedin"
                    >
                      LinkedIn
                      <Icon name="arrow-right" size={14} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
