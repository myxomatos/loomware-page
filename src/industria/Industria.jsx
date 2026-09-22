import Logo from '../components/Logo'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ContactForm from '../components/ContactForm'
import { industriaPorId, INDUSTRIAS } from '../data/industrias'
import { servicioPorSlug } from '../data/servicios'
import '../servicio/servicio.css'
import './industria.css'

/*
 * Página de una industria. El id viene del atributo data-industria que el
 * generador escribe en <html>, así que el mismo componente sirve para las seis.
 */
export default function Industria({ id }) {
  const g = industriaPorId(id)
  if (!g) {
    return (
      <main className="container servicio__404">
        <h1>Industria no encontrada</h1>
        <a href="/" className="btn btn--outline">
          Volver al inicio
        </a>
      </main>
    )
  }

  const mensajeWa = `Hola, vi la página de ${g.nombre} en loomware.com.mx y me interesa un diagnóstico para mi empresa.`
  const servicios = g.servicios.map(servicioPorSlug).filter(Boolean)

  return (
    <>
      <header className="servicio__nav">
        <div className="container servicio__nav-inner">
          <a href="/" aria-label="Loomware — inicio">
            <Logo />
          </a>
          <nav className="servicio__nav-links" aria-label="Industrias">
            {INDUSTRIAS.map((o) => (
              <a
                key={o.id}
                href={`/industrias/${o.id}`}
                className={o.id === g.id ? 'is-actual' : ''}
                aria-current={o.id === g.id ? 'page' : undefined}
              >
                {o.nombre}
              </a>
            ))}
          </nav>
          <a href="#contacto" className="btn btn--outline btn--pill btn--sm">
            Diagnóstico
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </header>

      <main id="contenido">
        <section className="servicio__hero">
          <div className="container servicio__hero-inner">
            <div className="servicio__copy">
              <span className="eyebrow">
                <Icon name={g.icon} size={16} /> {g.nombre}
              </span>
              <h1>{g.h1}</h1>
              {g.intro.map((p) => (
                <p key={p.slice(0, 30)} className="lead">
                  {p}
                </p>
              ))}
              <div className="servicio__acciones">
                <a href="#contacto" className="btn btn--primary">
                  Solicitar diagnóstico
                  <Icon name="arrow-right" size={18} />
                </a>
              </div>
            </div>

            <aside className="card servicio__para ind__sintomas">
              <h2 className="h4">¿Te suena alguno de estos?</h2>
              <ul>
                {g.sintomas.map((s) => (
                  <li key={s.slice(0, 30)}>
                    <span className="icon-tile icon-tile--sm icon-tile--danger">
                      <Icon name="x" size={13} strokeWidth={2.5} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <header className="section__head">
              <h2>Cómo lo resolvemos</h2>
              <p className="section__subtitle">
                Lo que implementamos en empresas de este giro, según lo que encontremos en el
                diagnóstico.
              </p>
            </header>
            <ul className="servicio__grid">
              {g.comoAyudamos.map((c) => (
                <li key={c.titulo} className="card servicio__item">
                  <h3 className="h4">{c.titulo}</h3>
                  <p>{c.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container ind__servicios">
            <header className="section__head">
              <h2>Las soluciones que suelen aplicar</h2>
            </header>
            <ul className="ind__servicios-lista">
              {servicios.map((s) => (
                <li key={s.slug} className="card ind__servicio">
                  <a href={`/servicios/${s.slug}`}>
                    <span className="icon-tile">
                      <Icon name={s.icon} size={24} />
                    </span>
                    <h3 className="h4">{s.nombre}</h3>
                    <p>{s.resumen}</p>
                    <span className="link-arrow">
                      Ver la solución
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <ContactForm
              interes={g.nombre}
              origen={g.nombre}
              titulo={`Diagnóstico para ${g.nombre.toLowerCase()}`}
              intro={`Revisamos tu operación, te decimos dónde se está yendo el tiempo y qué conviene resolver primero. Sin costo y sin compromiso.`}
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton mensaje={mensajeWa} origen={`flotante · ${g.nombre}`} />
    </>
  )
}
