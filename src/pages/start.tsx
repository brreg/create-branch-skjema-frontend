import './start.css'
import { useEffect, useState, useRef } from 'react'
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
import Header from '../components/header'
Object.assign(global, { WebSocket });

function StartPage() {
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState("")
  const [showWaitModal, setShowWaitModal] = useState(false)
  const { sessionId } = useSession()
  const refreshCount = useRef(0);
  const qrCodeCache = useRef<string | null>(null);
  const hasInitialized = useRef(false);

  const stompClient = new Client({
    brokerURL: backendWebsocketUrl + "/ws"
  })

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      if (refreshCount.current < 3) {
        refreshCount.current += 1;
        qrCodeCache.current = null; // Clear the cache before refresh
        window.location.reload();
      }
    }, 270000); // 270 seconds

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  stompClient.onConnect = () => {
    console.log('STOMP connected');
    stompClient.subscribe(`/topic/sessions/${sessionId}`, (message) => {
      console.log("Data mottatt: ", message.body);
      navigate("/skjema");
    });
  };

  stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  stompClient.onDisconnect = () => {
    console.log("STOMP disconnected")
  }

  useEffect(() => {
    if (!sessionId || hasInitialized.current) return;

    const initializePage = async () => {
      hasInitialized.current = true;
      stompClient.activate();
      await checkIfSessionHasData();
      await fetchQrLink();
    };

    initializePage();

    return () => {
      stompClient.deactivate();
    }
  }, [sessionId]);

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
        // Return cached QR code if available
        if (qrCodeCache.current) {
          setQrLink(qrCodeCache.current);
          return;
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
        qrCodeCache.current = data.didcommUri; // Cache the new QR code
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
      <Header />
      <main className='main'>
        <div
          style={{ paddingLeft: "20px" }}
        >
          <h1>Create branch Application</h1>
          <p style={{ marginBottom: "20px", textAlign: "left" }}>Please provide us with the EUCC and NPID attestation , so we can use the data to prefill the application form for you. You can do this by either sharing these attestations  with a link from your desktop-wallet or using the QR code with your wallet-app on your mobile phone.</p>

          {/* Bold */}
          <h3
            style={{
              paddingTop: "10px",
              fontSize: "1.5rem"
            }}
          >Do you need test or demo data?</h3>
          <Button onClick={() => navigate("/testdata")}>Fetch test/demo data</Button>
        </div>

        {/* horisontal line*/}
          {/* QR Code Section */}
          <div className='did-content'>
            <hr className='horisontal-divider' />
            <Fieldset>
              <Fieldset.Legend>Scan QR code to upload credentials via wallet app</Fieldset.Legend>
              <div style={{ paddingTop: "10px" }}>
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

          {/* OR divider */}
          <p className='black-text'>OR</p>

          {/* DID Input Section */}
          <div className='did-content'>
            <hr className='horisontal-divider' />
            <form className="didinput" onSubmit={formik.handleSubmit}>
              <Fieldset>
                <Fieldset.Legend>If you don't have a wallet-app on your phone you can insert a link from your desktop-wallet instead.</Fieldset.Legend>
                <Textfield
                  style={{ paddingTop: "20px" }}
                  type={'did' as any}
                  data-size="md"
                  label="Your DID address"
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
      </main>
    </>
  )
}

export default StartPage