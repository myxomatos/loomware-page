import React from 'react'
import Logo from './Logo'
import Icon from './Icon'
import './Footer.css'

const EMAIL = 'hola@loomware.com'
const PHONE_DISPLAY = '+52 55 8096 8928'
const PHONE_TEL = '+525580968928'

// Fill in the real profile URLs; an empty url renders the icon without a link.
const SOCIAL = [
  { icon: 'linkedin', label: 'LinkedIn', url: '' },
  { icon: 'instagram', label: 'Instagram', url: '' },
  { icon: 'youtube', label: 'YouTube', url: '' },
  { icon: 'facebook', label: 'Facebook', url: '' },
]

const COLUMNS = [
  {
    title: 'Soluciones',
    links: [
      { label: 'CRM', href: '#solucion-crm' },
      { label: 'ERP', href: '#solucion-erp' },
      { label: 'Automatización', href: '#solucion-automatizacion' },
      { label: 'Desarrollo de software', href: '#solucion-software' },
      { label: 'Infraestructura cloud', href: '#solucion-cloud' },
      { label: 'Apps móviles', href: '#solucion-apps' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Integraciones', href: '#proceso' },
      { label: 'Consultoría', href: '#proceso' },
      { label: 'Implementación', href: '#proceso' },
      { label: 'Soporte y mantenimiento', href: '#proceso' },
      { label: 'Migración de sistemas', href: '#proceso' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Casos de éxito', href: '#impacto' },
      { label: 'Recursos', href: '#desafio' },
      { label: 'Acerca de nosotros', href: '#inicio' },
      { label: 'Privacidad', href: '#contacto' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="light" />
            <p className="footer__tagline">
              Tecnología empresarial para crecer con claridad, control y confianza.
            </p>
            <ul className="footer__social" aria-label="Redes sociales">
              {SOCIAL.map((s) =>
                s.url ? (
                  <li key={s.icon}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <Icon name={s.icon} size={18} />
                    </a>
                  </li>
                ) : (
                  <li key={s.icon}>
                    <span title={s.label}>
                      <Icon name={s.icon} size={18} />
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h4 className="footer__heading">{col.title}</h4>
              <ul className="footer__links">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col">
            <h4 className="footer__heading">Contacto</h4>
            <ul className="footer__links footer__contact">
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <Icon name="map-pin" size={16} />
                <span>México, CDMX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Loomware. Todos los derechos reservados.</p>
          <p className="footer__motto">Ideas de hoy. Negocios más grandes mañana.</p>
        </div>
      </div>
    </footer>
  )
}
