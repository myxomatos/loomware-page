import Icon from './Icon'
import { FAQ } from '../data/faq'
import './Faq.css'

/*
 * Acordeón con <details>: accesible y funciona sin JavaScript. Además publica
 * las preguntas como FAQPage para que Google pueda mostrarlas en resultados.
 */
const ldJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.p,
    acceptedAnswer: { '@type': 'Answer', text: f.r },
  })),
})

export default function Faq() {
  return (
    <section id="faq" className="section section--soft faq">
      <div className="container faq__inner">
        <header className="faq__head">
          <span className="eyebrow eyebrow--purple">Preguntas frecuentes</span>
          <h2>Lo que nos preguntan antes de escribir</h2>
          <p className="section__subtitle">
            Si tu duda no está aquí, escríbenos por WhatsApp y te contestamos directo.
          </p>
        </header>

        <div className="faq__lista">
          {FAQ.map((f) => (
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />
    </section>
  )
}
