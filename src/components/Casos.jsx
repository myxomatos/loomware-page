import Icon from './Icon'
import { CASOS } from '../data/casos'
import './Casos.css'

/*
 * Prueba social. No renderiza nada hasta que src/data/casos.js tenga al menos
 * un caso real; el footer también oculta su enlace mientras tanto.
 */
export default function Casos() {
  if (CASOS.length === 0) return null

  return (
    <section id="casos" className="section section--soft casos">
      <div className="container">
        <header className="section__head">
          <h2>Resultados con clientes</h2>
          <p className="section__subtitle">
            Lo que cambió en empresas como la tuya después de trabajar con nosotros.
          </p>
        </header>

        <ul className="casos__grid">
          {CASOS.map((c) => (
            <li key={c.descripcion} className="card caso">
              <div className="caso__head">
                <span className="chip chip--soft">{c.servicio}</span>
                <p className="caso__quien">
                  {c.cliente ? <strong>{c.cliente}</strong> : null}
                  {c.cliente ? ' · ' : ''}
                  {c.descripcion}
                </p>
              </div>
              <dl className="caso__detalle">
                <div>
                  <dt>Reto</dt>
                  <dd>{c.reto}</dd>
                </div>
                <div>
                  <dt>Solución</dt>
                  <dd>{c.solucion}</dd>
                </div>
                <div className="caso__resultado">
                  <dt>
                    <Icon name="trending-up" size={16} /> Resultado
                  </dt>
                  <dd>{c.resultado}</dd>
                </div>
              </dl>
              {c.cita && (
                <blockquote className="caso__cita">
                  <p>“{c.cita}”</p>
                  {c.autor && <footer>— {c.autor}</footer>}
                </blockquote>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
