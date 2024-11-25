import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateCookieIfMissing } from './context/Cookie'
import IndexPage from './pages'
import Debug from './components/debug'
import Header from './components/header'
import WaitPage from './pages/wait'
import SkjemaPage from './pages/skjema'
import ThanksPage from './pages/thanks'

function App() {
  CreateCookieIfMissing()

  return (
    <>
      <Header />
      <Debug />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/wait" element={<WaitPage />} />
        <Route path='/skjema' element={<SkjemaPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
      </Routes>
    </>
  )
}

export default App
