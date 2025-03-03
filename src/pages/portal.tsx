import CSS from "csstype";
import { Button, Textfield } from '@digdir/designsystemet-react';
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";

const mainStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '5em',
  alignItems: 'center'
};

const portalStyle: CSS.Properties = {
  padding: '3em',
  // maxWidth: '800px',
  backgroundColor: '#E5F3F9'
};

const searchStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'row'
};

const resultStyle: CSS.Properties = {
  marginTop: '2em',
  maxWidth: '700px',
  textDecoration: 'underline'
};


export default function PortalPage() {
  const navigate = useNavigate();


  return(
    <>
      <main style={mainStyle}>
        <div style={portalStyle}>
          <h1>Search for service- European single digital gateway</h1>
          <p>Search or use dropdown to see all our service options.</p>
          <div style={searchStyle}>
              <Textfield
                style={{
                  flexGrow: '1'
                }}
              />
              <Button
                style={{
                  marginLeft: '1em'
                }}
              >
                Search
                <MagnifyingGlassIcon title="a11y-title" fontSize="1.5rem" />
              </Button>
          </div>
        </div>
        <div style={resultStyle} onClick={() => navigate("/start")}>
          <h2>Create branch - Norway</h2>
          <p>Register as a NUF(Norwegian registered foreign business) to recive an organisasion number.</p>
          <Button>Go to service</Button>
        </div>
      </main>
    </>
  )
}