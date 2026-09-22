/*
 * Casos reales para la sección "Resultados con clientes". La sección y el
 * enlace del footer aparecen sólo cuando este arreglo tiene al menos un caso.
 *
 * Reglas: nada inventado ni redondeado hacia arriba. Si el cliente no autoriza
 * su nombre, se describe por giro, tamaño y ciudad ("Distribuidora de 45
 * empleados en Ecatepec") y se deja `cliente` vacío. Los resultados deben
 * ser medibles y haberse medido de verdad.
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
 *   sitio        URL pública del cliente, opcional
 *   cita, autor  frase textual y quién la dijo, opcionales
 *
 * Para preparar un logotipo: `node scripts/logo-cliente.js <origen> <destino>`.
 */
export const CASOS = [
  {
    cliente: 'GT-SHOP',
    descripcion: 'Grafeno Tech Shop · venta de cámaras y equipo de seguridad',
    servicio: 'Comercio en línea',
    reto:
      'Vender en línea su catálogo de cámaras y equipo de seguridad sin montar una operación aparte de la del mostrador.',
    solucion:
      'Tienda en línea sobre Shopify, con el catálogo, los pagos y los envíos conectados en un mismo flujo.',
    resultado:
      'La tienda opera en línea: el catálogo se publica desde un solo lugar y cada pedido entra con su pago y su envío.',
    logo: '/clientes/gt-shop.png',
    cita: '',
    autor: '',
  },
]
