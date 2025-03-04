import { Button, Textfield } from '@digdir/designsystemet-react';
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import './portal.css'
import Header from '../components/header'

export default function PortalPage() {
  const navigate = useNavigate();

  return(
    <>
      <Header />
      <main className='main'>
        <div className='portal'>
          <h1>Search for service- European single digital gateway</h1>
          <p>Search or use dropdown to see all our service options.</p>
          <div className='search'>
            <Textfield
              className='search-input'
              size="medium"
            />
            <Button
              className='search-button'
              variant="primary"
            >
              Search
              <MagnifyingGlassIcon title="search" fontSize="1.5rem" />
            </Button>
          </div>
        </div>

        <div className='result' onClick={() => navigate("/start")}>
          <h2>Create branch - Norway</h2>
          <p>Register as a NUF(Norwegian registered foreign business) to recive an organisasion number.</p>
          <Button variant="primary">Go to service</Button>
        </div>
      </main>
    </>
  )
}