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

          {/* Dos acciones y sólo dos: una que compromete y otra que no pide nada.
              La calculadora entrega una cifra sin un solo dato del visitante, y
              es la única puerta por la que entra quien todavía está mirando. */}
          <div className="hero__actions">
            <a href="#contacto" className="btn btn--primary">
              Solicitar diagnóstico
              <Icon name="arrow-right" size={18} />
            </a>
            <a
              href="/calculadora"
              className="btn btn--outline hero__calc"
              onClick={() => rastrear('calculadora_desde_hero', { origen: 'hero' })}
            >
              ¿Cuánto te cuesta tu Excel?
              <span className="hero__calc-nota">2 min · con tus números</span>
            </a>
          </div>

          {/* El video, cuando exista, entra como tercera opción discreta: no le
              quita el lugar a la puerta de compromiso cero. */}
          {VIDEO_URL && (
            <button type="button" className="hero__video" onClick={abrirVideo}>
              <span className="btn__play">
                <Icon name="play" size={12} />
              </span>
              Ver cómo funciona
              <span className="hero__video-nota">1 min</span>
            </button>
          )}

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
          {/* La pantalla del sistema, con sus ocho módulos en la barra lateral.
              Bind, Holded, Alegra y Xero enseñan el suyo en la portada y nosotros
              no enseñábamos ninguno: era la mayor diferencia que quedaba contra
              ellos. Se genera con `npm run hero:sistema` desde la paleta del
              sitio; pesa 11 KB y es nítido a cualquier tamaño.

              No es la pantalla de un cliente —lo que construimos es de quien lo
              pagó— y lo dice adentro, en su esquina. Y donde iría el nombre de un
              cliente van renglones, no razones sociales inventadas. */}
          {/* Dos formas del mismo dibujo: en celular la barra lateral no cabe y
              el texto caería a 7 px, así que ahí va una versión con los módulos
              en pestañas y menos piezas. El navegador descarga sólo una. */}
          <picture>
            <source media="(max-width: 599px)" srcSet="/hero-sistema-movil.svg" width="390" height="360" />
          <img
            src="/hero-sistema.svg"
            width="580"
            height="440"
            alt="Pantalla de ejemplo de un sistema Loomware: a la izquierda los ocho módulos —CRM, ERP, nómina, comercio en línea, automatización, software a medida, infraestructura cloud y apps móviles— y a la derecha el de ERP abierto, con el dinero por cobrar, el inventario, los pedidos del día y la facturación por semana"
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
