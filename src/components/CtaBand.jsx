import Icon from './Icon'
import './CtaBand.css'

export default function CtaBand() {
  return (
    <section className="cta-band-wrap" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <div className="cta-band__main">
            <span className="cta-band__icon">
              <Icon name="trending-up" size={30} strokeWidth={2.25} />
            </span>
            <div className="cta-band__copy">
              <h2 id="cta-title" className="cta-band__title">
                Hagamos crecer tu negocio juntos
              </h2>
              <p className="cta-band__text">
                La tecnología correcta hoy, un mejor negocio mañana.
              </p>
            </div>
          </div>

          <a href="#contacto" className="btn btn--primary cta-band__btn">
            Solicitar diagnóstico
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
