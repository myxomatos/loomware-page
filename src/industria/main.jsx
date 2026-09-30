import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Industria from './Industria'
import Cookies from '../components/Cookies'
import { irAlAncla } from '../lib/ancla'

// El generador escribe <html data-industria="distribuidoras">.
const id = document.documentElement.dataset.industria || ''

// Un enlace como /#contacto llega antes de que React dibuje la sección.
irAlAncla()

// El HTML ya viene dibujado desde el build (scripts/prerender.js), así que se
// adopta en vez de volver a pintarlo: con createRoot React borraría el texto y
// lo dibujaría otra vez, y eso se ve como un parpadeo.
hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Industria id={id} />
    <Cookies />
  </React.StrictMode>,
)
