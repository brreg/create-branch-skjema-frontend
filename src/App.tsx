import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateCookieIfMissing } from './context/Cookie'
import IndexPage from './pages'
import Header from './components/header'
import SkjemaPage from './pages/skjema/skjema'
import ThanksPage from './pages/thanks'
import TestdataPage from './pages/testdata'

function App() {
  CreateCookieIfMissing()

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path='/skjema' element={<SkjemaPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/testdata' element={<TestdataPage />} />
      </Routes>
    </>
  )
}

export default App
