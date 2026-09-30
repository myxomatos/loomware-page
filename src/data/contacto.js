/*
 * Datos de contacto de Loomware. Único lugar donde se escriben: el footer,
 * el formulario, la página de gracias y el botón de WhatsApp los importan.
 */
export const EMPRESA = 'Loomware'
export const DOMINIO = 'https://loomware.com.mx'
export const EMAIL = 'aldo_sanchez@loomware.com.mx'
// Donde está la empresa. Tiene que decir lo mismo que el domicilio de abajo y
// que los datos estructurados del HTML: el alta en Google Business se cae si
// el nombre, la dirección y el teléfono no coinciden en los tres lugares.
export const CIUDAD = 'Estado de México'

// Datos legales del responsable. Hoy Loomware opera como persona física con
// actividad empresarial; si más adelante se constituye una sociedad, se cambia
// aquí y se actualiza en todo el sitio.
//
// **DOMICILIO sale en un solo lugar del sitio: /aviso-de-privacidad.** La ley lo
// exige ahí —el aviso tiene que decir identidad y domicilio del responsable, y
// sin eso es defectuoso ante la LFPDPPP— y en ningún otro lado hace falta. El
// 2026-09-28 salió de los datos estructurados de la portada, que publicaban la
// calle y el código postal a la vista de cualquiera: ahí ahora dice sólo Estado
// de México, que es lo mismo que va a decir el perfil de Google Business dado de
// alta como negocio con área de servicio. El pie no lo trae desde el 2026-09-21.
export const RAZON_SOCIAL = 'Aldo Leonel Sánchez López'
export const DOMICILIO = 'Laureles #17, Jardines de Atizapán, Estado de México, C.P. 52978'
export const AVISO_ACTUALIZADO = '21 de septiembre de 2026'

// display: como se lee. tel: lo que marca el teléfono. wa: para wa.me (sin + ni espacios).
export const TELEFONOS = [{ display: '+52 55 8096 8928', tel: '+525580968928', wa: '525580968928' }]

export const WHATSAPP = TELEFONOS[0]

// Mensaje con el que se abre la conversación. Sirve para saber de dónde llegó.
export const WHATSAPP_MENSAJE = 'Hola, vi loomware.com.mx y me interesa un diagnóstico para mi empresa.'

export const whatsappUrl = (mensaje = WHATSAPP_MENSAJE) =>
  `https://wa.me/${WHATSAPP.wa}?text=${encodeURIComponent(mensaje)}`
