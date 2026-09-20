import Logo from './Logo'
import Icon from './Icon'
import { EMAIL, TELEFONOS, CIUDAD, whatsappUrl } from '../data/contacto'
import './Footer.css'

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
              {TELEFONOS.map((p) => (
                <li key={p.tel}>
                  <Icon name="phone" size={16} />
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </li>
              ))}
              <li>
                <Icon name="message-circle" size={16} />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <Icon name="map-pin" size={16} />
                <span>{CIUDAD}</span>
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
