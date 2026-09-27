import { useEffect, useState } from 'react'
import Icon from './Icon'
import { whatsappUrl } from '../data/contacto'
import { clicWhatsApp } from '../lib/analytics'
import './WhatsAppButton.css'

/*
 * Botón flotante, abajo a la derecha.
 * En B2B mexicano es el canal por el que más gente escribe; lleva a wa.me
 * con un mensaje prellenado que dice de dónde viene el contacto.
 *
 * Las páginas de servicio e industria le pasan su propio mensaje y origen,
 * para que el WhatsApp diga desde qué página escribieron.
 *
 * **Se retira mientras el formulario está a la vista.** Medido: con la sección
 * de contacto en pantalla había dos entradas a WhatsApp al mismo tiempo —este
 * botón y el renglón «¿Prefieres hablar directo?»—, en escritorio y en celular.
 * El renglón se queda, porque ahí es la ficha de contacto y además trae el
 * correo, que no está en ningún otro lado de esa pantalla. El que sobra es
 * éste: existe para cuando el formulario **no** se ve. Es la misma regla que
 * sigue el botón del navbar, que cede la primera pantalla al del hero.
 *
 * Se mide leyendo la posición en el propio scroll y no con IntersectionObserver:
 * el observador no se dispara en el entorno de medición, y un botón que quizá
 * no reaparece es peor falla que uno repetido.
 */
const FORMULARIO = '#contacto'

export default function WhatsAppButton({ mensaje, origen = 'flotante' }) {
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    const form = document.querySelector(FORMULARIO)
    if (!form) return undefined // una página sin formulario: el flotante es la única vía

    const mirar = () => {
      const c = form.getBoundingClientRect()
      setOculto(c.bottom > 0 && c.top < window.innerHeight)
    }
    mirar()
    window.addEventListener('scroll', mirar, { passive: true })
    window.addEventListener('resize', mirar, { passive: true })
    window.addEventListener('load', mirar)
    return () => {
      window.removeEventListener('scroll', mirar)
      window.removeEventListener('resize', mirar)
      window.removeEventListener('load', mirar)
    }
  }, [])

  return (
    <a
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-flotante${oculto ? ' wa-flotante--oculto' : ''}`}
      aria-label="Escríbenos por WhatsApp"
      aria-hidden={oculto}
      tabIndex={oculto ? -1 : undefined}
      onClick={() => clicWhatsApp(origen)}
    >
      <Icon name="whatsapp" size={28} strokeWidth={0} />
      <span className="wa-flotante__texto">¿Hablamos?</span>
    </a>
  )
}
