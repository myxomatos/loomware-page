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
          <span className="eyebrow">Con tus propios números</span>
          <h2 className="h3">¿Cuánto te cuesta tu Excel?</h2>
          <p>
            Seis preguntas de un toque y el resultado al instante, con la cuenta completa a la
            vista: lo que se va cada mes en capturar el mismo dato más de una vez.
          </p>
        </div>
        <a href="/calculadora" className="btn btn--outline">
          Calcular ahora
          <Icon name="arrow-right" size={18} />
        </a>
      </div>
    </section>
  )
}
