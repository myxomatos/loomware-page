import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Servicio from './Servicio'
import Cookies from '../components/Cookies'

// El generador escribe <html data-servicio="crm">; de ahí sale qué página es.
const slug = document.documentElement.dataset.servicio || ''

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Servicio slug={slug} />
    <Cookies />
  </React.StrictMode>,
)
