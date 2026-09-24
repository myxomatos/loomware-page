/*
 * Recorridos: páginas que explican una solución paso a paso, con un dibujo que
 * cambia mientras se baja. Se escriben a mano en `recorridos-fuente/<slug>.html`
 * —son HTML sueltos, sin dependencias— y `scripts/recorridos.js` los empaqueta
 * en `public/recorridos/` antes de cada build.
 *
 * Aquí sólo vive lo que el resto del sitio necesita saber de ellos: cómo se
 * llaman, a qué servicio pertenecen y qué dicen. De aquí salen el enlace de la
 * página de servicio y su entrada en el sitemap.
 *
 * Para agregar uno: escribe el HTML en recorridos-fuente/ y añade su renglón.
 */
export const RECORRIDOS = [
  {
    slug: 'erp',
    servicio: 'erp',
    titulo: 'Del trabajo hecho al dinero cobrado',
    resumen:
      'La libreta única del negocio: lo que haces, lo que cobras y lo que gastas se anota una sola vez, y todos lo ven al instante.',
    descripcion:
      'Qué es un ERP y para qué sirve, paso a paso: lo que haces, lo que cobras y lo que gastas anotado una sola vez, y el dinero cuadrando al día.',
  },
  {
    slug: 'crm',
    servicio: 'crm',
    titulo: 'De la llamada al cierre',
    resumen:
      'Seis tratos en veinticuatro días: tres se mueren de silencio y uno se cierra. Lo que cambia es el seguimiento.',
    descripcion:
      'Recorrido paso a paso de un CRM: de dónde entra el prospecto, la visita, la cotización, el seguimiento que nadie da y el cierre.',
  },
  {
    slug: 'nomina',
    servicio: 'nomina',
    titulo: 'De la checada al recibo',
    resumen:
      'Una quincena completa, día por día: cuándo llega cada incidencia, cuándo se calcula y cuándo cae el dinero.',
    descripcion:
      'Recorrido paso a paso de un sistema de nómina: incidencias, cierre, cálculo con ISR e IMSS, timbrado del CFDI, dispersión y el reclamo que ya no llega.',
  },
  {
    slug: 'automatizacion',
    servicio: 'automatizacion',
    titulo: 'Del WhatsApp al reporte del lunes',
    resumen:
      'Un solo pedido por cinco escritorios, dos veces: llevado a mano de uno a otro, o por un tubo neumático que lo lleva solo en segundos.',
    descripcion:
      'Recorrido paso a paso de la automatización de procesos: el pedido que llega por WhatsApp, la captura, el pago que libera, el aviso al cliente, la alerta de existencia y el reporte del lunes que se arma solo.',
  },
  {
    slug: 'software-a-medida',
    servicio: 'software-a-medida',
    titulo: 'De la talla única a tu medida',
    resumen:
      'Tu proceso de cotización en la sastrería: las medidas, el patrón, la primera prueba, los ajustes, las conexiones y el patrón a tu nombre.',
    descripcion:
      'Recorrido paso a paso del software a medida: por qué un sistema de catálogo es un traje de talla única, y cómo se construye uno sobre tu proceso, por etapas, integrado y con el código a tu nombre.',
  },
  {
    slug: 'infraestructura-cloud',
    servicio: 'infraestructura-cloud',
    titulo: 'Del cuarto del servidor a cualquier lugar',
    resumen:
      'Una semana de tu empresa dos veces: con el servidor en el cuartito de la oficina, y con la operación viviendo en otro lado, disponible desde donde estés.',
    descripcion:
      'Recorrido paso a paso de la infraestructura en la nube: el apagón, el respaldo probado, la temporada alta, la caída vigilada, los accesos por persona y la oficina sin cuartito del servidor.',
  },
  {
    slug: 'apps-moviles',
    servicio: 'apps-moviles',
    titulo: 'Del campo a la oficina, el mismo día',
    resumen:
      'La ruta de un técnico durante un día, con sus seis visitas en el mapa y lo que la oficina sabe de cada una a cada hora: con la libreta, y con la app que captura donde ocurre el trabajo.',
    descripcion:
      'Recorrido paso a paso de una app de campo: las visitas del día, la captura en el lugar con foto y firma, la zona sin señal que sincroniza sola, la evidencia con hora y GPS, el avance en tiempo real y el cierre el mismo día.',
  },
  {
    slug: 'tienda-en-linea',
    servicio: 'tienda-en-linea',
    titulo: 'Del carrito a la puerta',
    resumen:
      'Un solo producto durante dos semanas, en el mostrador y en la página al mismo tiempo: cuánto hay, cuánto publica la tienda y qué pasa cuando dejan de coincidir.',
    descripcion:
      'Recorrido paso a paso de una tienda en línea conectada a la operación: el pedido de la noche, una sola existencia, la promoción que se detiene en cero, cobro con CFDI, guía con rastreo y margen por canal.',
  },
]

export const recorridoDeServicio = (slug) => RECORRIDOS.find((r) => r.servicio === slug)
