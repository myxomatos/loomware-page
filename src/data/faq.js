/*
 * Preguntas frecuentes de la página principal. Son las que sí hacen los
 * prospectos antes de escribir. Se publican también como datos estructurados
 * (FAQPage) para que Google las muestre en resultados.
 *
 * Las respuestas sobre precio, plazos, migración y SAT describen la política
 * de la empresa: hay que validarlas con Aldo antes de producción. La de precio
 * ya lo está (2026-09-27): no se publica ninguna cifra.
 *
 * `r` separa párrafos con una línea en blanco; `cta`, si existe, pone un botón
 * debajo de la respuesta.
 */
export const FAQ = [
  {
    p: '¿Cuánto cuesta?',
    r: 'No publicamos precios porque cada sistema se hace a la medida. No competimos por ser los más baratos, sino por que funcione: el precio corresponde al tamaño de lo que resolvemos —usuarios, sedes, volumen y cuántos procesos conectamos—. Del tamaño de tu operación depende el alcance, no nuestra capacidad: trabajamos igual con una sucursal que con una operación con sedes en todo el país.\n\nEmpezamos con una llamada de 30 minutos, sin costo, para entender tu operación y lo que quieres resolver. Con eso te proponemos un diagnóstico, con su precio según el tipo y el tamaño de tu empresa, y acordamos otra llamada para explicártelo. Del diagnóstico sale una propuesta con precio cerrado por ese alcance, antes de decidir nada. Si después quieres ampliarlo, se cotiza aparte y lo apruebas tú. Si usas uno de nuestros sistemas, además hay una cuota mensual por hospedaje, mantenimiento y actualizaciones, y te la decimos en la propuesta; si el sistema se construye a tu nombre, eso no aplica. El soporte posterior a la entrega va en un contrato aparte, que decides tú.',
    cta: { texto: '¿Cuánto costaría en tu empresa?', href: '#contacto' },
  },
  {
    p: '¿Cuánto tarda una implementación?',
    r: 'Depende de qué se implementa y de qué tan listos estén tus datos. En el diagnóstico te damos un calendario realista y la fecha del primer entregable. Trabajamos por etapas: lo primero que ya te sirve entra en semanas, y el resto se construye sobre esa base, así ves avances desde el principio.',
  },
  {
    p: '¿Migran mis datos de Excel o de mi sistema actual?',
    r: 'Sí. Clientes, productos, inventario, saldos o lo que corresponda: qué datos se migran y cómo se limpian lo definimos en el diagnóstico, y va en la propuesta desde el principio, para que no aparezca después. Si vienen sucios —que es lo normal—, los limpiamos contigo antes de cargarlos.',
  },
  {
    p: '¿Los sistemas facturan al SAT?',
    r: 'Sí. El ERP, la nómina y la tienda en línea emiten facturas con sello del SAT —el CFDI 4.0—, y también los recibos de pago, las notas de crédito y las cancelaciones, sin salir del sistema.',
  },
  {
    p: '¿Qué pasa si se cae el internet?',
    r: 'Los sistemas en la nube necesitan conexión para consultarse, y siguen disponibles para quien la tenga: celular, otra sede, casa. Las apps móviles de campo capturan sin señal y sincronizan al reconectar. Si tu operación tiene que seguir de pie en todo momento, eso se resuelve en el diseño.',
  },
  {
    p: '¿Necesito comprar servidores o licencias?',
    r: 'Sin comprar servidores: el sistema vive en nuestra infraestructura o en la tuya, según convenga. Hay dos caminos y los dos son válidos: usar uno de nuestros sistemas, con una cuota mensual que queda en tu contrato, o que te construyamos uno a la medida que es tuyo, sin licencias que renovar cada año.',
  },
  {
    p: '¿Y si mi equipo no sabe de sistemas?',
    r: 'Diseñamos para quien lo va a usar, con esa persona enfrente. Capacitamos y acompañamos las primeras semanas de operación. Para nosotros el sistema está terminado cuando el equipo lo usa, y así lo medimos.',
  },
  {
    p: '¿Qué pasa después de la entrega?',
    r: 'Seguimos, si tú quieres: el soporte, el mantenimiento y la evolución del sistema van en un contrato aparte. Medimos que el sistema se use y lo hacemos crecer con tu operación.',
  },
  {
    p: '¿Trabajan fuera del Estado de México?',
    r: 'Sí, en todo México. El diagnóstico y la mayor parte del trabajo se hacen a distancia; las visitas se programan cuando aportan algo que una videollamada no.',
  },
]
