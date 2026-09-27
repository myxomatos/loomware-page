/*
 * Eventos de conversión. Google Analytics se inyecta desde vite.config.js
 * sólo cuando existe VITE_GA_ID; aquí nada más se reportan los eventos si
 * gtag está presente. Sin ID, estas funciones no hacen nada.
 */
export const rastrear = (evento, datos = {}) => {
  if (typeof window.gtag === 'function') window.gtag('event', evento, datos)
}

const LEAD = 'loomware:lead'

/* La marca vive en sessionStorage, que algunos navegadores bloquean (modo
   privado estricto). Si no se puede leer o escribir, la conversión no se
   cuenta: vale más perder una que contar una falsa. */

// Justo antes de mandar a /gracias, quien envió deja dicho por dónde llegó.
export const marcarLead = (metodo) => {
  try {
    sessionStorage.setItem(LEAD, metodo)
  } catch {}
}

// Al cargar /gracias: la conversión se cuenta una vez y sólo si hubo envío,
// así que ni una recarga ni una visita directa la inflan.
export const reportarLead = () => {
  let metodo
  try {
    metodo = sessionStorage.getItem(LEAD)
    sessionStorage.removeItem(LEAD)
  } catch {
    return
  }
  if (metodo) rastrear('generate_lead', { metodo })
}

// Clic en cualquier enlace de WhatsApp; `origen` dice desde dónde.
export const clicWhatsApp = (origen) => rastrear('click_whatsapp', { origen })
