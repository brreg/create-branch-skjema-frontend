import Header from "../components/header";
import CSS from "csstype";
import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { backendUrl } from '../const';
import { Button } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const mainStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '10em'
};



const qrCodeContainerStyle: CSS.Properties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%'
};

const buttonContainerStyle: CSS.Properties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1em', // Adds space between buttons
  marginTop: '2em'
};

const buttonStyle: CSS.Properties = {
  padding: '0.5em 1em',
  fontSize: '1em',
  cursor: 'pointer'
};

const lastButtonStyle: CSS.Properties = {
  ...buttonStyle,
  marginTop: '3em' // Adjust this value to add more space
};

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

  return(
    <>
      <Header />
      <main style={mainStyle}>
        {buttonContent && (
        <div style={qrCodeContainerStyle}>
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
        )}
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle} onClick={() => handleButtonClick("USELVISK JEGER")}>Ola Norman</Button>
          <Button style={buttonStyle} onClick={() => handleButtonClick("FORMBAR OPPORTUNIST")}>Kari Norman</Button>
          <Button style={buttonStyle} onClick={() => handleButtonClick("UTNYTTENDE ÆRFUGL")}>UTNYTTENDE ÆRFUGL</Button>
          <Button style={buttonStyle} onClick={() => handleButtonClick("UTØRST KLINKEKULE")}>UTØRST KLINKEKULE</Button>
          <Button style={buttonStyle} onClick={() => handleButtonClick("VIRTUELL PERSEPSJON")}>VIRTUELL PERSEPSJON</Button>
        </div>
        <Button style={lastButtonStyle} onClick={() => navigate("/start")}>Back to Start</Button>
      </main>
    </>
  )
}