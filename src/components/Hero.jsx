import { useState } from 'react'
import Icon from './Icon'
import VideoModal from './VideoModal'
import { VIDEO_URL } from '../data/video'
import { rastrear } from '../lib/analytics'
import './Hero.css'

const HIGHLIGHTS = [
  { icon: 'map-pin', label: 'Hecho en México' },
  { icon: 'search', label: 'Diagnóstico sin costo' },
  { icon: 'list-checks', label: 'Entregas por etapas' },
]

export default function Hero() {
  const [video, setVideo] = useState(false)
  const abrirVideo = () => {
    setVideo(true)
    rastrear('ver_video', { origen: 'hero' })
  }

  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">CRM · ERP · Nómina · Software a medida</span>
          <h1 className="hero__title">
            Tu negocio creció más rápido que <span className="text-gradient">tus sistemas</span>.
          </h1>
          <p className="lead hero__lead">
            Para distribuidoras, manufactura y empresas de servicios en México. Ponemos orden
            donde hoy hay Excel, WhatsApp y programas que no se hablan entre sí.
          </p>

          <div className="hero__actions">
            <a href="#contacto" className="btn btn--primary">
              Solicitar diagnóstico
              <Icon name="arrow-right" size={18} />
            </a>
            {VIDEO_URL ? (
              <button type="button" className="btn btn--outline hero__video" onClick={abrirVideo}>
                <span className="btn__play">
                  <Icon name="play" size={12} />
                </span>
                Ver cómo funciona
                <span className="hero__video-nota">1 min</span>
              </button>
            ) : (
              /* Sin video no se promete video: el botón dice a dónde lleva de verdad. */
              <a href="#proceso" className="btn btn--outline">
                Cómo trabajamos
                <Icon name="arrow-right" size={18} />
              </a>
            )}
          </div>

          <ul className="hero__highlights" aria-label="Beneficios">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="chip">
                <Icon name={h.icon} size={16} />
                {h.label}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero__media">
          {/* El dibujo es nuestro: la misma nave isométrica del recorrido del ERP,
              exportada a SVG. Sustituye al render 3D de catálogo —que no decía
              nada cierto de Loomware— y pesa 4 KB comprimido contra 40 del WebP.
              Se genera con `npm run hero:dibujo`. */}
          <img
            src="/hero-operacion.svg"
            width="744"
            height="462"
            alt="Vista isométrica de una distribuidora: el camión en el andén, los racks del almacén, la mesa de surtido y la oficina, unidos por una línea al sistema"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
      {VIDEO_URL && <VideoModal abierto={video} onCerrar={() => setVideo(false)} />}
    </section>
  )
}
