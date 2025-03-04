import './testdata.css'
import { Button } from '@digdir/designsystemet-react'
import { useNavigate, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { backendUrl } from '../const'
import { QRCodeSVG } from 'qrcode.react'
import Header from '../components/header'
import { DeleteCookie, CreateCookieIfMissing } from '../context/Cookie'

export default function TestdataPage() {
  const [euccUri, setEuccUri] = useState<string | null>(null);
  const [npidUri, setNpidUri] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const buttonContent = queryParams.get('button');

  useEffect(() => {
    if (buttonContent) {
      // API call to get EUCC URI with buttonContent as a parameter
      fetch(`${backendUrl}/api/testdata/qrcodeEucc?button=${encodeURIComponent(buttonContent)}`)
        .then(response => response.json())
        .then(data => setEuccUri(data.didcommUri))
        .catch(error => console.error("Error fetching EUCC URI:", error));

      // API call to get NPID URI with buttonContent as a parameter
      fetch(`${backendUrl}/api/testdata/qrcodeNpid?button=${encodeURIComponent(buttonContent)}`)
        .then(response => response.json())
        .then(data => setNpidUri(data.didcommUri))
        .catch(error => console.error("Error fetching NPID URI:", error));
    }
  }, [buttonContent]);

  const handleButtonClick = (buttonContent: string) => {
    navigate(`/testdata?button=${encodeURIComponent(buttonContent)}`);
  };

  const handleBackToStart = () => {
    DeleteCookie();
    CreateCookieIfMissing();
    window.location.href = "/start";
  };

  return(
    <>
      <Header />
      <main className='main'>
        {buttonContent && (
          <>
            <h1>Demo credentials Issued</h1>
            <div className='qr-code-container'>
              {euccUri && (
                <div>
                  <QRCodeSVG value={euccUri} />
                  <p>EUCC</p>
                </div>
              )}
              {npidUri && (
                <div>
                  <QRCodeSVG value={npidUri} />
                  <p>NPID</p>
                </div>
              )}
            </div>
          </>
        )}
        <div className='button-container'>
          <Button className='button' onClick={() => handleButtonClick("Ola Norman")}>Ola Norman</Button>
          <Button className='button' onClick={() => handleButtonClick("Kari Norman")}>Kari Norman</Button>
          <Button className='button' onClick={() => handleButtonClick("UTNYTTENDE ÆRFUGL")}>UTNYTTENDE ÆRFUGL</Button>
          <Button className='button' onClick={() => handleButtonClick("UTØRST KLINKEKULE")}>UTØRST KLINKEKULE</Button>
          <Button className='button' onClick={() => handleButtonClick("VIRTUELL PERSEPSJON")}>VIRTUELL PERSEPSJON</Button>
        </div>
        <Button className='last-button' onClick={handleBackToStart}>Back to Start</Button>
      </main>
    </>
  )
}