import { useEffect, useState } from 'react'
import './Cookies.css'

/*
 * Banda de cookies. La única cookie que pone el sitio es la de Google Analytics,
 * y no se pone hasta que alguien acepta: vite.config.js arranca el consentimiento
 * en "denied" y aquí se actualiza. Sin aceptar, GA no escribe nada en el navegador.
 *
 * La decisión se guarda en localStorage. Se puede cambiar después desde el enlace
 * "Cookies" del pie, que dispara el evento ABRIR.
 */
const LLAVE = 'lw-cookies'
export const ABRIR = 'lw-cookies-abrir'

const leer = () => {
  try {
    return localStorage.getItem(LLAVE)
  } catch {
    return null
  }
}

const guardar = (valor) => {
  try {
    localStorage.setItem(LLAVE, valor)
  } catch {
    /* Navegación privada o almacenamiento bloqueado: la decisión vale sólo para esta visita. */
  }
}

const avisarAGoogle = (acepta) => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: acepta ? 'granted' : 'denied' })
  }
}

export default function Cookies() {
  // null = todavía no sabemos qué eligió; se resuelve al montar para no parpadear.
  const [decision, setDecision] = useState('pendiente')

  useEffect(() => {
    // Sin VITE_GA_ID no se inyecta Analytics, no existe gtag y el sitio no pone
    // ninguna cookie. Pedir permiso para algo que no pasa sería ruido: la banda
    // aparece sola el día que se cargue la variable en Cloudflare.
    if (typeof window.gtag !== 'function') return

    setDecision(leer() || '')
    const abrir = () => setDecision('')
    window.addEventListener(ABRIR, abrir)
    return () => window.removeEventListener(ABRIR, abrir)
  }, [])

  const visible = decision === ''

  // Mientras la banda está abierta, el botón flotante de WhatsApp se aparta en celular.
  useEffect(() => {
    document.body.classList.toggle('cookies-abierto', visible)
    return () => document.body.classList.remove('cookies-abierto')
  }, [visible])

  if (!visible) return null

  const responder = (acepta) => {
    const valor = acepta ? 'aceptadas' : 'rechazadas'
    guardar(valor)
    avisarAGoogle(acepta)
    setDecision(valor)
  }

  return (
    <div className="cookies" role="dialog" aria-modal="false" aria-labelledby="cookies-titulo">
      <div className="cookies__texto">
        <p id="cookies-titulo" className="cookies__titulo">
          Cookies de medición
        </p>
        <p>
          Usamos cookies de Google Analytics para saber qué páginas se leen y de dónde llegan las
          visitas. No identifican a nadie y no se activan hasta que las aceptas. Más detalle en el{' '}
          <a href="/aviso-de-privacidad#cookies">aviso de privacidad</a>.
        </p>
      </div>
      <div className="cookies__acciones">
        <button type="button" className="btn btn--outline btn--sm" onClick={() => responder(false)}>
          Rechazar
        </button>
        <button type="button" className="btn btn--sm cookies__aceptar" onClick={() => responder(true)}>
          Aceptar
        </button>
      </div>
    </div>
  )
}
