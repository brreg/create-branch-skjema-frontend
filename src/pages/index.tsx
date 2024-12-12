import './index.css'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { backendWebsocketUrl, backendUrl } from '../const'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Textfield } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';
import { HashLoader } from 'react-spinners';
import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
import { createPortal } from 'react-dom'
import WaitModal from '../components/waitModal'
import { useFormik } from 'formik'
Object.assign(global, { WebSocket });

function IndexPage() {
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState("")
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [didAddress, setDidAddress] = useState('');
  const { sessionId } = useSession()

  const stompClient = new Client({
    brokerURL: backendWebsocketUrl + "/ws"
  })

  // stompClient.debug = (str) => {
  //   console.log('STOMP: ' + str);
  // };

  stompClient.onConnect = () => {
    console.log('STOMP connected');
    stompClient.subscribe(`/topic/sessions/${sessionId}`, (message) => {
      console.log("Data mottatt: ", message.body);
      navigate("/skjema")
    });
  };

  stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  stompClient.onDisconnect = () => {
    console.log("STOMP disconnected")
  }

  useEffect(() => {
    stompClient.activate();
    checkIfSessionHasData();
    fetchQrLink()

    return () => {
      stompClient.deactivate()
    }
  }, [sessionId])

  const checkIfSessionHasData = async () => {
    try {
      if (sessionId) {
        const response = await fetch(backendUrl + "/api/session", {
          headers: {
            "x-session-id": sessionId
          }
        })
        if (response.status == 200) {
          console.log("data found in /api/session")
          navigate("/skjema")
        }

        if (response.status == 204) {
          console.log("no data found in /api/session")
        }
      }
    } catch (error) {
      console.error("Error fetching data for session: ", error)
    }
  }

  const fetchQrLink = async () => {
    try {
      if (sessionId) {
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

  async function sendDIDaddress() {
    try {
      setShowWaitModal(true)
      if (!sessionId) return;

      const response = await fetch(backendUrl + "/api/message", {
        method: "POST",
        headers: {
          "x-session-id": sessionId,
          "recipient-did-url": didAddress
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch QR link")
      }

    } catch (error) {
      console.error("Error fetching QR link:", error)
    }
  }

  const formik = useFormik({
    initialValues: {
      didAddress: ''
    },
    onSubmit: (values) => {
      setDidAddress(values.didAddress)
      sendDIDaddress()
    }
  })

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
          <form className="didinput" onSubmit={formik.handleSubmit}>
            <Textfield
              type={'did' as any}
              data-size="md"
              label="DID addresse til din personlommebok"
              htmlSize={40}
              required
              name='didAddress'
              value={formik.values.didAddress}
              onChange={formik.handleChange}
              />
            <Button type='submit'>Send inn</Button>
          </form>
          {showWaitModal && createPortal(
            <WaitModal onClose={() => setShowWaitModal(false)} />,
            document.body
          )}
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
