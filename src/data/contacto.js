/*
 * Datos de contacto de Loomware. Único lugar donde se escriben: el footer,
 * el formulario, la página de gracias y el botón de WhatsApp los importan.
 */
export const EMPRESA = 'Loomware'
export const DOMINIO = 'https://loomware.com.mx'
export const EMAIL = 'aldo_sanchez@loomware.com.mx'
export const CIUDAD = 'Ciudad de México'

// display: como se lee. tel: lo que marca el teléfono. wa: para wa.me (sin + ni espacios).
export const TELEFONOS = [{ display: '+52 55 8096 8928', tel: '+525580968928', wa: '525580968928' }]

export const WHATSAPP = TELEFONOS[0]

// Mensaje con el que se abre la conversación. Sirve para saber de dónde llegó.
export const WHATSAPP_MENSAJE = 'Hola, vi loomware.com.mx y me interesa un diagnóstico para mi empresa.'

export const whatsappUrl = (mensaje = WHATSAPP_MENSAJE) =>
  `https://wa.me/${WHATSAPP.wa}?text=${encodeURIComponent(mensaje)}`
