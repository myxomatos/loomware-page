import Logo from '../components/Logo'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Diagrama from '../components/Diagrama'
import ContactForm from '../components/ContactForm'
import { servicioPorSlug, SERVICIOS } from '../data/servicios'
import { recorridoDeServicio } from '../data/recorridos'
import { centrarActual } from '../lib/centrarActual'
import '../components/Faq.css'
import './servicio.css'

/*
 * Página de un servicio. El slug viene del atributo data-servicio que el
 * generador escribe en <html>, así que el mismo componente sirve para las
 * ocho páginas.
 */
export default function Servicio({ slug }) {
  const s = servicioPorSlug(slug)
  if (!s) {
    return (
      <main className="container servicio__404">
        <h1>Servicio no encontrado</h1>
        <a href="/" className="btn btn--outline">
          Volver al inicio
        </a>
      </main>
    )
  }

  const mensajeWa = `Hola, vi la página de ${s.nombre} en loomware.com.mx y me interesa un diagnóstico para mi empresa.`
  const relacionados = s.relacionados.map(servicioPorSlug).filter(Boolean)
  const recorrido = recorridoDeServicio(s.slug)

  return (
    <>
      <header className="servicio__nav">
        <div className="container servicio__nav-inner">
          <a href="/" aria-label="Loomware — inicio">
            <Logo />
          </a>
          <nav className="servicio__nav-links" aria-label="Servicios" ref={centrarActual}>
            {SERVICIOS.map((o) => (
              <a
                key={o.slug}
                href={`/servicios/${o.slug}`}
                className={o.slug === s.slug ? 'is-actual' : ''}
                aria-current={o.slug === s.slug ? 'page' : undefined}
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
                <Icon name={s.icon} size={16} /> {s.nombre}
              </span>
              <h1>{s.h1}</h1>
              {s.intro.map((p) => (
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

            <aside className="card servicio__para">
              <h2 className="h4">¿Es para tu empresa?</h2>
              <ul className="check-list">
                {s.paraQuien.map((p) => (
                  <li key={p.slice(0, 30)}>
                    <Icon name="check" size={16} strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {s.diagrama && (
          <section className="section servicio__diagrama">
            <div className="container servicio__diagrama-inner">
              <header className="section__head">
                <h2>Cómo funciona</h2>
              </header>
              <Diagrama d={s.diagrama} />
            </div>
          </section>
        )}

        {recorrido && (
          <section className="section section--soft servicio__recorrido">
            <div className="container servicio__recorrido-inner">
              <div className="servicio__recorrido-texto">
                <span className="eyebrow">Recorrido paso a paso</span>
                <h2 className="h3">{recorrido.titulo}</h2>
                <p>{recorrido.resumen}</p>
              </div>
              <a href={`/recorridos/${recorrido.slug}`} className="btn btn--primary">
                Ver el recorrido completo
                <Icon name="arrow-right" size={18} />
              </a>
            </div>
          </section>
        )}

        <section className="section section--soft servicio__incluye">
          <div className="container">
            <header className="section__head">
              <h2>Qué incluye</h2>
            </header>
            <ul className="servicio__grid">
              {s.incluye.map((i) => (
                <li key={i.titulo} className="card servicio__item">
                  <h3 className="h4">{i.titulo}</h3>
                  <p>{i.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section servicio__proceso">
          <div className="container">
            <header className="section__head">
              <h2>Cómo lo implementamos</h2>
              <p className="section__subtitle">
                Por etapas y con tu equipo. Ves avances desde las primeras semanas.
              </p>
            </header>
            <ol className="servicio__pasos">
              {s.proceso.map((p, i) => (
                <li key={p.titulo} className="servicio__paso">
                  <span className="servicio__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--soft servicio__faq">
          <div className="container servicio__faq-inner">
            <header className="section__head">
              <h2>Preguntas sobre {s.nombre}</h2>
            </header>
            <div className="faq__lista">
              {s.faq.map((f) => (
                <details key={f.p} className="faq__item">
                  <summary>
                    <span>{f.p}</span>
                    <Icon name="chevron-right" size={18} className="faq__flecha" />
                  </summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section servicio__cierre">
          <div className="container">
            <ContactForm
              interes={s.nombre}
              origen={s.nombre}
              titulo={`Empecemos por un diagnóstico de ${s.nombre}`}
              intro={`Revisamos tu operación y te decimos si ${s.nombre} es lo que conviene resolver primero. La primera llamada es sin costo y sin compromiso.`}
            />

            {relacionados.length > 0 && (
              <div className="servicio__relacionados">
                <p className="text-xs text-muted">Suele combinarse con</p>
                <ul>
                  {relacionados.map((r) => (
                    <li key={r.slug}>
                      <a href={`/servicios/${r.slug}`} className="chip">
                        <Icon name={r.icon} size={16} />
                        {r.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton mensaje={mensajeWa} origen={`flotante · ${s.nombre}`} />
    </>
  )
}
