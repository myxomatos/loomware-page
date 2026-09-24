import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Aviso from './Aviso'
import Cookies from '../components/Cookies'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Aviso />
    <Cookies />
  </React.StrictMode>,
)
