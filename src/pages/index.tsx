
import Debug from '../components/debug'
import { CreateCookieIfMissing } from '../context/Cookie'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Textfield } from '@digdir/designsystemet-react';


function IndexPage() {
  CreateCookieIfMissing()
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
      const response = await fetch( import.meta.env.NEXT_PUBLIC_BACKEND_URL+"/api/qr-code", {
        headers: {
          "x-session-id": sessionId
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch QR link")
      }

      const data = await response.json()
      console.log("received data from /api/qr-code")
      setQrLink(data.didcommUri)
    } catch (error) {
      console.error("Error fetching QR link:", error)
    }
  }

  return (
    <>
      <Debug />
      <Header />
      <main>
        <h1>Create branch info side</h1>
        <p>Snedig info om hvordan denne prosessen vil være</p>
        <div>
          <h2>Scan QR koden for å laste opp credentials</h2>
          <QRCodeSVG value={qrLink} />
          <h2>Eller fyll inn DID addressen til lommeboken din</h2>
          <div>
            <Textfield
              data-size="md"
              label="DID addresse til din personlommebok"
              htmlSize={40}
              required
            />
            <Button >Send inn</Button>
          </div>
        </div>
      </main>
    </>
  )
}

export default IndexPage
