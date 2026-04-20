import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// removed Vite default styles

import { AuthProvider } from '../context/AuthContext';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
