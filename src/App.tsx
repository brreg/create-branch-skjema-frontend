import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateCookieIfMissing } from './context/Cookie'
import IndexPage from './pages'
import SkjemaPage from './pages/skjema/skjema'
import ThanksPage from './pages/thanks'
import TestdataPage from './pages/testdata'
import PortalPage from './pages/portal'

function App() {
  CreateCookieIfMissing()

  return (
    <>
      <Routes>
        <Route path="/" element={<PortalPage />} />
        <Route path="/start" element={<IndexPage />} />
        <Route path='/skjema' element={<SkjemaPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/testdata' element={<TestdataPage />} />
      </Routes>
    </>
  )
}

export default App
