import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateCookieIfMissing } from './context/Cookie'
import StartPage from './pages/start'
import SkjemaPage from './pages/skjema/skjema'
import ThanksPage from './pages/thanks'
import TestdataPage from './pages/testdata'
import PortalPage from './pages/portal'
import SignWithNpid from './pages/signWithNpid'
import Receipt from './pages/receipt'

function App() {
  CreateCookieIfMissing()

  return (
    <>
      <Routes>
        <Route path="/" element={<PortalPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path='/skjema' element={<SkjemaPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/testdata' element={<TestdataPage />} />
        <Route path='/signWithNpid' element={<SignWithNpid />} />
        <Route path='/receipt' element={<Receipt />} />
        
      </Routes>
    </>
  )
}

export default App
