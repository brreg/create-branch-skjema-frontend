import './signWithNpid.css';
import { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';
import { backendWebsocketUrl, backendUrl } from '../const';
import { QRCodeSVG } from 'qrcode.react';
import { Fieldset } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
import Header from '../components/header';
import { Button } from "@digdir/designsystemet-react";
import { DeleteCookie, CreateCookieIfMissing } from '../context/Cookie';

Object.assign(global, { WebSocket });

export default function SignWithNpidPage() {
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState("");
  const { sessionId } = useSession();
  

  const stompClient = new Client({
    brokerURL: backendWebsocketUrl + "/ws"
  });

  stompClient.onConnect = () => {
    console.log('STOMP connected');
    stompClient.subscribe(`/topic/sessions/${sessionId}_signed`, (message) => {
      console.log("Data mottatt: ", message.body);
      navigate("/thanks");
    });
  };

  stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  stompClient.onDisconnect = () => {
    console.log("STOMP disconnected");
  };

  useEffect(() => {
    stompClient.activate();
    checkIfSessionHasData();

      fetchQrLink();

    return () => {
      stompClient.deactivate();
    };
  }, [sessionId]);

  const checkIfSessionHasData = async () => {
    try {
      if (sessionId) {
        const response = await fetch(backendUrl + "/api/session", {
          headers: {
            "x-session-id": sessionId
          }
        });
        if (response.status === 200) {
          console.log("data found in /api/session");
        }

        if (response.status === 204) {
          console.log("no data found in /api/session");
          navigate("/start")
        }
      }
    } catch (error) {
      console.error("Error fetching data for session: ", error);
    }
  };

  const fetchQrLink = async () => {
    try {
      if (sessionId) {
        const response = await fetch(backendUrl + "/api/qrcodeNpid", {
          method: "POST",
          headers: {
            "x-session-id": sessionId
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch QR link");
        }

        const data = await response.json();
        console.log("received data from /api/qrcodeNpid");
        setQrLink(data.didcommUri);
      }
    } catch (error) {
      console.error("Error fetching QR link:", error);
    }
  };

  const handleBackToStart = () => {
    DeleteCookie();
    CreateCookieIfMissing();
    window.location.href = "/start";
  };

  return (
    <>
      <Header />
      <div className="main" >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>Scan the QR code with your wallet to sign for this application</h1>
        </div>
        <div className="sign_with_qr_kode" style={{ display: 'flex', justifyContent: 'center' }}>
          <Fieldset>
            <Fieldset.Legend>NPID request</Fieldset.Legend>
            <div style={{ paddingTop: "20px" }}>
              {qrLink === "" ? (
                <div className='loader'>
                  <HashLoader />
                </div>
              ) : (
                <QRCodeSVG value={qrLink} className='qrimage' />
              )}
            </div>
          </Fieldset>
        </div>
        <div className="button-container">
          <Button onClick={handleBackToStart}>Back to Start</Button>
        </div>
      </div>
    </>
  );
}