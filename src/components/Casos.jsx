import Icon from './Icon'
import { CASOS } from '../data/casos'
import './Casos.css'

/*
 * Casos de éxito. No renderiza nada hasta que src/data/casos.js tenga al menos
 * un caso real; el footer también oculta su enlace mientras tanto.
 *
 * La cita cierra la tarjeta y va firmada: la frase del dueño convence más que
 * cualquier párrafo nuestro, y firmada se puede comprobar.
 */
export default function Casos() {
  if (CASOS.length === 0) return null

  return (
    <section id="casos" className="section section--soft casos">
      <div className="container">
        <header className="section__head">
          <span className="eyebrow">Clientes</span>
          <h2>Casos de éxito</h2>
          <p className="section__subtitle">
            Qué se construyó, qué cambió y lo que dice quien lo opera todos los días.
          </p>
        </header>

        {/* Con un solo caso, la tarjeta angosta dejaba media pantalla en blanco y
            estiraba el texto a diez renglones. Con uno solo se abre a dos columnas:
            quién es y qué dijo a la izquierda, qué se hizo a la derecha. */}
        <ul className={`casos__grid${CASOS.length === 1 ? ' casos__grid--uno' : ''}`}>
          {CASOS.map((c) => (
            <li key={c.descripcion} className="card caso">
              <div className="caso__head">
                {/* El logotipo va en un solo tono, para que acompañe sin competir
                    con la marca de la casa. Sólo aparece si el cliente autorizó
                    el uso de su marca. */}
                {c.logo && (
                  <img
                    className="caso__logo"
                    src={c.logo}
                    alt={c.cliente ? `Logotipo de ${c.cliente}` : 'Logotipo del cliente'}
                    loading="lazy"
                    decoding="async"
                  />
                )}
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
