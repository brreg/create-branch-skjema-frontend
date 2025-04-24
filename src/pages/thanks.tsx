import Header from '../components/header';
import './thanks.css'
import { Button, Fieldset } from "@digdir/designsystemet-react";
import { DeleteCookie, CreateCookieIfMissing } from '../context/Cookie';
import { useEffect, useRef, useState } from 'react';
import { backendUrl } from '../const';
import { HashLoader } from 'react-spinners';
import { QRCodeSVG } from 'qrcode.react';
import { useSession } from '../context/SessionContext';


export default function ThanksPage() {

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
        const response = await fetch(backendUrl + "/api/qrcodeReceipt", {
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

  const handleNewRegistration = () => {
    DeleteCookie();
    CreateCookieIfMissing();
    window.location.href = "/start";
  };

  return (
    <>
      <Header />
      <div className="thanks-page-container">
        <h1>Thank you for your registration</h1>
        <p>You are now registered in the Business Register and will receive a Proof of Registred Branch in your wallet.</p>
        <div className="sign_with_qr_kode" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Fieldset>
            <Fieldset.Legend>Scan this code to save a receipt of proof of registration in your wallet.</Fieldset.Legend>
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
        <Button onClick={handleNewRegistration} style={{ alignSelf: 'flex-start' }}>Register new branch</Button>
      </div>
    </>
  );
}