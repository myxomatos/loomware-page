import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Aviso from './Aviso'
import Cookies from '../components/Cookies'

// El HTML ya viene dibujado desde el build (scripts/prerender.js), así que se
// adopta en vez de volver a pintarlo: con createRoot React borraría el texto y
// lo dibujaría otra vez, y eso se ve como un parpadeo.
hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Aviso />
    <Cookies />
  </React.StrictMode>,
)
