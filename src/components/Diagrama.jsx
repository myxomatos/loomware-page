import Icon from './Icon'
import './Diagrama.css'

/*
 * Dibuja el diagrama de un servicio a partir de sus datos. Tres formas:
 *   flujo → pasos en fila con flechas (el último puede ir destacado)
 *   hub   → un núcleo y los módulos alrededor
 *   capas → bloques apilados; el último va destacado
 * Todo es HTML y SVG: nítido en cualquier pantalla y con el estilo del sitio.
 */
function Nodo({ n }) {
  return (
    <div className={`dg-nodo ${n.destacado ? 'is-destacado' : ''}`}>
      <span className="dg-nodo__caja">
        <Icon name={n.icon} size={26} />
      </span>
      <span className="dg-nodo__texto">{n.texto}</span>
    </div>
  )
}

export default function Diagrama({ d }) {
  if (!d) return null
  return (
    <figure className={`dg dg--${d.tipo}`}>
      <figcaption className="dg__titulo">{d.titulo}</figcaption>

      {d.tipo === 'flujo' && (
        <div className="dg__flujo">
          {d.nodos.map((n, i) => (
            <div key={n.texto} className="dg__paso">
              <Nodo n={n} />
              {i < d.nodos.length - 1 && <span className="dg__flecha" aria-hidden="true" />}
            </div>
          ))}
        </div>
      )}

      {d.tipo === 'hub' && (
        <div className="dg__hub">
          <div className="dg__centro">
            <Icon name={d.centro.icon} size={24} />
            <span>{d.centro.texto}</span>
          </div>
          <div className="dg__modulos">
            {d.nodos.map((n) => (
              <Nodo key={n.texto} n={n} />
            ))}
          </div>
        </div>
      )}

      {d.tipo === 'capas' && (
        <div className="dg__capas">
          {d.nodos.map((n) => (
            <div key={n.texto} className="dg__capa">
              <Icon name={n.icon} size={22} />
              <span>{n.texto}</span>
            </div>
          ))}
        </div>
      )}
    </figure>
  )
}
