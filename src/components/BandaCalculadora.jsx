import Icon from './Icon'
import './BandaCalculadora.css'

/*
 * Va justo antes del formulario: quien llegó hasta aquí y todavía no quiere
 * hablar con nadie tiene una forma de seguir. Saca su propio número y decide.
 */
export default function BandaCalculadora() {
  return (
    <section className="section banda-calc">
      <div className="container banda-calc__inner">
        <div className="banda-calc__texto">
          <span className="eyebrow">Antes de agendar nada</span>
          <h2 className="h3">¿Cuánto te cuesta tu Excel?</h2>
          <p>
            Seis preguntas y la cuenta completa a la vista: lo que se va cada mes en capturar
            el mismo dato más de una vez, con tus propios números. No pedimos nada para
            enseñarte el resultado.
          </p>
        </div>
        <a href="/calculadora" className="btn btn--outline">
          Sacar mi número
          <Icon name="arrow-right" size={18} />
        </a>
      </div>
    </section>
  )
}
