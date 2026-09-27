/*
 * Calculadora «¿Cuánto te cuesta tu Excel?».
 *
 * Regla del proyecto: nada inventado. La cuenta se hace con los números que la
 * propia empresa contesta y se enseña completa en pantalla, para que cualquiera
 * la pueda revisar. Los dos únicos supuestos van escritos ahí mismo:
 *
 *   FACTOR_PRESTACIONES  lo que cuesta un sueldo por encima del bruto (IMSS,
 *                        aguinaldo, vacaciones, prima). 1.35 es conservador.
 *   HORAS_MES            176 horas = 22 días de 8 horas.
 *
 * Lo que se calcula no es "lo que vas a ahorrar": es lo que hoy se va en
 * capturar el mismo dato más de una vez, y cuánto dinero trae detenido facturar
 * tarde. Son dos cosas distintas y se presentan por separado.
 */
export const FACTOR_PRESTACIONES = 1.35
export const HORAS_MES = 176
export const DIAS_HABILES = 22

export const PREGUNTAS = [
  {
    id: 'personas',
    pregunta: '¿Cuántas personas capturan datos todos los días?',
    ayuda: 'Quien teclea remisiones, pedidos, facturas, listas o reportes.',
    opciones: [
      { label: '1', valor: 1 },
      { label: '2 a 3', valor: 2.5 },
      { label: '4 a 8', valor: 6 },
      { label: '9 a 20', valor: 14 },
      { label: 'Más de 20', valor: 25 },
    ],
  },
  {
    id: 'veces',
    pregunta: '¿Cuántas veces se captura el mismo dato antes de quedar en su lugar?',
    ayuda: 'Ejemplo: se anota en papel, se pasa a Excel y se vuelve a teclear para facturar.',
    opciones: [
      { label: 'Una sola vez', valor: 1 },
      { label: 'Dos veces', valor: 2 },
      { label: 'Tres veces', valor: 3 },
      { label: 'Cuatro o más', valor: 4 },
    ],
  },
  {
    id: 'minutos',
    pregunta: '¿Cuánto tiempo al día se le va a cada una en capturar y conciliar?',
    ayuda: 'Sumando capturar, revisar que cuadre y buscar lo que no cuadró.',
    opciones: [
      { label: '15 min', valor: 15 },
      { label: '30 min', valor: 30 },
      { label: '1 hora', valor: 60 },
      { label: '2 horas', valor: 120 },
      { label: 'Media jornada', valor: 240 },
    ],
  },
  {
    id: 'sueldo',
    pregunta: '¿Cuánto gana al mes, en promedio, esa persona?',
    ayuda: 'Sueldo bruto. Abajo se le suman las prestaciones para sacar el costo por hora.',
    opciones: [
      { label: '$8,000', valor: 8000 },
      { label: '$12,000', valor: 12000 },
      { label: '$18,000', valor: 18000 },
      { label: '$30,000', valor: 30000 },
      { label: '$50,000', valor: 50000 },
    ],
  },
  {
    id: 'diasFactura',
    pregunta: '¿Cuántos días pasan entre que entregas y se timbra la factura?',
    ayuda: 'Desde que sale la mercancía o se presta el servicio hasta el CFDI.',
    opciones: [
      { label: 'El mismo día', valor: 0 },
      { label: '1 a 2', valor: 1.5 },
      { label: '3 a 5', valor: 4 },
      { label: '6 a 10', valor: 8 },
      { label: 'Más de 10', valor: 15 },
    ],
  },
  {
    id: 'facturacion',
    pregunta: '¿Cuánto factura la empresa al mes, más o menos?',
    ayuda: 'Sirve para estimar cuánto dinero trae detenido facturar tarde.',
    opciones: [
      { label: 'Menos de $500 mil', valor: 300000 },
      { label: '$500 mil a $2 M', valor: 1250000 },
      { label: '$2 M a $5 M', valor: 3500000 },
      { label: '$5 M a $15 M', valor: 10000000 },
      { label: 'Más de $15 M', valor: 20000000 },
    ],
  },
]

export const pesos = (n) =>
  '$' + Math.round(n).toLocaleString('es-MX', { maximumFractionDigits: 0 })

/*
 * Devuelve null mientras falte contestar algo. Con las seis respuestas
 * entrega los números y también cada paso de la cuenta, para poder enseñarla.
 */
export function calcular(r) {
  if (PREGUNTAS.some((p) => r[p.id] === undefined)) return null

  const costoHora = (r.sueldo * FACTOR_PRESTACIONES) / HORAS_MES
  const horasMes = r.personas * (r.minutos / 60) * DIAS_HABILES
  const costoCaptura = horasMes * costoHora
  // Sólo es evitable lo que se captura de más: la primera vez alguien la tiene que teclear.
  const recaptura = costoCaptura * ((r.veces - 1) / r.veces)
  const detenido = (r.facturacion / 30) * r.diasFactura

  return {
    costoHora,
    horasMes,
    costoCaptura,
    recaptura,
    detenido,
    horasRecaptura: horasMes * ((r.veces - 1) / r.veces),
    capturaUnaVez: r.veces === 1,
    facturaElMismoDia: r.diasFactura === 0,
  }
}
