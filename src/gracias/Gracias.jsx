import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { EMAIL, WHATSAPP, whatsappUrl } from '../data/contacto'
import './gracias.css'

/* Los tres pasos dicen **una sola vez** cuándo contestamos, y sin número.
   Antes la entrada decía «en un momento», el paso 2 decía «el siguiente día
   hábil» y la meta description «en breve»: tres velocidades distintas en la
   misma pantalla. Quien deja un WhatsApp espera pronto, y una cifra que no se
   cumple es peor que no darla. */
const PASOS = [
  {
    icon: 'search',
    title: 'Leemos lo que nos contaste',
    text: 'Así llegamos a la llamada sabiendo de qué se trata, sin preguntarte lo mismo otra vez.',
  },
  {
    icon: 'message-circle',
    title: 'Te contestamos',
    // Sin enumerar medios: el formulario acepta WhatsApp o correo —el servidor
    // los distingue por la arroba— y la calculadora pide sólo correo, así que
    // cualquier lista sería falsa en alguno de los dos caminos.
    text: 'Lo antes posible, por el medio que nos dejaste.',
  },
  {
    icon: 'calendar',
    title: 'Hablamos 30 minutos',
    text: 'Sin costo y sin compromiso, el día que a ti te acomode.',
  },
]

export default function Gracias() {
  return (
    <main className="gracias">
      <div className="gracias__card">
        <a href="/" aria-label="Loomware — inicio">
          <Logo size={36} />
        </a>

        <span className="gracias__check">
          <Icon name="check" size={34} strokeWidth={2.75} />
        </span>

        <h1 className="gracias__title text-gradient">¡Gracias!</h1>
        <p className="gracias__lead">Recibimos tu solicitud. Esto es lo que sigue.</p>

        <ol className="gracias__pasos">
          {PASOS.map((p, i) => (
            <li key={p.title} className="paso">
              <span className="paso__icon">
                <Icon name={p.icon} size={18} />
              </span>
              <div>
                <h2 className="paso__title">
                  <span className="paso__num">{i + 1}.</span> {p.title}
                </h2>
                <p className="paso__text">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="gracias__contacto">
          <p className="text-xs">¿Quieres adelantarnos algo? Escríbenos por aquí.</p>
          <div className="gracias__medios">
            <a className="chip" href={`mailto:${EMAIL}`}>
              <Icon name="mail" size={15} />
              {EMAIL}
            </a>
            <a className="chip" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="message-circle" size={15} />
              WhatsApp {WHATSAPP.display}
            </a>
          </div>
        </div>

        {/* Antes decía «Volver al inicio», que es lo que ya hace el logotipo de
            arriba: a quien acaba de dejar sus datos —la persona más interesada
            que va a pisar el sitio ese día— no se le ofrecía nada. */}
        <div className="gracias__sigue">
          <p className="text-xs">
            Mientras tanto, cada solución tiene su recorrido: seis pasos con un dibujo que
            cambia mientras bajas.
          </p>
          <a href="/#recorridos" className="btn btn--outline">
            Ver los recorridos
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>

      <p className="gracias__pie">Ideas de hoy. Negocios más grandes mañana.</p>
    </main>
  )
}
