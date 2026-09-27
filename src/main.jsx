import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'
import Cookies from './components/Cookies'
import { irAlAncla } from './lib/ancla'

// Un enlace como /#contacto llega antes de que React dibuje la sección.
irAlAncla()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Cookies />
  </React.StrictMode>,
)
