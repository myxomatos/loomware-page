/*
 * Eventos de conversión. Google Analytics se inyecta desde vite.config.js
 * sólo cuando existe VITE_GA_ID; aquí nada más se reportan los eventos si
 * gtag está presente. Sin ID, estas funciones no hacen nada.
 */
export const rastrear = (evento, datos = {}) => {
  if (typeof window.gtag === 'function') window.gtag('event', evento, datos)
}

// Formulario enviado con éxito: se dispara al cargar /gracias.
export const conversionFormulario = () => rastrear('generate_lead', { metodo: 'formulario' })

// Clic en cualquier enlace de WhatsApp; `origen` dice desde dónde.
export const clicWhatsApp = (origen) => rastrear('click_whatsapp', { origen })
