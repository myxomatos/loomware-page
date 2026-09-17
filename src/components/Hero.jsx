import React from 'react'
import Icon from './Icon'
import './Hero.css'

const HIGHLIGHTS = [
  { icon: 'zap', label: 'Más eficiencia' },
  { icon: 'sliders', label: 'Más control' },
  { icon: 'bar-chart', label: 'Más crecimiento' },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Tecnología que impulsa tu operación</span>
          <h1 className="hero__title">
            Tecnología que escala con <span className="text-gradient">tu negocio</span>
          </h1>
          <p className="lead hero__lead">
            CRM, ERP, automatización, software a medida e infraestructura cloud para empresas
            mexicanas que buscan crecer con más control, eficiencia y resultados.
          </p>

          <div className="hero__actions">
            <a href="#contacto" className="btn btn--primary">
              Solicitar diagnóstico
              <Icon name="arrow-right" size={18} />
            </a>
            <a href="#proceso" className="btn btn--ghost">
              <span className="btn__play">
                <Icon name="play" size={14} />
              </span>
              Ver cómo funciona
            </a>
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
          <picture>
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
    </section>
  )
}
