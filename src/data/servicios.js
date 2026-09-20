/*
 * Contenido de las páginas de servicio (/servicios/<slug>).
 *
 * Cada entrada genera una página propia con su título, descripción, canonical y
 * datos estructurados, para que Google pueda encontrar cada servicio por lo que
 * la gente busca ("crm para pymes", "sistema de nómina", "erp para manufactura").
 *
 * Reglas del texto: hablar del problema del cliente antes que de la tecnología;
 * sin cifras que no se hayan medido; español de México.
 *
 * diagrama.tipo: 'flujo' (pasos con flechas), 'hub' (núcleo y módulos) o
 * 'capas' (bloques apilados). Lo dibuja src/components/Diagrama.jsx.
 */
export const SERVICIOS = [
  {
    slug: 'crm',
    diagrama: {
      tipo: 'flujo',
      titulo: 'El camino de cada oportunidad',
      nodos: [
        { icon: 'target', texto: 'Prospecto' },
        { icon: 'message-circle', texto: 'Contacto' },
        { icon: 'file-text', texto: 'Propuesta' },
        { icon: 'balanza', texto: 'Negociación' },
        { icon: 'check-circle', texto: 'Cierre', destacado: true },
      ],
    },
    resumen: 'Gestiona clientes, ventas y oportunidades en una sola plataforma.',
    beneficio: { icon: 'bar-chart', label: 'Cierra más ventas' },
    nombre: 'CRM',
    icon: 'users',
    titulo: 'CRM para pymes en México | Loomware',
    descripcion:
      'Un CRM que tu equipo de ventas sí usa: cada oportunidad con responsable, siguiente paso y fecha. Implementación con tu equipo, en México.',
    h1: 'CRM: todas tus oportunidades en un solo lugar, con dueño y fecha',
    intro: [
      'Si hoy tus ventas viven en la libreta de cada vendedor, en un Excel compartido o en el historial de WhatsApp, sabes lo que pasa: se pierden seguimientos, dos personas le llaman al mismo cliente y nadie puede decirte cuánto vas a cerrar este mes.',
      'Un CRM resuelve eso poniendo cada prospecto en un embudo visible, con un responsable, un siguiente paso y una fecha. No es un sistema para vigilar vendedores: es para que ninguna oportunidad se quede sin atender.',
    ],
    paraQuien: [
      'Equipos comerciales de 2 a 30 personas que ya no caben en una hoja de cálculo.',
      'Empresas que reciben prospectos por varios canales —WhatsApp, web, redes, llamadas— y los pierden entre uno y otro.',
      'Directores que quieren saber cuánto hay en el embudo sin preguntarle a cada vendedor.',
      'Negocios con ciclos de venta largos, donde el seguimiento de semanas o meses decide el cierre.',
    ],
    incluye: [
      { titulo: 'Embudo de ventas', texto: 'Etapas definidas con tu proceso real: prospecto, contacto, propuesta, negociación, cierre. Se ve de un vistazo dónde está cada trato.' },
      { titulo: 'Captura desde todos los canales', texto: 'Los prospectos del formulario web, WhatsApp y correo entran solos al CRM con su origen registrado.' },
      { titulo: 'Historial por cliente', texto: 'Cada llamada, correo, cotización y nota queda en la ficha del cliente. Quien tome el trato tiene todo el contexto.' },
      { titulo: 'Recordatorios y tareas', texto: 'El sistema avisa a quien le toca dar seguimiento y cuándo. Los tratos sin actividad se destacan solos.' },
      { titulo: 'Cotizaciones', texto: 'Cotiza desde el CRM con tu catálogo y tus precios; la cotización queda ligada al trato.' },
      { titulo: 'Reportes', texto: 'Avance por vendedor, por periodo y por origen del prospecto. Pronóstico de cierre basado en el embudo, no en corazonadas.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Mapeamos tu proceso de venta actual: canales, etapas, quién hace qué.' },
      { titulo: 'Diseño del embudo', texto: 'Definimos etapas, campos y reglas con tu equipo comercial, no por catálogo.' },
      { titulo: 'Migración y arranque', texto: 'Cargamos tus clientes y oportunidades actuales; capacitamos a quien lo va a usar.' },
      { titulo: 'Acompañamiento', texto: 'Las primeras semanas revisamos juntos que el equipo lo use y ajustamos lo que estorbe.' },
    ],
    faq: [
      { p: '¿Se integra con WhatsApp?', r: 'Sí. Los mensajes de WhatsApp Business pueden registrarse en la ficha del cliente y generar prospectos nuevos automáticamente, según el alcance que definamos.' },
      { p: '¿Mis vendedores lo van a usar?', r: 'Ese es el criterio de éxito del proyecto. Por eso el embudo se diseña con ellos, se captura lo mínimo necesario y se mide la adopción las primeras semanas.' },
      { p: '¿Puedo migrar mis clientes actuales desde Excel?', r: 'Sí. La carga inicial de clientes, contactos y oportunidades abiertas es parte del proyecto.' },
      { p: '¿Funciona en el celular?', r: 'Sí. El CRM se usa desde el teléfono para consultar, registrar visitas y recibir recordatorios.' },
    ],
    relacionados: ['erp', 'automatizacion'],
  },

  {
    slug: 'erp',
    diagrama: {
      tipo: 'hub',
      titulo: 'Un núcleo, todas las áreas',
      centro: { icon: 'database', texto: 'Datos de la empresa' },
      nodos: [
        { icon: 'dollar', texto: 'Finanzas' },
        { icon: 'package', texto: 'Inventario' },
        { icon: 'truck', texto: 'Compras' },
        { icon: 'bar-chart', texto: 'Ventas' },
        { icon: 'settings', texto: 'Producción' },
        { icon: 'file-text', texto: 'Facturación' },
      ],
    },
    resumen: 'Conecta finanzas, inventario y operación en un sistema preparado para crecer.',
    beneficio: { icon: 'clock', label: 'Control total de tu negocio' },
    nombre: 'ERP',
    icon: 'pie-chart',
    titulo: 'ERP para pymes y manufactura en México | Loomware',
    descripcion:
      'Finanzas, inventario, compras, ventas y facturación en un solo sistema. ERP implementado con tu equipo, con migración de datos y CFDI.',
    h1: 'ERP: finanzas, inventario y operación en un mismo sistema',
    intro: [
      'Cuando cada área tiene su propio archivo —compras en uno, almacén en otro, contabilidad en un tercero— la empresa vive conciliando. El inventario del sistema no es el del almacén, el costo real se conoce hasta el cierre y las decisiones se toman con datos de hace semanas.',
      'Un ERP captura cada dato una sola vez y lo deja disponible para todas las áreas. Una venta descuenta inventario, genera la factura y aparece en finanzas sin que nadie la vuelva a teclear.',
    ],
    paraQuien: [
      'Empresas que compran, almacenan y venden producto: distribuidoras, comercializadoras, manufactura.',
      'Operaciones donde el inventario "del sistema" y el físico no coinciden.',
      'Negocios que facturan volumen y hoy lo hacen a mano o en un sistema desconectado de la operación.',
      'Direcciones que necesitan márgenes reales por producto y por cliente, no promedios.',
    ],
    incluye: [
      { titulo: 'Inventario en tiempo real', texto: 'Existencias por almacén y ubicación, mínimos y máximos, alertas de reorden. Lo que dice el sistema es lo que hay.' },
      { titulo: 'Compras y proveedores', texto: 'Órdenes de compra, recepción contra orden y cuentas por pagar ligadas a cada proveedor.' },
      { titulo: 'Ventas y facturación', texto: 'Pedidos, remisiones y facturación CFDI 4.0 con timbrado; cuentas por cobrar y antigüedad de saldos.' },
      { titulo: 'Costos y márgenes', texto: 'Costo real por producto con compras, fletes y mermas; margen por venta, cliente y vendedor.' },
      { titulo: 'Producción', texto: 'Para manufactura: órdenes de producción, explosión de materiales y consumo de insumos por lote.' },
      { titulo: 'Reportes de dirección', texto: 'Ventas, inventario valuado, flujo y utilidad, al momento y sin pedirle un reporte a nadie.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Recorremos tu operación completa: qué se compra, cómo se almacena, cómo se vende y cómo se cobra.' },
      { titulo: 'Diseño por módulos', texto: 'Definimos catálogos, almacenes, flujos y reportes. Priorizamos lo que más duele para arrancar por ahí.' },
      { titulo: 'Migración y arranque por etapas', texto: 'Cargamos productos, clientes, proveedores y saldos. Arrancamos módulo por módulo, sin detener la operación.' },
      { titulo: 'Estabilización', texto: 'Las primeras semanas conciliamos contra la realidad y ajustamos hasta que el sistema sea la única fuente.' },
    ],
    faq: [
      { p: '¿Cuánto tarda implementar un ERP?', r: 'Depende de cuántos módulos y de qué tan limpios estén tus datos. Por eso arrancamos por etapas: el primer módulo en operación en semanas, no en meses, y el resto va entrando sobre esa base.' },
      { p: '¿Factura al SAT?', r: 'Sí. La facturación emite CFDI 4.0 a través de un PAC autorizado, con complementos de pago y notas de crédito.' },
      { p: '¿Tengo que dejar de operar durante el cambio?', r: 'No. El arranque es por módulos y en paralelo con tu operación actual hasta que el nuevo sistema quede validado.' },
      { p: '¿Y si mi inventario actual está mal?', r: 'Es lo más común. La migración incluye un conteo físico de arranque para que el sistema empiece con la verdad, no con el Excel.' },
    ],
    relacionados: ['nomina', 'automatizacion'],
  },

  {
    slug: 'nomina',
    diagrama: {
      tipo: 'flujo',
      titulo: 'De la asistencia al recibo',
      nodos: [
        { icon: 'clock', texto: 'Asistencia' },
        { icon: 'calculator', texto: 'Cálculo' },
        { icon: 'shield-check', texto: 'Timbrado CFDI' },
        { icon: 'dollar', texto: 'Dispersión' },
        { icon: 'mail', texto: 'Recibos', destacado: true },
      ],
    },
    resumen: 'Cálculo, timbrado de CFDI y dispersión en un proceso que corre solo.',
    beneficio: { icon: 'shield-check', label: 'Cada quincena sin sorpresas' },
    nombre: 'Nómina',
    icon: 'user-check',
    titulo: 'Sistema de nómina con timbrado CFDI | Loomware',
    descripcion:
      'Cálculo de nómina, timbrado de CFDI 4.0 y dispersión bancaria en un proceso que corre solo y deja rastro. Para empresas mexicanas de 10 a 300 colaboradores.',
    h1: 'Nómina: cálculo, timbrado y dispersión sin hojas de cálculo',
    intro: [
      'La nómina en Excel funciona hasta que deja de funcionar: una fórmula que alguien movió, un cálculo de ISR que no cuadra con el timbrado, una incidencia que se capturó dos veces. Y cada quincena, la misma persona dedicando días a lo mismo.',
      'Un sistema de nómina toma la asistencia, calcula percepciones y deducciones, timbra el CFDI, genera el archivo de dispersión y le manda su recibo a cada colaborador. Todo desde el mismo cálculo, con historial de quién cambió qué.',
    ],
    paraQuien: [
      'Empresas de 10 a 300 colaboradores que hoy calculan en Excel o dependen de un despacho para cada quincena.',
      'Operaciones con turnos, horas extra, comisiones o destajo, donde el cálculo manual se equivoca.',
      'Recursos humanos que reciben incidencias por WhatsApp y las recapturan.',
      'Direcciones que quieren saber el costo real de nómina por área antes de la dispersión, no después.',
    ],
    incluye: [
      { titulo: 'Cálculo completo', texto: 'ISR, IMSS, INFONAVIT, prestaciones, horas extra, comisiones, préstamos y descuentos, conforme a las tablas vigentes.' },
      { titulo: 'Asistencia e incidencias', texto: 'Registro de asistencia (checador, app o captura) y flujo de incidencias con autorización, sin recapturar.' },
      { titulo: 'Timbrado CFDI de nómina', texto: 'Emisión del CFDI 4.0 de nómina por colaborador a través de PAC autorizado, con cancelaciones y sustituciones.' },
      { titulo: 'Dispersión bancaria', texto: 'Archivo de dispersión en el formato de tu banco, generado del mismo cálculo que se timbró.' },
      { titulo: 'Recibos y portal del colaborador', texto: 'Cada persona recibe su recibo timbrado y puede consultar sus históricos sin pedirlos a RH.' },
      { titulo: 'Reportes y provisiones', texto: 'Costo por área, provisiones de aguinaldo y vacaciones, acumulados anuales para la declaración.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Revisamos tu esquema: tipos de contrato, prestaciones, periodicidad, incidencias y cómo dispersas hoy.' },
      { titulo: 'Configuración', texto: 'Cargamos colaboradores, salarios, prestaciones y conceptos; configuramos el timbrado con tu PAC.' },
      { titulo: 'Nómina en paralelo', texto: 'Corremos una o dos quincenas en paralelo con tu método actual hasta que los resultados coincidan.' },
      { titulo: 'Arranque', texto: 'Primera nómina real con acompañamiento. Después, soporte cada quincena que lo necesites.' },
    ],
    faq: [
      { p: '¿Cumple con las obligaciones del SAT y el IMSS?', r: 'Sí. Calcula conforme a las tablas vigentes, timbra CFDI 4.0 de nómina y genera los reportes para el SUA y la declaración anual.' },
      { p: '¿Puedo seguir con mi despacho contable?', r: 'Sí. El sistema entrega al despacho los acumulados y pólizas que necesita; muchos clientes lo usan para dejar de pagar el cálculo y conservar la asesoría.' },
      { p: '¿Qué pasa con las quincenas anteriores?', r: 'Cargamos los acumulados del año en curso para que ISR y prestaciones se calculen correctamente desde la primera nómina.' },
      { p: '¿Cómo reciben su recibo los colaboradores?', r: 'Por correo o desde un portal donde cada persona consulta sus recibos y acumulados. RH deja de enviarlos uno por uno.' },
    ],
    relacionados: ['erp', 'automatizacion'],
  },

  {
    slug: 'tienda-en-linea',
    diagrama: {
      tipo: 'flujo',
      titulo: 'Del catálogo a la entrega',
      nodos: [
        { icon: 'package', texto: 'Catálogo' },
        { icon: 'shopping-cart', texto: 'Carrito' },
        { icon: 'credit-card', texto: 'Pago' },
        { icon: 'truck', texto: 'Envío' },
        { icon: 'check-circle', texto: 'Entrega', destacado: true },
      ],
    },
    resumen: 'Vende las 24 horas con inventario, pagos y envíos conectados a tu operación.',
    beneficio: { icon: 'shopping-cart', label: 'Ventas sin recaptura' },
    nombre: 'Comercio en línea',
    icon: 'shopping-cart',
    titulo: 'Tienda en línea conectada a tu inventario | Loomware',
    descripcion:
      'Tienda en línea que vende las 24 horas con inventario, pagos y envíos conectados a tu operación. Para comercios y distribuidoras en México.',
    h1: 'Tienda en línea: vende las 24 horas con tu inventario conectado',
    intro: [
      'Una tienda en línea desconectada de la operación crea más problemas de los que resuelve: vende lo que ya no hay, alguien tiene que capturar cada pedido en el sistema y el inventario se vuelve a desfasar.',
      'Construimos tiendas que son parte de tu operación: el catálogo sale de tu sistema, cada venta descuenta inventario en el momento, el pago entra a tu contabilidad y la guía de envío se genera sola.',
    ],
    paraQuien: [
      'Comercios y distribuidoras que quieren vender en línea sin duplicar su operación.',
      'Negocios que ya venden en línea pero capturan cada pedido a mano en su sistema.',
      'Mayoristas que quieren un portal donde sus clientes pidan con sus precios y condiciones.',
      'Marcas que venden en mostrador y en línea y necesitan un solo inventario.',
    ],
    incluye: [
      { titulo: 'Catálogo sincronizado', texto: 'Productos, precios y existencias salen de tu sistema. Lo que no hay, no se vende.' },
      { titulo: 'Pagos', texto: 'Tarjeta, transferencia SPEI, meses sin intereses y pago en tiendas de conveniencia, con los procesadores que operan en México.' },
      { titulo: 'Envíos', texto: 'Cotización de envío en el carrito, generación de guías y rastreo para el cliente.' },
      { titulo: 'Portal mayorista', texto: 'Para clientes de mayoreo: precios por cliente, pedidos recurrentes y estado de cuenta.' },
      { titulo: 'Conexión con tu operación', texto: 'Cada venta entra al ERP o al sistema que uses: inventario, facturación y contabilidad sin captura.' },
      { titulo: 'Facturación al cliente', texto: 'El cliente captura sus datos fiscales y recibe su CFDI sin escribirte.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Revisamos tu catálogo, tus canales de venta actuales y cómo operas envíos y cobranza.' },
      { titulo: 'Diseño de la tienda', texto: 'Estructura del catálogo, flujo de compra, métodos de pago y reglas de envío.' },
      { titulo: 'Integración', texto: 'Conectamos la tienda con inventario, facturación y paquetería.' },
      { titulo: 'Lanzamiento', texto: 'Pruebas de compra reales, arranque y seguimiento de los primeros pedidos.' },
    ],
    faq: [
      { p: '¿Es mejor que Mercado Libre o Shopify?', r: 'Son complementos, no rivales. Muchos clientes venden en marketplaces y además tienen su tienda propia, conectada a su inventario, sin comisiones por venta y con sus clientes como suyos.' },
      { p: '¿Qué pasa con mi inventario de mostrador?', r: 'Es el mismo. La tienda vende del inventario real y lo descuenta al momento, igual que una venta en piso.' },
      { p: '¿Puedo vender a crédito a mis clientes de mayoreo?', r: 'Sí. El portal mayorista aplica los precios y condiciones de cada cliente y registra el pedido a su cuenta.' },
      { p: '¿Quién administra la tienda después?', r: 'Tu equipo, desde el mismo sistema con el que ya opera. No hay un catálogo aparte que mantener.' },
    ],
    relacionados: ['erp', 'crm'],
  },

  {
    slug: 'automatizacion',
    diagrama: {
      tipo: 'flujo',
      titulo: 'Así corre un flujo',
      nodos: [
        { icon: 'zap', texto: 'Algo ocurre' },
        { icon: 'sliders', texto: 'Se evalúa la regla' },
        { icon: 'settings', texto: 'Se ejecuta la acción' },
        { icon: 'mail', texto: 'Se avisa al responsable', destacado: true },
      ],
    },
    resumen: 'Reduce tareas manuales y acelera procesos con flujos inteligentes.',
    beneficio: { icon: 'zap', label: 'Ahorra tiempo y costos' },
    nombre: 'Automatización',
    icon: 'bot',
    titulo: 'Automatización de procesos para empresas | Loomware',
    descripcion:
      'Que el sistema haga lo repetitivo: capturas, avisos, seguimientos y reportes corren solos con tus reglas. Automatización de procesos para pymes en México.',
    h1: 'Automatización: que el sistema haga lo repetitivo',
    intro: [
      'En toda empresa hay tareas que consumen horas y no requieren criterio: pasar un pedido de un sistema a otro, avisarle a alguien que llegó un pago, armar el reporte del lunes, recordarle a un cliente que su factura vence.',
      'Automatizar es definir la regla una vez —"cuando pase esto, haz aquello"— y dejar que corra. La gente deja de ser el pegamento entre sistemas y se dedica a lo que sí necesita a una persona.',
    ],
    paraQuien: [
      'Equipos que capturan el mismo dato en dos o más sistemas.',
      'Operaciones donde el seguimiento depende de que alguien se acuerde.',
      'Empresas con reportes que se arman a mano cada semana con la misma información.',
      'Negocios que reciben pedidos, solicitudes o incidencias por WhatsApp y correo y los procesan a mano.',
    ],
    incluye: [
      { titulo: 'Integración entre sistemas', texto: 'Tu CRM, ERP, tienda, banco y herramientas se hablan entre sí. Un dato capturado una vez llega a donde tiene que llegar.' },
      { titulo: 'Flujos con reglas', texto: 'Disparador, condición, acción: cuando llega un pago mayor a X, avisa a finanzas y libera el pedido.' },
      { titulo: 'Avisos y recordatorios', texto: 'Por WhatsApp, correo o en el sistema, a la persona correcta y en el momento correcto.' },
      { titulo: 'Reportes automáticos', texto: 'El reporte del lunes se arma solo y llega a quien lo lee, con los datos del cierre del viernes.' },
      { titulo: 'Captura desde canales', texto: 'Pedidos o solicitudes que llegan por WhatsApp, correo o formularios entran al sistema sin recaptura.' },
      { titulo: 'Alertas de excepción', texto: 'Cuando algo se sale del rango normal —inventario bajo, cobro vencido, pedido detenido— alguien se entera antes de que sea problema.' },
    ],
    proceso: [
      { titulo: 'Mapeo', texto: 'Listamos las tareas repetitivas de cada área y cuánto tiempo consumen. Priorizamos por impacto.' },
      { titulo: 'Diseño de flujos', texto: 'Definimos reglas y excepciones con quien hoy hace la tarea; esa persona sabe dónde se rompe.' },
      { titulo: 'Implementación', texto: 'Construimos los flujos, los probamos con datos reales y los ponemos a correr en paralelo.' },
      { titulo: 'Ajuste', texto: 'Las primeras semanas revisamos qué se automatizó bien y qué regla necesita afinarse.' },
    ],
    faq: [
      { p: '¿Necesito cambiar mis sistemas para automatizar?', r: 'No. La automatización conecta lo que ya usas. Cambiar de sistema es otra decisión, que a veces conviene y a veces no.' },
      { p: '¿Qué pasa si una automatización falla?', r: 'Cada flujo registra lo que hizo y avisa cuando algo no pudo completarse. Nada se pierde en silencio.' },
      { p: '¿Se puede automatizar WhatsApp?', r: 'Sí, con WhatsApp Business: respuestas automáticas, registro de conversaciones en el CRM y avisos salientes con plantillas aprobadas.' },
      { p: '¿Por dónde empiezo?', r: 'Por la tarea que más horas consume y menos criterio requiere. Suele ser la recaptura entre dos sistemas o el reporte semanal.' },
    ],
    relacionados: ['crm', 'erp'],
  },

  {
    slug: 'software-a-medida',
    diagrama: {
      tipo: 'flujo',
      titulo: 'Cómo lo construimos',
      nodos: [
        { icon: 'search', texto: 'Diagnóstico' },
        { icon: 'pencil', texto: 'Diseño' },
        { icon: 'code', texto: 'Desarrollo' },
        { icon: 'check-circle', texto: 'Pruebas' },
        { icon: 'rocket', texto: 'Operación', destacado: true },
      ],
    },
    resumen: 'Soluciones a medida que se adaptan a tus procesos y objetivos.',
    beneficio: { icon: 'sliders', label: 'Hecho para tu operación' },
    nombre: 'Software a medida',
    icon: 'code',
    titulo: 'Desarrollo de software a medida en México | Loomware',
    descripcion:
      'Software construido sobre cómo trabaja tu empresa, integrado con lo que ya usas, entregado por etapas. Desarrollo a medida para pymes en México.',
    h1: 'Software a medida: cuando ningún sistema de catálogo te queda',
    intro: [
      'Hay procesos que ningún software comercial resuelve bien, porque son la forma en que tu empresa compite: cómo cotizas, cómo produces, cómo atiendes. Forzarlos a caber en un sistema genérico significa perder justo lo que te hace distinto.',
      'Construimos software sobre tu proceso real. Se integra con lo que ya usas, lo entregamos por etapas para que veas avances desde las primeras semanas, y el código y los datos son tuyos.',
    ],
    paraQuien: [
      'Empresas con un proceso central que los sistemas comerciales no cubren o cubren mal.',
      'Negocios que ya probaron dos o tres sistemas de catálogo y siguen operando en Excel.',
      'Operaciones que necesitan que varios sistemas trabajen como uno solo.',
      'Empresas que quieren ser dueñas de su herramienta y no depender de licencias por usuario.',
    ],
    incluye: [
      { titulo: 'Análisis del proceso', texto: 'Documentamos cómo trabaja tu equipo hoy —lo que funciona y lo que estorba— antes de diseñar nada.' },
      { titulo: 'Diseño con el usuario', texto: 'Prototipos que revisa la gente que lo va a usar, antes de escribir código.' },
      { titulo: 'Desarrollo por etapas', texto: 'Entregas cada pocas semanas con funcionalidad que ya se puede usar. Nada de esperar meses para ver algo.' },
      { titulo: 'Integraciones', texto: 'Conexión con tu ERP, CRM, banco, facturación, WhatsApp o lo que tu operación necesite.' },
      { titulo: 'Web y móvil', texto: 'Aplicaciones que se usan desde el navegador, el celular o ambos, según dónde ocurre el trabajo.' },
      { titulo: 'Propiedad y documentación', texto: 'El código fuente, la base de datos y la documentación son tuyos desde el primer día.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Entendemos el proceso, sus excepciones y qué resultado esperas del sistema.' },
      { titulo: 'Diseño', texto: 'Alcance por etapas, prototipos y arquitectura. Sabes qué vas a recibir y cuándo.' },
      { titulo: 'Desarrollo', texto: 'Entregas periódicas y revisables. Cada etapa se prueba con tu equipo antes de seguir.' },
      { titulo: 'Operación', texto: 'Arranque, capacitación y soporte. El sistema evoluciona con tu negocio.' },
    ],
    faq: [
      { p: '¿No es más caro que un sistema comercial?', r: 'A veces sí, a veces no. Un sistema comercial cobra por usuario cada mes, para siempre, y aun así puede no cubrir tu proceso. En el diagnóstico te decimos con franqueza cuál conviene en tu caso.' },
      { p: '¿Cuánto tarda?', r: 'Depende del alcance, y por eso trabajamos por etapas: la primera funcionalidad útil en semanas, y el resto sobre esa base. Nunca meses sin ver nada.' },
      { p: '¿Qué pasa si después quiero cambiar de proveedor?', r: 'El código, la base de datos y la documentación son tuyos. Cualquier equipo competente puede continuarlo.' },
      { p: '¿Lo pueden mantener después?', r: 'Sí. Ofrecemos soporte y evolución continua, sin obligación de contratarlo.' },
    ],
    relacionados: ['apps-moviles', 'automatizacion'],
  },

  {
    slug: 'infraestructura-cloud',
    diagrama: {
      tipo: 'capas',
      titulo: 'Cuatro capas, una sola responsabilidad',
      nodos: [
        { icon: 'globe', texto: 'Red y entrega de contenido' },
        { icon: 'server', texto: 'Cómputo que escala solo' },
        { icon: 'database', texto: 'Datos cifrados' },
        { icon: 'shield-check', texto: 'Respaldo y recuperación' },
      ],
    },
    resumen: 'Seguridad, rendimiento y disponibilidad para una operación sin fricciones.',
    beneficio: { icon: 'cloud', label: 'Disponible y segura' },
    nombre: 'Infraestructura cloud',
    icon: 'cloud',
    titulo: 'Infraestructura en la nube para empresas | Loomware',
    descripcion:
      'Tus sistemas disponibles, respaldados y seguros, sin comprar servidores. Infraestructura cloud administrada para empresas en México.',
    h1: 'Infraestructura cloud: tu operación disponible, respaldada y segura',
    intro: [
      'El servidor en la oficina se apaga cuando se va la luz, se respalda cuando alguien se acuerda y se queda chico justo en temporada alta. Y cuando falla, la operación se detiene mientras alguien encuentra quién lo arregle.',
      'Administramos tu infraestructura en la nube para que deje de ser un tema tuyo: capacidad que crece cuando la necesitas, respaldos automáticos con recuperación probada, monitoreo permanente y accesos controlados por persona.',
    ],
    paraQuien: [
      'Empresas con sistemas críticos en un servidor local o en la computadora de alguien.',
      'Operaciones con picos de demanda —temporadas, campañas, cierres— donde el sistema se vuelve lento.',
      'Negocios que han perdido información por falta de respaldo o no saben si su respaldo funciona.',
      'Empresas que necesitan que su equipo acceda a los sistemas desde cualquier lugar, con seguridad.',
    ],
    incluye: [
      { titulo: 'Migración a la nube', texto: 'Movemos tus sistemas y datos sin detener la operación, con plan de reversa por si algo no sale.' },
      { titulo: 'Capacidad elástica', texto: 'Los recursos crecen en temporada alta y bajan después. Pagas por lo que usas.' },
      { titulo: 'Respaldos y recuperación', texto: 'Respaldo automático diario, retención definida y pruebas periódicas de restauración. Un respaldo que no se ha probado no existe.' },
      { titulo: 'Monitoreo y alertas', texto: 'Vigilancia permanente de disponibilidad y rendimiento. Nos enteramos antes que tus usuarios.' },
      { titulo: 'Seguridad y accesos', texto: 'Cifrado, accesos por rol y persona, autenticación de dos factores y registro de quién entró a qué.' },
      { titulo: 'Administración continua', texto: 'Actualizaciones, parches y ajustes de capacidad. Tú no compras ni mantienes equipo.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Inventario de sistemas, datos, dependencias y riesgos actuales.' },
      { titulo: 'Diseño', texto: 'Arquitectura, plan de migración, política de respaldos y esquema de accesos.' },
      { titulo: 'Migración', texto: 'Por etapas, con pruebas y ventana de reversa, sin detener la operación.' },
      { titulo: 'Operación', texto: 'Monitoreo, respaldos, actualizaciones y soporte continuos.' },
    ],
    faq: [
      { p: '¿Dónde quedan mis datos?', r: 'En centros de datos de proveedores de nube reconocidos, cifrados, con acceso controlado. Tú conservas la propiedad y puedes exportarlos cuando quieras.' },
      { p: '¿Es más caro que mi servidor?', r: 'Depende de cuánto te cuesta hoy el servidor cuando falla. En el diagnóstico comparamos el costo real actual —equipo, energía, soporte, tiempo perdido— contra la nube.' },
      { p: '¿Qué pasa si se cae internet en mi oficina?', r: 'Tus sistemas siguen funcionando para quien tenga conexión —celular, otra sede, casa—. Para operación crítica sin conexión lo consideramos en el diseño.' },
      { p: '¿Ustedes tienen acceso a mi información?', r: 'Sólo el necesario para administrar la infraestructura, con registro de cada acceso y bajo el aviso de privacidad y contrato de confidencialidad.' },
    ],
    relacionados: ['erp', 'software-a-medida'],
  },

  {
    slug: 'apps-moviles',
    diagrama: {
      tipo: 'hub',
      titulo: 'Lo que resuelve en campo',
      centro: { icon: 'smartphone', texto: 'App del equipo' },
      nodos: [
        { icon: 'map-pin', texto: 'Visitas y rutas' },
        { icon: 'camera', texto: 'Evidencia' },
        { icon: 'pencil', texto: 'Firmas' },
        { icon: 'wifi-off', texto: 'Sin conexión' },
        { icon: 'refresh-cw', texto: 'Sincroniza' },
        { icon: 'bar-chart', texto: 'Reportes' },
      ],
    },
    resumen: 'Experiencias móviles para equipos, clientes y operaciones en campo.',
    beneficio: { icon: 'smartphone', label: 'Tu operación en campo' },
    nombre: 'Apps móviles',
    icon: 'smartphone',
    titulo: 'Apps móviles para operación en campo | Loomware',
    descripcion:
      'Apps para que tu equipo capture en campo —visitas, evidencias, firmas— aunque no haya señal, y la oficina lo vea el mismo día. Desarrollo móvil en México.',
    h1: 'Apps móviles: tu operación en el bolsillo del equipo',
    intro: [
      'Quien está en campo —vendedor, técnico, supervisor, chofer— hace el trabajo lejos de la oficina y lo reporta después: fotos en su celular, notas en papel, un WhatsApp al llegar. La oficina se entera tarde y con lo que cada quien recordó.',
      'Una app móvil captura donde ocurre el trabajo: la visita, la evidencia fotográfica, la firma del cliente, el formulario. Funciona sin señal y sincroniza al reconectar. La oficina lo ve el mismo día, sin recaptura.',
    ],
    paraQuien: [
      'Empresas con personal en campo: ventas de ruta, servicio técnico, supervisión de obra, reparto.',
      'Operaciones que necesitan evidencia —fotos, firmas, ubicación— de cada visita o entrega.',
      'Negocios donde la información de campo llega tarde o incompleta a la oficina.',
      'Equipos que trabajan en zonas sin cobertura y hoy no pueden capturar hasta regresar.',
    ],
    incluye: [
      { titulo: 'Captura en campo', texto: 'Formularios diseñados para el celular: pocos toques, listas en vez de texto, cámara integrada.' },
      { titulo: 'Sin conexión', texto: 'La app funciona sin señal y sincroniza sola cuando la recupera. Nada se pierde.' },
      { titulo: 'Evidencia', texto: 'Fotos con fecha y ubicación, firma del cliente en pantalla, lectura de códigos.' },
      { titulo: 'Rutas y visitas', texto: 'Cada persona ve sus visitas del día; la oficina ve el avance en tiempo real.' },
      { titulo: 'Conexión con la oficina', texto: 'Lo capturado entra al CRM, ERP o al sistema que uses, sin que nadie lo vuelva a teclear.' },
      { titulo: 'Android e iOS', texto: 'Una sola app para los dos, con actualizaciones que llegan solas.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico en campo', texto: 'Acompañamos una jornada real para ver qué se captura, dónde y con qué señal.' },
      { titulo: 'Diseño', texto: 'Pantallas para usar con una mano, bajo el sol y con prisa. Se prueban con la gente de campo.' },
      { titulo: 'Desarrollo e integración', texto: 'Construimos la app y la conectamos con tus sistemas de oficina.' },
      { titulo: 'Piloto y despliegue', texto: 'Arrancamos con un grupo pequeño, ajustamos, y después con todo el equipo.' },
    ],
    faq: [
      { p: '¿Funciona en los celulares que ya tiene mi equipo?', r: 'Sí. Se diseña para Android e iOS y para equipos de gama media, que es lo común en campo.' },
      { p: '¿Qué pasa si no hay señal?', r: 'La app captura todo sin conexión y sincroniza cuando la recupera. Es requisito, no opción.' },
      { p: '¿La oficina ve la información al momento?', r: 'En cuanto el celular sincroniza. Con señal, es inmediato; sin señal, al reconectar.' },
      { p: '¿Cómo se instala en los equipos?', r: 'Desde las tiendas de aplicaciones o por distribución interna, según lo que convenga. Las actualizaciones llegan solas.' },
    ],
    relacionados: ['software-a-medida', 'crm'],
  },
]

export const servicioPorSlug = (slug) => SERVICIOS.find((s) => s.slug === slug)
