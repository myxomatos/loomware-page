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
    titulo: 'Del andén al cobro',
    resumen:
      'Una tarima entra por el andén de recepción y sale convertida en dinero cobrado. Seis paradas y una sola captura.',
    descripcion:
      'Recorrido paso a paso de un ERP en una distribuidora: recepción contra la orden, ubicación, surtido, CFDI, cobro y margen real.',
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
]

export const recorridoDeServicio = (slug) => RECORRIDOS.find((r) => r.servicio === slug)
