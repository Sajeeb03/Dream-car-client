import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import ThemeSwitch from './Contexts/ThemeSwitch/ThemeSwitch'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeSwitch>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeSwitch>
    <ToastContainer
      position='top-right'
      autoClose={500}
    />
  </React.StrictMode>
)
