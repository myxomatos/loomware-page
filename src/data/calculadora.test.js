import { describe, expect, it } from 'vitest'
import { calcular } from './calculadora'

// Seis personas que capturan una hora diaria cada una, el mismo dato tres veces,
// $12,000 de sueldo, factura a los 4 días y $1.25 M facturados al mes.
// A mano: $12,000 × 1.35 / 176 h = $92.05 la hora; 6 × 1 h × 22 días = 132 h al mes;
// 132 h × $92.05 = $12,150; de ahí son de más dos de cada tres capturas = $8,100;
// y $1,250,000 / 30 × 4 días = $166,666.67 detenidos.
const EJEMPLO = { personas: 6, veces: 3, minutos: 60, sueldo: 12000, diasFactura: 4, facturacion: 1250000 }

describe('calcular', () => {
  it('no da números mientras falte contestar una pregunta', () => {
    const { facturacion, ...incompleto } = EJEMPLO
    expect(calcular(incompleto)).toBeNull()
  })

  it('saca el costo de la recaptura y el dinero detenido con las respuestas de la empresa', () => {
    const r = calcular(EJEMPLO)
    expect(r.horasMes).toBe(132)
    expect(r.costoCaptura).toBeCloseTo(12150, 2)
    expect(r.recaptura).toBeCloseTo(8100, 2)
    expect(r.horasRecaptura).toBeCloseTo(88, 2)
    expect(r.detenido).toBeCloseTo(166666.67, 1)
  })

  it('dice que no hay recaptura cuando el dato se captura una sola vez', () => {
    const r = calcular({ ...EJEMPLO, veces: 1 })
    expect(r.recaptura).toBe(0)
    expect(r.capturaUnaVez).toBe(true)
  })

  it('no trae dinero detenido cuando se factura el mismo día', () => {
    const r = calcular({ ...EJEMPLO, diasFactura: 0 })
    expect(r.detenido).toBe(0)
    expect(r.facturaElMismoDia).toBe(true)
  })
})
