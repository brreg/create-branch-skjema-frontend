import './error.css'
import { Button} from '@digdir/designsystemet-react'
import Header from '../components/header'
import { DeleteCookie, CreateCookieIfMissing } from '../context/Cookie'

export default function ErrorPage() {

  const handleBackToStart = () => {
    DeleteCookie();
    CreateCookieIfMissing();
    window.location.href = "/start";
  }

  return (
    <>
      <Header />
      <main className='main'>
        <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
          <h1>Error</h1>
          <p style={{ marginBottom: "20px" }}>
            We encountered an error while processing your credentials. This could be because:
          </p>
          <ul>
            <li>The person name does not match the representative name</li>
            <li>The signature rule on the EUCC is not "alone"</li>
            <li>There was an issue with the credential data</li>
          </ul>
          <div style={{ marginTop: "40px" }}>
            <Button onClick={handleBackToStart}>Back to Start</Button>
          </div>
        </div>
      </main>
    </>
  )
} 