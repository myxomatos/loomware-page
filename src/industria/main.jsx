import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Industria from './Industria'
import Cookies from '../components/Cookies'
import { irAlAncla } from '../lib/ancla'

// El generador escribe <html data-industria="distribuidoras">.
const id = document.documentElement.dataset.industria || ''

// Un enlace como /#contacto llega antes de que React dibuje la sección.
irAlAncla()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Industria id={id} />
    <Cookies />
  </React.StrictMode>,
)
