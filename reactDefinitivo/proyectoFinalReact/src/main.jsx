import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductoProvider } from './producto/context/ProductoProvider.jsx'
import { AuthProvider } from './auth/context/AuthProvider'
import { ClienteProvider } from './cliente/context/ClienteProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ClienteProvider>
          <ProductoProvider>
            <App />
          </ProductoProvider>
        </ClienteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
