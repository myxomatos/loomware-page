import { CASOS } from '../data/casos'
import './Casos.css'

/*
 * Casos de éxito. **Viven aquí y sólo aquí**: es la sección de la portada donde
 * el sitio enseña clientes reales. Ningún caso se cita, se resume ni se enseña
 * en otra página —ni en los recorridos, ni en las de servicio—, porque un
 * cliente autoriza su nombre para lo que contrató, no para ilustrar otra cosa.
 * Cuando entren más casos, entran aquí.
 *
 * No renderiza nada hasta que src/data/casos.js tenga al menos un caso real; el
 * footer también oculta su enlace mientras tanto.
 *
 * La tarjeta se lee de arriba abajo y en un solo orden, que es lo que antes no
 * pasaba: la reja ponía la cita abajo a la izquierda y el resultado abajo a la
 * derecha, así que dos cosas sin relación quedaban lado a lado y se leían como
 * pareja. Ahora son tres bandas: quién es, qué pasó —numerado 01·02·03— y lo
 * que dice el dueño.
 *
 * Los tres pasos llevan los nombres que el subtítulo de la sección promete. Se
 * llamaban «Reto · Solución · Resultado» y el subtítulo anunciaba otras tres
 * cosas: quien leía tenía que adivinar cuál era cuál.
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
            Qué necesitaba, qué se construyó, qué cambió — y lo que dice quien lo opera todos
            los días.
          </p>
        </header>

        <ul className={`casos__grid${CASOS.length === 1 ? ' casos__grid--uno' : ''}`}>
          {CASOS.map((c) => (
            <li key={c.descripcion} className="card caso">
              <header className="caso__quien">
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
                {/* El nombre sólo se escribe si el logotipo no lo trae ya: con los
                    dos, la tarjeta decía «GT-SHOP» tres veces contando la firma. */}
                <p className="caso__giro">
                  {c.cliente && !c.logo ? <strong>{c.cliente}</strong> : null}
                  {c.cliente && !c.logo ? ' · ' : ''}
                  {c.descripcion}
                </p>
              </header>

              <dl className="caso__pasos">
                <div className="caso__paso">
                  <dt>
                    <span className="caso__n">01</span> Qué necesitaba
                  </dt>
                  <dd>{c.reto}</dd>
                </div>
                <div className="caso__paso">
                  <dt>
                    <span className="caso__n">02</span> Qué se construyó
                  </dt>
                  {/* El distintivo del servicio va al principio de lo que se
                      construyó, no suelto arriba de la tarjeta: ahí flotaba sin
                      decir si era el giro del cliente, una categoría o lo que le
                      vendimos. Y adentro del renglón, no en el título, para que
                      las tres columnas empiecen a la misma altura. */}
                  <dd>
                    {c.servicio && <span className="caso__servicio">{c.servicio}</span>}
                    {c.solucion}
                  </dd>
                </div>
                <div className="caso__paso caso__paso--cambio">
                  <dt>
                    <span className="caso__n">03</span> Qué cambió
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
