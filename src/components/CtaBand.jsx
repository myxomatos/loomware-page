import Icon from './Icon'
import './CtaBand.css'

const PROMISES = ['Diagnóstico sin costo', 'Propuesta personalizada', 'Acompañamiento real']

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

          <span className="cta-band__divider" aria-hidden="true" />

          <ul className="cta-band__promises">
            {PROMISES.map((p) => (
              <li key={p}>
                <Icon name="check" size={16} strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
