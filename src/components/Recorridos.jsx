import { useEffect, useState } from 'react'
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
/*
 * En celular no se dibujan las escenas, y no basta con esconderlas: una imagen
 * con `display:none` se descarga igual, así que serían diecisiete kilobytes
 * tirados en el aparato donde más pesan. Aquí no se pintan siquiera.
 */
function useEscritorio() {
  const [ancho, setAncho] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 600px)')
    const ver = () => setAncho(mq.matches)
    ver()
    mq.addEventListener('change', ver)
    return () => mq.removeEventListener('change', ver)
  }, [])
  return ancho
}

export default function Recorridos() {
  const escritorio = useEscritorio()
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
                  {/* El primer paso del recorrido, como dibujo. Sale de la escena real
                      con `npm run recorridos:escenas`; no es una ilustración aparte. */}
                  {escritorio && (
                  <img
                    className="recorrido__escena"
                    src={`/recorridos/escena-${r.slug}.svg`}
                    alt={`Primer paso del recorrido: ${r.titulo}`}
                    loading="lazy"
                    decoding="async"
                  />
                  )}
                  <span className="recorrido__sol">{s ? s.nombre : r.servicio}</span>
                  <span className="recorrido__titulo">{r.titulo}</span>
                  {/* El resumen ya estaba escrito en src/data/recorridos.js y el inicio no lo
                      usaba. Se esconde en celular —ocho resúmenes eran media pantalla más— pero
                      sigue en el documento, que es lo que lee un buscador. */}
                  <span className="recorrido__resumen">{r.resumen}</span>
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
