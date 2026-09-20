import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Aviso from './Aviso'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Aviso />
  </React.StrictMode>,
)
