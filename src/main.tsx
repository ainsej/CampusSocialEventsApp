import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// removed Vite default styles
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
