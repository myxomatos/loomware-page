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
    r: 'No publicamos precios porque cada sistema se hace a la medida. No competimos por ser los más baratos, sino por que funcione: el precio corresponde al tamaño de lo que resolvemos —usuarios, sedes, volumen y cuántos procesos conectamos—. Del tamaño de tu operación depende el alcance, no nuestra capacidad: trabajamos igual con una sucursal que con una operación de varias sedes y miles de usuarios.\n\nEmpezamos con una llamada de 30 minutos, sin costo, para entender tu operación y lo que quieres resolver. Con eso te proponemos un diagnóstico, con su precio según el tamaño de tu empresa, y del diagnóstico sale una propuesta con precio cerrado por ese alcance, antes de decidir nada. Si después quieres ampliarlo, se cotiza aparte y lo apruebas tú. Si usas uno de nuestros sistemas, además hay una cuota mensual por hospedaje, mantenimiento y actualizaciones, y te la decimos en la propuesta. El soporte posterior a la entrega va en un contrato aparte, que decides tú.',
    cta: { texto: '¿Cuánto costaría en tu empresa?', href: '#contacto' },
  },
  {
    p: '¿Cuánto tarda una implementación?',
    r: 'Depende de qué se implementa y de qué tan listos estén tus datos. En el diagnóstico te damos un calendario realista. Trabajamos por etapas: la primera funcionalidad útil en semanas, y el resto sobre esa base, nunca meses sin ver nada.',
  },
  {
    p: '¿Migran mis datos de Excel o de mi sistema actual?',
    r: 'Sí. Clientes, productos, inventario, saldos o lo que corresponda: qué datos se migran y cómo se limpian lo definimos en el diagnóstico, y va en la propuesta desde el principio, para que no aparezca después. Si vienen sucios —que es lo normal—, los limpiamos contigo antes de cargarlos.',
  },
  {
    p: '¿Los sistemas facturan al SAT?',
    r: 'Sí. ERP, nómina y tienda en línea emiten CFDI 4.0 a través de un PAC autorizado, con complementos de pago, notas de crédito y cancelaciones.',
  },
  {
    p: '¿Qué pasa si se cae el internet?',
    r: 'Los sistemas en la nube necesitan conexión para consultarse, pero siguen funcionando para quien la tenga: celular, otra sede, casa. Las apps móviles de campo capturan sin señal y sincronizan al reconectar. Si tu operación no puede detenerse nunca, lo resolvemos en el diseño.',
  },
  {
    p: '¿Necesito comprar servidores o licencias?',
    r: 'No necesitas comprar servidores: el sistema vive en nuestra infraestructura o en la tuya, según convenga. Puedes usar nuestros sistemas, con una cuota mensual que se define en tu contrato, o que te construyamos uno a la medida que es tuyo, sin licencias.',
  },
  {
    p: '¿Y si mi equipo no sabe de sistemas?',
    r: 'Diseñamos para quien lo va a usar, con esa persona enfrente. Capacitamos y acompañamos las primeras semanas de operación. Un sistema que el equipo no adopta no está terminado, y así lo medimos.',
  },
  {
    p: '¿Qué pasa después de la entrega?',
    r: 'Seguimos, si tú quieres: el soporte, el mantenimiento y la evolución del sistema van en un contrato aparte. Medimos que el sistema se use y lo hacemos crecer con tu operación.',
  },
  {
    p: '¿Trabajan fuera de la Ciudad de México?',
    r: 'Sí, en todo México. El diagnóstico y la mayor parte del trabajo se hacen a distancia; las visitas se programan cuando aportan algo que una videollamada no.',
  },
]
