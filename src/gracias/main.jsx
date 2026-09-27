import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Gracias from './Gracias'
import { conversionFormulario } from '../lib/analytics'
import Cookies from '../components/Cookies'

conversionFormulario()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Gracias />
    <Cookies />
  </React.StrictMode>,
)
