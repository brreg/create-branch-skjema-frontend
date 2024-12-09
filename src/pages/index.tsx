import './index.css'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Textfield } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';
import { HashLoader } from 'react-spinners';


function IndexPage() {
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState("")
  const { sessionId } = useSession()

  useEffect(() => {
    fetchQrLink()
  }, [sessionId])

  const fetchQrLink = async () => {
    try {
      if (sessionId) {
        let backendUrl
        if (import.meta.env.PROD) {
          backendUrl = "https://create-branch-java-backend.ashyflower-f0c84bfc.westeurope.azurecontainerapps.io"
        } else {
          backendUrl = "localhost:8080"
        }
        const response = await fetch(backendUrl + "/api/qrcode", {
          method: "POST",
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
      }
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
          {qrLink === "" ?
            <div className='loader'>
              <HashLoader />
            </div> 
            :
            <QRCodeSVG value={qrLink} className='qrimage' />
          }
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
