/*
 * Giros a los que se dirige la página. Los prospectos del DENUE vienen
 * clasificados por actividad, y el que llega desde ahí busca su caso, no una
 * lista de tecnologías.
 *
 * Cada entrada genera además su propia página en /industrias/<id>, que es donde
 * se puede competir en Google: "erp para distribuidoras", "sistema para
 * constructoras" tienen mucha menos competencia que "crm méxico".
 *
 * dolor: lo que vemos en ese giro, en sus palabras. Sin cifras que no se hayan
 * medido. servicios: qué suele resolverlo, enlazando a cada servicio.
 */
export const INDUSTRIAS = [
  {
    id: 'distribuidoras',
    icon: 'package',
    nombre: 'Distribuidoras y mayoristas',
    dolor:
      'Pedidos que llegan por WhatsApp, inventario en una hoja que no coincide con el almacén y cobranza que se persigue de memoria.',
    servicios: ['erp', 'crm'],

    titulo: 'ERP y CRM para distribuidoras en México | Loomware',
    descripcion:
      'Sistemas para distribuidoras y mayoristas: inventario real, pedidos sin recaptura, cobranza con seguimiento y facturación CFDI. Llamada sin costo.',
    h1: 'Sistemas para distribuidoras: el inventario que dice el sistema es el que hay',
    intro: [
      'En una distribuidora todo pasa por el inventario, y cuando el inventario no es confiable, todo lo demás se contagia: se vende lo que no hay, se compra lo que sobra y el cliente se entera antes que tú.',
      'A eso se suman los pedidos que entran por WhatsApp y alguien tiene que capturar, la cobranza que vive en la cabeza del vendedor, y un cierre de mes que tarda más de lo que debería porque hay que conciliar tres archivos.',
    ],
    sintomas: [
      'El conteo físico nunca cuadra con el sistema y nadie sabe desde cuándo.',
      'Los pedidos llegan por WhatsApp, correo y teléfono, y alguien los recaptura uno por uno.',
      'No sabes el margen real por producto hasta que cierras el mes.',
      'La cobranza depende de que el vendedor se acuerde de llamar.',
      'Cada promoción es una hoja aparte que hay que conciliar después.',
    ],
    comoAyudamos: [
      {
        titulo: 'Inventario que sí refleja el almacén',
        texto: 'Existencias por almacén y ubicación, mínimos con alerta de reorden y un conteo de arranque para empezar con la verdad, no con el Excel viejo.',
      },
      {
        titulo: 'Pedidos sin recaptura',
        texto: 'El pedido entra una vez —desde el portal, el vendedor o WhatsApp— y de ahí sale la remisión, la factura y el descuento de inventario.',
      },
      {
        titulo: 'Cobranza con seguimiento',
        texto: 'Antigüedad de saldos, recordatorios automáticos y estado de cuenta que el cliente puede consultar sin llamarte.',
      },
      {
        titulo: 'Margen real por producto',
        texto: 'Costo con fletes y mermas incluidos, para saber qué producto y qué cliente dejan dinero y cuáles no.',
      },
    ],
  },

  {
    id: 'manufactura',
    icon: 'settings',
    nombre: 'Manufactura y talleres',
    dolor:
      'Órdenes de producción en papel, materia prima que se acaba sin aviso y costos reales que se conocen hasta el cierre de mes.',
    servicios: ['erp', 'automatizacion'],

    titulo: 'ERP para manufactura y talleres en México | Loomware',
    descripcion:
      'Órdenes de producción, materiales, costo real por lote y facturación en un solo sistema. Para talleres y manufactura en México. Llamada sin costo.',
    h1: 'Sistemas para manufactura: saber el costo real antes del cierre de mes',
    intro: [
      'En un taller la orden de producción suele vivir en papel o en un pizarrón. Funciona mientras son pocas órdenes; cuando crecen, nadie sabe con certeza qué se está produciendo, con qué material y a qué costo.',
      'El resultado típico: se cotiza con un costo estimado que nunca se compara con el real, la materia prima se acaba sin aviso y la utilidad del mes aparece semanas después, cuando ya no se puede corregir nada.',
    ],
    sintomas: [
      'Las órdenes de producción están en papel y su avance se pregunta de viva voz.',
      'La materia prima se acaba sin que nadie lo vea venir.',
      'Cotizas con un costo estimado y nunca lo comparas con el real.',
      'No sabes cuánto material se fue en merma ni en qué lote.',
      'La utilidad del mes se conoce cuando ya no se puede hacer nada.',
    ],
    comoAyudamos: [
      {
        titulo: 'Órdenes de producción con avance visible',
        texto: 'Cada orden con su estado, su responsable y su fecha. Desde la oficina se ve qué está en proceso sin bajar al piso.',
      },
      {
        titulo: 'Materiales y explosión de insumos',
        texto: 'El sistema calcula qué materia prima requiere cada orden y avisa antes de que falte.',
      },
      {
        titulo: 'Costo real por lote',
        texto: 'Materiales, mano de obra y mermas cargados a la orden. Comparas lo cotizado contra lo que realmente costó.',
      },
      {
        titulo: 'Trazabilidad',
        texto: 'De qué lote salió cada producto y con qué insumos, para responder a un cliente o a una auditoría.',
      },
    ],
  },

  {
    id: 'construccion',
    icon: 'map-pin',
    nombre: 'Constructoras y servicios en campo',
    dolor:
      'Cuadrillas sin forma de reportar avances, evidencias en el celular de cada quien y la oficina enterándose días después.',
    servicios: ['apps-moviles', 'automatizacion'],

    titulo: 'App y sistemas para constructoras y obra | Loomware',
    descripcion:
      'Reporte de avance en obra desde el celular, con fotos y firma, incluso sin señal. Para constructoras y empresas de servicio en campo en México.',
    h1: 'Sistemas para obra y campo: la oficina se entera el mismo día',
    intro: [
      'El trabajo ocurre en la obra, pero la información llega a la oficina cuando alguien regresa: fotos en el celular de cada quien, bitácoras en papel y un reporte que se arma de memoria el viernes.',
      'Mientras tanto, la oficina no puede saber si una cuadrilla va retrasada, si el material llegó o si el cliente firmó la entrega. Cuando se entera, ya pasó.',
    ],
    sintomas: [
      'Los avances se reportan por WhatsApp y se pierden en la conversación.',
      'Las fotos de evidencia están repartidas en varios celulares.',
      'No hay señal en la obra y por eso no se captura nada hasta volver.',
      'La firma de conformidad del cliente es papel que se traspapela.',
      'El reporte semanal se arma de memoria y con lo que cada quien recuerda.',
    ],
    comoAyudamos: [
      {
        titulo: 'Reporte de avance desde el celular',
        texto: 'La cuadrilla registra su avance donde está, con pocos toques y pantallas pensadas para usarse bajo el sol.',
      },
      {
        titulo: 'Funciona sin señal',
        texto: 'La app captura sin conexión y sincroniza sola al recuperarla. En obra eso no es opcional.',
      },
      {
        titulo: 'Evidencia y firma',
        texto: 'Fotos con fecha y ubicación, y firma del cliente en pantalla. Todo queda ligado a la orden de trabajo.',
      },
      {
        titulo: 'Tablero de obra',
        texto: 'La oficina ve el avance por obra y por cuadrilla el mismo día, no el lunes siguiente.',
      },
    ],
  },

  {
    id: 'despachos',
    icon: 'users',
    nombre: 'Despachos y consultorías',
    dolor:
      'Los clientes viven en la agenda de cada socio; cuando alguien falta, el seguimiento se pierde y el cliente lo nota.',
    servicios: ['crm', 'automatizacion'],

    titulo: 'CRM para despachos y consultorías | Loomware',
    descripcion:
      'Cartera de clientes que no depende de la agenda de cada socio: historial, seguimientos y renovaciones con responsable y fecha. Llamada sin costo.',
    h1: 'Sistemas para despachos: que la cartera no viva en la cabeza de cada socio',
    intro: [
      'En un despacho el activo son las relaciones, y las relaciones suelen vivir en la agenda personal de cada socio: su celular, su correo, su memoria. Funciona hasta que alguien se va de vacaciones, se enferma o deja la firma.',
      'Entonces aparece el costo real: nadie sabe qué se le prometió al cliente, cuándo vence su contrato ni quién lo atendió la última vez.',
    ],
    sintomas: [
      'Cada socio tiene sus clientes y nadie más conoce el detalle.',
      'Las renovaciones se recuerdan cuando el cliente pregunta.',
      'El histórico de un cliente está repartido entre correos y notas.',
      'No sabes cuántas propuestas están abiertas ni por cuánto.',
      'Cuando alguien falta, su cartera queda sin atender.',
    ],
    comoAyudamos: [
      {
        titulo: 'Cartera compartida',
        texto: 'Cada cliente con su historial completo, accesible para quien lo tenga que atender. Sin depender de una sola persona.',
      },
      {
        titulo: 'Renovaciones y vencimientos con alerta',
        texto: 'El sistema avisa antes de que venza un contrato o una iguala, con tiempo para conversarlo.',
      },
      {
        titulo: 'Propuestas con seguimiento',
        texto: 'Qué propuestas están abiertas, por cuánto y en qué etapa. El pronóstico deja de ser una corazonada.',
      },
      {
        titulo: 'Seguimiento que no se olvida',
        texto: 'Cada compromiso con responsable y fecha; lo que no se movió se destaca solo.',
      },
    ],
  },

  {
    id: 'comercio',
    icon: 'shopping-cart',
    nombre: 'Comercio y retail',
    dolor:
      'Ventas en mostrador y en línea que no comparten inventario, y promociones que se venden aunque ya no haya existencia.',
    servicios: ['tienda-en-linea', 'erp'],

    titulo: 'Sistemas para comercio: tienda y mostrador | Loomware',
    descripcion:
      'Un solo inventario para mostrador y tienda en línea, con pagos, envíos y facturación conectados. Para comercios en México. Llamada sin costo.',
    h1: 'Sistemas para comercio: un solo inventario para el mostrador y la tienda en línea',
    intro: [
      'Vender en línea y en piso con dos inventarios distintos crea un problema que el cliente descubre antes que tú: compra algo que ya no hay, o deja de comprar algo que sí tenías.',
      'A eso se suma la doble captura —cada pedido de internet se teclea otra vez en el sistema de la tienda— y una contabilidad que nunca termina de cuadrar entre canales.',
    ],
    sintomas: [
      'Vendes en línea algo que ya se acabó en el mostrador.',
      'Cada pedido de internet se captura a mano en el sistema de la tienda.',
      'Las promociones se aplican distinto en cada canal.',
      'No sabes qué canal deja más margen.',
      'La facturación de las ventas en línea la hace alguien manualmente.',
    ],
    comoAyudamos: [
      {
        titulo: 'Inventario único',
        texto: 'Mostrador y tienda en línea descuentan del mismo inventario, al momento de la venta.',
      },
      {
        titulo: 'Pedidos que entran solos',
        texto: 'La venta en línea genera su pedido, su factura y su movimiento de inventario sin recaptura.',
      },
      {
        titulo: 'Pagos y envíos',
        texto: 'Tarjeta, transferencia y meses sin intereses; cotización de envío, guía y rastreo para el cliente.',
      },
      {
        titulo: 'Margen por canal',
        texto: 'Cuánto deja el mostrador, cuánto la tienda y cuánto cada producto en cada uno.',
      },
    ],
  },

  {
    id: 'servicios',
    icon: 'calendar',
    nombre: 'Clínicas y servicios profesionales',
    dolor:
      'Agenda en un sistema, expedientes en otro y cobros en un tercero; el personal captura lo mismo tres veces.',
    servicios: ['software-a-medida', 'nomina'],

    titulo: 'Sistemas para clínicas y servicios | Loomware',
    descripcion:
      'Agenda, expediente y cobro en un solo sistema, sin capturar lo mismo tres veces. Para clínicas y servicios profesionales en México.',
    h1: 'Sistemas para clínicas y servicios: capturar una vez, no tres',
    intro: [
      'La agenda está en un lado, el expediente en otro y el cobro en un tercero. Cada paciente o cliente obliga a capturar los mismos datos varias veces, y ninguna de las tres versiones está completa.',
      'El costo no es sólo el tiempo del personal: es que nadie puede responder rápido cuántas citas se cumplieron, cuánto se cobró y qué quedó pendiente.',
    ],
    sintomas: [
      'Los mismos datos se capturan en la agenda, en el expediente y en el cobro.',
      'Las confirmaciones de cita se mandan a mano, una por una.',
      'No sabes tu tasa de asistencia ni cuántas citas se perdieron.',
      'El expediente está en papel o en un archivo que sólo abre una persona.',
      'La nómina del personal se calcula aparte, en Excel.',
    ],
    comoAyudamos: [
      {
        titulo: 'Agenda con confirmación automática',
        texto: 'Recordatorios por WhatsApp o correo antes de la cita, sin que nadie los mande.',
      },
      {
        titulo: 'Expediente y cobro en el mismo lugar',
        texto: 'El historial, lo realizado y lo cobrado viven juntos. Se captura una vez.',
      },
      {
        titulo: 'Control de la operación',
        texto: 'Citas cumplidas, canceladas y su motivo; ingresos por servicio y por profesional.',
      },
      {
        titulo: 'Nómina del personal',
        texto: 'Cálculo, timbrado y dispersión con las particularidades de tu esquema: turnos, guardias o comisiones.',
      },
    ],
  },
]

export const industriaPorId = (id) => INDUSTRIAS.find((i) => i.id === id)
