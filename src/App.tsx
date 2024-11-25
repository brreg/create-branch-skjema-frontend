import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateCookieIfMissing } from './context/Cookie'
import IndexPage from './pages'

function App() {
  CreateCookieIfMissing()

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  )
}

export default App
