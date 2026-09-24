import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { videoFuente } from '../data/video'
import './VideoModal.css'

/*
 * Ventana con el video, sobre la página. Usa <dialog> nativo: cierra con Esc,
 * con el botón o tocando fuera, y devuelve el foco solo. Al cerrar se vacía la
 * fuente para que el video se detenga.
 */
export default function VideoModal({ abierto, onCerrar }) {
  const ref = useRef(null)
  const fuente = videoFuente()

  useEffect(() => {
    const d = ref.current
    if (!d) return undefined
    if (abierto && !d.open) d.showModal()
    if (!abierto && d.open) d.close()
    const alCerrar = () => onCerrar()
    d.addEventListener('close', alCerrar)
    return () => d.removeEventListener('close', alCerrar)
  }, [abierto, onCerrar])

  // Clic en el fondo (fuera de la caja) cierra.
  const clicFondo = (e) => {
    if (e.target === ref.current) ref.current.close()
  }

  if (!fuente) return null

  return (
    <dialog ref={ref} className="video-modal" onClick={clicFondo} aria-label="Video: cómo funciona">
      <div className="video-modal__caja">
        <button
          type="button"
          className="video-modal__cerrar"
          onClick={() => ref.current.close()}
          aria-label="Cerrar video"
        >
          <Icon name="x" size={22} />
        </button>
        {abierto && fuente.tipo === 'youtube' && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${fuente.id}?autoplay=1&rel=0&modestbranding=1`}
            title="Cómo funciona Loomware"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
        {abierto && fuente.tipo === 'archivo' && (
          <video src={fuente.url} controls autoPlay playsInline>
            Tu navegador no puede reproducir este video.
          </video>
        )}
      </div>
    </dialog>
  )
}
