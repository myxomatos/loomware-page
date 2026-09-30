/*
 * Casos de éxito. La sección `#casos` y el enlace del footer aparecen sólo
 * cuando este arreglo tiene al menos un caso.
 *
 * Reglas: nada inventado ni redondeado hacia arriba. Si el cliente no autoriza
 * su nombre, se describe por giro, tamaño y ciudad ("Distribuidora de 45
 * empleados en Ecatepec") y se deja `cliente` vacío. Los resultados deben
 * ser medibles y haberse medido de verdad.
 *
 * La cita va **con el nombre de quien la dijo**, y se publica sólo con su
 * visto bueno: es su palabra, no la nuestra. Un caso firmado por el dueño
 * pesa más que tres párrafos escritos por nosotros.
 *
 * **GT-SHOP está autorizado.** Eduardo Díaz dio permiso del logotipo y mandó él
 * mismo el texto de la cita —nosotros sólo la pulimos—, por WhatsApp. Queda
 * escrito aquí porque ya se levantó dos veces como si faltara: está resuelto y
 * no hay que volver a preguntarlo.
 *
 * Campos:
 *   cliente      nombre comercial, o '' si es anónimo
 *   descripcion  giro, tamaño y ciudad
 *   servicio     CRM, ERP, Nómina, Comercio en línea…
 *   reto         qué había antes
 *   solucion     qué se construyó
 *   resultado    qué cambió. Medible cuando se midió; si todavía no hay
 *                medición, se describe lo que sí es verificable y se deja el
 *                número para cuando exista. Jamás una cifra estimada.
 *   logo         ruta en public/clientes/, sólo con autorización de marca
 *   cita, autor  frase textual y quién la dijo, aprobadas por esa persona
 *
 * Para preparar un logotipo: `node scripts/logo-cliente.js <origen> <destino>`.
 */
export const CASOS = [
  {
    cliente: 'Simagas',
    descripcion: 'Distribución de gas LP en la Ciudad de México y el Estado de México, con más de 15 mil clientes',
    servicio: 'ERP y app móvil',
    reto:
      'Vender gas LP por medidor en edificios obliga a leer cada medidor, emitir un recibo por departamento, cobrarlo, surtir las pipas por ruta y reportar a la CRE todos los días, para más de 15 mil clientes.',
    solucion:
      'Un ERP a la medida, del tanque al cobro —clientes, edificios y medidores; lecturas, recibos y cobranza; compras de gas, pipas y rutas; facturación y nómina timbradas; el reporte diario para la CRE—, y una app para los lecturistas que lee el medidor desde una foto, con una persona que confirma la lectura.',
    resultado:
      'En implementación: los más de 15 mil clientes entran al sistema por etapas.',
    logo: '/clientes/simagas.png',
  },
  {
    cliente: '',
    descripcion: 'Institución pública de salud · 18 hospitales en todo el país',
    servicio: 'Software a medida',
    reto:
      'Los familiares de un paciente internado necesitan saber dónde está y cómo va. El personal de enlace —el que los ubica, apoya en el triage y da pláticas— necesitaba registrar su trabajo y el seguimiento de cada paciente, y la institución, saber cuánto personal había en cada hospital.',
    solucion:
      'Una aplicación para el personal de enlace, con el seguimiento de cada paciente dentro del hospital y el conteo del personal —médicos, enfermería y demás—. Diseñamos los datos para que se consultaran a nivel nacional y le dimos mantenimiento.',
    resultado:
      'Unas 70 personas de enlace la usaban en 18 hospitales de todo el país, con el seguimiento de miles de pacientes para informar a sus familiares.',
  },
  {
    cliente: 'GT-SHOP',
    descripcion: 'Venta, instalación y mantenimiento de cámaras y equipo de seguridad',
    servicio: 'Comercio en línea',
    reto:
      'Quien compra una cámara también espera que se la instalen y le den mantenimiento. Vender en línea tenía que sostener las tres cosas con la misma operación.',
    solucion:
      'Tienda en línea sobre Shopify y el ecosistema completo alrededor: catálogo, pago, envío, factura y devolución en un mismo flujo, con la instalación y el mantenimiento como parte de la venta.',
    resultado:
      'Un pedido entra y sale completo —se cobra, se entrega, se instala, se factura y, si hace falta, se devuelve— dentro del mismo sistema.',
    logo: '/clientes/gt-shop.png',
    cita: 'Vendemos la cámara, la instalamos y le damos mantenimiento. Ahora todo eso es una sola venta.',
    autor: 'Eduardo Díaz · GT-SHOP',
  },
]
