import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import './thanks.css'
import { Button, Fieldset } from "@digdir/designsystemet-react";
import { useEffect, useRef, useState } from 'react';
import { useSession } from '../context/SessionContext';
import { backendUrl } from '../const';
import { HashLoader } from 'react-spinners';
import { QRCodeSVG } from 'qrcode.react';

export default function ThanksPage() {
  const navigate = useNavigate();
const [qrLink, setQrLink] = useState("");
  const hasFetchedQrLink = useRef(false);
    const { sessionId } = useSession();
  
  


    useEffect(() => {
        fetchQrLink();

    // Only call fetchQrLink if it hasn't been called yet
    if (!hasFetchedQrLink.current) {
        hasFetchedQrLink.current = true;
    }

    return () => {};
    }, [sessionId]);


    const fetchQrLink = async () => {
        try {
          if (sessionId) {
            const response = await fetch(backendUrl + "/api/qrcodeRecite", {
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

  return (
  <>
    <Header />
    <div className="thank-you">
      <h1>Thank you for your application</h1>
      <p>You are now registered in the Business Register. Scan the following QR code to receive a Proof of Registered Branch in your wallet.</p>

      <div className="sign_with_qr_kode" style={{ display: 'flex', justifyContent: 'center' }}>
        <Fieldset legend="Recite for Proof of Registration">
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
      <div className="button-container" style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate("/start")}>Register new branch</Button>
      </div>
    </div>
  </>
  )
}