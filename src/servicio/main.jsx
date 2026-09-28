import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Servicio from './Servicio'
import Cookies from '../components/Cookies'
import { irAlAncla } from '../lib/ancla'

// El generador escribe <html data-servicio="crm">; de ahí sale qué página es.
const slug = document.documentElement.dataset.servicio || ''

// Un enlace como /#contacto llega antes de que React dibuje la sección.
irAlAncla()

// El HTML ya viene dibujado desde el build (scripts/prerender.js), así que se
// adopta en vez de volver a pintarlo: con createRoot React borraría el texto y
// lo dibujaría otra vez, y eso se ve como un parpadeo.
hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Servicio slug={slug} />
    <Cookies />
  </React.StrictMode>,
)
