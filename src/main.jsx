import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'
import Cookies from './components/Cookies'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Cookies />
  </React.StrictMode>,
)
