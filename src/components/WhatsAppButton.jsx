import Icon from './Icon'
import { whatsappUrl } from '../data/contacto'
import { clicWhatsApp } from '../lib/analytics'
import './WhatsAppButton.css'

/*
 * Botón flotante, abajo a la derecha, visible en toda la página.
 * En B2B mexicano es el canal por el que más gente escribe; lleva a wa.me
 * con un mensaje prellenado que dice de dónde viene el contacto.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-flotante"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => clicWhatsApp('flotante')}
    >
      <Icon name="whatsapp" size={28} strokeWidth={0} />
      <span className="wa-flotante__texto">¿Hablamos?</span>
    </a>
  )
}
