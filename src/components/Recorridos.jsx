import Icon from './Icon'
import { RECORRIDOS } from '../data/recorridos'
import { servicioPorSlug } from '../data/servicios'
import { rastrear } from '../lib/analytics'
import './Recorridos.css'

/*
 * Los recorridos, como sección propia justo debajo del hero.
 *
 * Antes eran ocho palabras subrayadas al pie del hero —«ERP · CRM · Nómina…»—
 * y ahí se perdían dos cosas: no se entendía qué era un recorrido, y se tiraba
 * lo mejor que tienen, que son sus títulos. «Del andén al cobro» dice más que
 * «ERP», porque «ERP» ya está en toda la página.
 *
 * La lista sale de src/data/recorridos.js: cuando se escriba uno nuevo,
 * aparece aquí solo.
 */
export default function Recorridos() {
  if (!RECORRIDOS.length) return null

  return (
    <section id="recorridos" className="section section--soft recorridos">
      <div className="container">
        <header className="section__head">
          <span className="eyebrow">Recorridos · uno por solución</span>
          <h2>Míralo funcionar antes de hablar con nosotros</h2>
          <p className="section__subtitle">
            Cada solución explicada paso a paso, con un dibujo que cambia mientras bajas. Se
            abren desde cualquier celular, sin cuenta y sin registro.
          </p>
        </header>

        <ul className="recorridos__grid">
          {RECORRIDOS.map((r) => {
            const s = servicioPorSlug(r.servicio)
            return (
              <li key={r.slug}>
                <a
                  href={`/recorridos/${r.slug}`}
                  className="recorrido"
                  onClick={() => rastrear('recorrido_desde_inicio', { recorrido: r.slug })}
                >
                  <span className="recorrido__sol">{s ? s.nombre : r.servicio}</span>
                  <span className="recorrido__titulo">{r.titulo}</span>
                  <span className="recorrido__pie">
                    <span className="recorrido__pasos">6 pasos</span>
                    <Icon name="arrow-right" size={14} />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
