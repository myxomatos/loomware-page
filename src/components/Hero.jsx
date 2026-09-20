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
              <a href="#proceso" className="btn btn--outline hero__video">
                <span className="btn__play">
                  <Icon name="play" size={12} />
                </span>
                Ver cómo funciona
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
          {/* WebP por tamaño de pantalla; el PNG queda como respaldo. Las mismas
              reglas de media están precargadas en index.html. */}
          <picture>
            <source media="(max-width: 767px)" type="image/webp" srcSet="/hero-mobile.webp" />
            <source media="(max-width: 1199px)" type="image/webp" srcSet="/hero-tablet.webp" />
            <source type="image/webp" srcSet="/hero-desktop.webp" />
            <source media="(max-width: 767px)" srcSet="/hero_mobile-1400w.png" />
            <source media="(max-width: 1199px)" srcSet="/hero_tablet-1400w.png" />
            <img
              src="/hero_desktop-1400w.png"
              width="1400"
              height="1050"
              alt="Ecosistema tecnológico Loomware: CRM, ERP, automatización, integraciones y cloud conectados en una sola plataforma"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        </figure>
      </div>
      {VIDEO_URL && <VideoModal abierto={video} onCerrar={() => setVideo(false)} />}
    </section>
  )
}
