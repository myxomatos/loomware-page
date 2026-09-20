/*
 * Giros a los que se dirige la página. Los prospectos del DENUE vienen
 * clasificados por actividad, y el que llega desde ahí busca su caso, no una
 * lista de tecnologías.
 *
 * dolor: lo que vemos en ese giro, en sus palabras. Sin cifras que no se
 * hayan medido. servicios: qué suele resolverlo, enlazando a la página de
 * cada servicio.
 */
export const INDUSTRIAS = [
  {
    id: 'distribuidoras',
    icon: 'package',
    nombre: 'Distribuidoras y mayoristas',
    dolor:
      'Pedidos que llegan por WhatsApp, inventario en una hoja que no coincide con el almacén y cobranza que se persigue de memoria.',
    servicios: ['erp', 'crm'],
  },
  {
    id: 'manufactura',
    icon: 'settings',
    nombre: 'Manufactura y talleres',
    dolor:
      'Órdenes de producción en papel, materia prima que se acaba sin aviso y costos reales que se conocen hasta el cierre de mes.',
    servicios: ['erp', 'automatizacion'],
  },
  {
    id: 'construccion',
    icon: 'map-pin',
    nombre: 'Constructoras y servicios en campo',
    dolor:
      'Cuadrillas sin forma de reportar avances, evidencias en el celular de cada quien y la oficina enterándose días después.',
    servicios: ['apps-moviles', 'automatizacion'],
  },
  {
    id: 'despachos',
    icon: 'users',
    nombre: 'Despachos y consultorías',
    dolor:
      'Los clientes viven en la agenda de cada socio; cuando alguien falta, el seguimiento se pierde y el cliente lo nota.',
    servicios: ['crm', 'automatizacion'],
  },
  {
    id: 'comercio',
    icon: 'shopping-cart',
    nombre: 'Comercio y retail',
    dolor:
      'Ventas en mostrador y en línea que no comparten inventario, y promociones que se venden aunque ya no haya existencia.',
    servicios: ['tienda-en-linea', 'erp'],
  },
  {
    id: 'servicios',
    icon: 'calendar',
    nombre: 'Clínicas y servicios profesionales',
    dolor:
      'Agenda en un sistema, expedientes en otro y cobros en un tercero; el personal captura lo mismo tres veces.',
    servicios: ['software-a-medida', 'nomina'],
  },
]
