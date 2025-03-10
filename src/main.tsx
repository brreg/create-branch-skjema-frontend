import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from './context/SessionContext.tsx'
// @ts-ignore
import '@digdir/designsystemet-css';
// @ts-ignore
import '@digdir/designsystemet-theme';//brand/brreg/tokens.css';
// @ts-ignore
import '@fontsource/open-sans' 

import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>,
)
