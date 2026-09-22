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
