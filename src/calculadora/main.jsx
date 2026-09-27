import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tokens.css'
import '../styles/base.css'
import Calculadora from './Calculadora'
import Cookies from '../components/Cookies'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calculadora />
    <Cookies />
  </React.StrictMode>,
)
