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
import ErrorPage from './pages/error'
import BranchRegistrationGuide from './pages/BranchRegistrationGuide'
import CountrySelection from './pages/CountrySelection'

function App() {
  CreateCookieIfMissing()

  return (
    <>
      <Routes>
        <Route path="/" element={<BranchRegistrationGuide />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path='/skjema' element={<SkjemaPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/testdata' element={<TestdataPage />} />
        <Route path='/signWithNpid' element={<SignWithNpid />} />
        <Route path='/receipt' element={<Receipt />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/guide' element={<BranchRegistrationGuide />} />
        <Route path='/credentialguidpage' element={<CountrySelection />} />
      </Routes>
    </>
  )
}

export default App
