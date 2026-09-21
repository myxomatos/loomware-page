import Logo from './Logo'
import Icon from './Icon'
import { EMAIL, TELEFONOS, CIUDAD, RAZON_SOCIAL, whatsappUrl } from '../data/contacto'
import { SERVICIOS } from '../data/servicios'
import { INDUSTRIAS } from '../data/industrias'
import { CASOS } from '../data/casos'
import './Footer.css'

const COLUMNS = [
  {
    title: 'Soluciones',
    links: SERVICIOS.map((s) => ({ label: s.nombre, href: `/servicios/${s.slug}` })),
  },
  {
    title: 'Industrias',
    links: INDUSTRIAS.map((g) => ({ label: g.nombre, href: `/industrias/${g.id}` })),
  },
  {
    title: 'Cómo trabajamos',
    links: [
      { label: 'Diagnóstico sin costo', href: '/#contacto' },
      { label: 'Nuestro proceso', href: '/#proceso' },
      { label: 'Integraciones', href: '/servicios/automatizacion' },
      { label: 'Migración a la nube', href: '/servicios/infraestructura-cloud' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '/#nosotros' },
      ...(CASOS.length ? [{ label: 'Resultados con clientes', href: '/#casos' }] : []),
      { label: 'Preguntas frecuentes', href: '/#faq' },
      { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
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

          {COLUMNS.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h3 className="footer__heading">{col.title}</h3>
              <ul className="footer__links">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Loomware · {RAZON_SOCIAL}. Todos los derechos
            reservados.
          </p>
          <p className="footer__motto">Ideas de hoy. Negocios más grandes mañana.</p>
        </div>
      </div>
    </footer>
  )
}
