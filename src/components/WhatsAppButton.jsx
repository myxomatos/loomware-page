import Icon from './Icon'
import { whatsappUrl } from '../data/contacto'
import { clicWhatsApp } from '../lib/analytics'
import './WhatsAppButton.css'

/*
 * Botón flotante, abajo a la derecha, visible en toda la página.
 * En B2B mexicano es el canal por el que más gente escribe; lleva a wa.me
 * con un mensaje prellenado que dice de dónde viene el contacto.
 *
 * Las páginas de servicio e industria le pasan su propio mensaje y origen,
 * para que el WhatsApp diga desde qué página escribieron.
 */
export default function WhatsAppButton({ mensaje, origen = 'flotante' }) {
  return (
    <a
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-flotante"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => clicWhatsApp(origen)}
    >
      <Icon name="whatsapp" size={28} strokeWidth={0} />
      <span className="wa-flotante__texto">¿Hablamos?</span>
    </a>
  )
}
