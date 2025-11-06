import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StudentsProvider } from './context/StudentsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StudentsProvider>
          <App />
      </StudentsProvider>
    </BrowserRouter>
  </StrictMode>,
)
