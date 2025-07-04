import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const validPaths = ['/', '/play'];

if (!validPaths.includes(window.location.pathname)) {
  window.location.href = '/404.html';
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
