import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Gracias from './Gracias'
import { reportarLead } from '../lib/analytics'
import Cookies from '../components/Cookies'

reportarLead()

// El HTML ya viene dibujado desde el build (scripts/prerender.js), así que se
// adopta en vez de volver a pintarlo: con createRoot React borraría el texto y
// lo dibujaría otra vez, y eso se ve como un parpadeo.
hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Gracias />
    <Cookies />
  </React.StrictMode>,
)
