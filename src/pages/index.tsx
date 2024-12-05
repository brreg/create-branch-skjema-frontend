import './index.css'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Textfield } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';


function IndexPage() {
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState("")
  const { sessionId } = useSession()

  useEffect(() => {
    fetchQrLink()
  }, [sessionId])

  const fetchQrLink = async () => {
    try {
      if (!sessionId) {
        throw new Error("SessionId is missing")
      }
      const response = await fetch( import.meta.env.VITE_BACKEND_URL+"/api/qr-code", {
        headers: {
          "x-session-id": sessionId
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch QR link")
      }

      const data = await response.json()
      console.log("received data from /api/qrcode")
      setQrLink(data.didcommUri)
    } catch (error) {
      console.error("Error fetching QR link:", error)
    }
  }

  return (
    <>
      <main className='center'>
        <h1>Create branch info side</h1>
        <p>Snedig info om hvordan denne prosessen vil være</p>
        <div className='center'>
          <h2>Scan QR koden for å laste opp credentials</h2>
          <QRCodeSVG value={qrLink} className='qrimage'/>
          <h2>Eller fyll inn DID addressen til lommeboken din</h2>
          <div className="didinput">
            <Textfield
              data-size="md"
              label="DID addresse til din personlommebok"
              htmlSize={40}
              required
            />
            <Button onClick={() => navigate("/wait")}>Send inn</Button>
          </div>
        </div>
        <div className='center'>
          <h1></h1>
          <Button onClick={() => navigate("/testdata")}>MEN JEG TRENGER TESTDATA!</Button>
        </div>
      </main>
    </>
  )
}

export default IndexPage
