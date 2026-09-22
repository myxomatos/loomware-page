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
          {/* El dibujo es nuestro y dice lo mismo que el titular: la maraña de hoy
              —Excel, WhatsApp, correo, papel— contra un solo sistema. Se genera con
              `npm run hero:dibujo` desde la paleta del sitio; pesa 5 KB y es nítido
              a cualquier tamaño. */}
          <img
            src="/hero-operacion.svg"
            width="580"
            height="400"
            alt="A la izquierda, cinco herramientas sueltas —Excel, WhatsApp, correo, papel y un sistema viejo— unidas por líneas cruzadas. A la derecha, un solo sistema donde ventas, almacén, compras, contabilidad y dirección escriben y leen lo mismo"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
      {VIDEO_URL && <VideoModal abierto={video} onCerrar={() => setVideo(false)} />}
    </section>
  )
}
