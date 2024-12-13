import './index.css'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { backendWebsocketUrl, backendUrl } from '../const'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Fieldset, Textfield } from '@digdir/designsystemet-react';
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

  async function sendDIDaddress(didAddress: string) {
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
        throw new Error("Failed to send message to wallet")
      }

    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const formik = useFormik({
    initialValues: {
      didAddress: ''
    },
    onSubmit: (values) => {
      sendDIDaddress(values.didAddress)
    }
  })

  return (
    <>
      <main className='main'>
        <div
          style={{ paddingLeft: "20px" }}
        >
          <h1>Create branch</h1>
          <p>All foreign businesses in need of a Norwegian organisation number must register as a Norwegian registered foreign business (NUF).</p>
          <ol type='1'>
            <li>First we need you NPID and EUCC credentials from your wallet.</li>
            <li>Start with entering your DID address or QR code to connect your wallet</li>
            <li>Then you will have to fill in missing information and  submit through our form</li>
            <li>Then you can sign the form and submit it to be processed or save and continue later</li>
            <li>We will then process your application automatically</li>
          </ol>

          {/* Bold */}
          <h3
            style={{
              paddingTop: "20px",
              fontSize: "1.5rem"
            }}
          >Start here</h3>
          <Button onClick={() => navigate("/testdata")}>Collect credentials</Button>
        </div>

        {/* horisontal line*/}
        <div className='horisontal-content'>
          <div className='did-content'>
            <hr className='horisontal-divider' />
            <form className="didinput" onSubmit={formik.handleSubmit}>
              <Fieldset
                legend="Fill the DID address for your wallet">
                <Textfield
                  style={{ paddingTop: "20px" }}
                  type={'did' as any}
                  data-size="md"
                  label="Your DID address"
                  htmlSize={40}
                  required
                  name='didAddress'
                  value={formik.values.didAddress}
                  onChange={formik.handleChange}
                />
                <Button
                  style={{
                    margin: "0px",
                    marginTop: "40px",
                    width: "160px"
                  }}
                  type='submit'>Connect wallet</Button>
              </Fieldset>
            </form>
            {showWaitModal && createPortal(
              <WaitModal onClose={() => setShowWaitModal(false)} />,
              document.body
            )}
          </div>

          {/** gray */}
          <p className='gray-text'>OR</p>

          <div className='did-content'>
            <hr className='horisontal-divider' />
            <Fieldset
              legend="Scan QR code to upload credentials via wallet app"
            >
              <div style={{ paddingTop: "30px" }}>
                {qrLink === "" ?
                  <div className='loader'>
                    <HashLoader />
                  </div>
                  :
                  <QRCodeSVG value={qrLink} className='qrimage' />
                }
              </div>
            </Fieldset>
          </div>
        </div>
      </main>
    </>
  )
}

export default IndexPage
