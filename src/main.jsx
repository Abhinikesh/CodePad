import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#e5e5e5',
            border: '1px solid #2a2a40',
            fontFamily: 'Inter, sans-serif'
          },
          success: {
            iconTheme: { primary: '#6366f1', secondary: '#1a1a2e' }
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#1a1a2e' }
          }
        }}
      />
    </Provider>
  </StrictMode>,
)
