import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import ThemeSwitch from './Contexts/ThemeSwitch/ThemeSwitch'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeSwitch>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeSwitch>
  </React.StrictMode>
)
