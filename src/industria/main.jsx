import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Industria from './Industria'

// El generador escribe <html data-industria="distribuidoras">.
const id = document.documentElement.dataset.industria || ''

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Industria id={id} />
  </React.StrictMode>,
)
