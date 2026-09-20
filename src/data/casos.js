/*
 * Casos reales para la sección "Resultados con clientes". La sección y el
 * enlace del footer aparecen sólo cuando este arreglo tiene al menos un caso.
 *
 * Reglas: nada inventado ni redondeado hacia arriba. Si el cliente no autoriza
 * su nombre, se describe por giro, tamaño y ciudad ("Distribuidora de 45
 * empleados en Ecatepec") y se deja `cliente` vacío. Los resultados deben
 * ser medibles y haberse medido de verdad.
 *
 * Ejemplo de la forma esperada (borrar al capturar el primero real):
 * {
 *   cliente: '',                         // nombre comercial, o '' si es anónimo
 *   descripcion: 'Distribuidora de 45 empleados en Ecatepec',
 *   servicio: 'ERP',                     // CRM, ERP, Nómina, Automatización…
 *   reto: 'Inventario en tres hojas de Excel que no coincidían entre sí.',
 *   solucion: 'ERP con inventario en tiempo real y facturación conectada.',
 *   resultado: 'Cierre de mes de 9 días a 2. Cero diferencias de inventario en 6 meses.',
 *   cita: '',                            // frase textual del cliente, opcional
 *   autor: '',                           // 'Nombre, Cargo', si hay cita
 * }
 */
export const CASOS = []
