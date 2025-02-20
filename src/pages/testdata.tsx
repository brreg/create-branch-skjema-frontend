import Header from "../components/header";
import CSS from "csstype";
import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { backendUrl } from '../const';
import { Button } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';

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

const buttonStyle: CSS.Properties = {
  marginTop: '2em',
  padding: '0.5em 1em',
  fontSize: '1em',
  cursor: 'pointer'
};

export default function TestdataPage() {
  const [euccUri, setEuccUri] = useState<string | null>(null);
  const [npidUri, setNpidUri] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // API call to get EUCC URI
    fetch(backendUrl +"/api/testdata/qrcodeNpid")
      .then(response => response.json())
      .then(data => setEuccUri(data.didcommUri))
      .catch(error => console.error("Error fetching EUCC URI:", error));

    // API call to get NPID URI
    fetch(backendUrl +"/api/testdata/qrcodeEucc")
      .then(response => response.json())
      .then(data => setNpidUri(data.didcommUri))
      .catch(error => console.error("Error fetching NPID URI:", error));
  }, []);

  return(
    <>
      <Header />
      <main style={mainStyle}>
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
        <Button style={buttonStyle} onClick={() => navigate("/start")}>Back to Start</Button>
      </main>
    </>
  )
}