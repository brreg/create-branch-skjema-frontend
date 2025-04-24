import './skjema.css'
import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Button } from '@digdir/designsystemet-react';
import { getCookie } from '../../context/Cookie';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import { backendUrl } from '../../const';
import { FormResponse } from '../../types/FormResponseToAPI';

interface Props {
  prevPage: () => void;
}

export default function SkjemaPage4({ prevPage }: Props) {
  const navigate = useNavigate();
  const { sessionId } = useSession();
  const existingCookie = getCookie();

  const handleSubmitForm = async (navigateTo: string) => {
    try {
      if (!sessionId || !existingCookie?.formData) {
        console.error("Missing session ID or form data");
        return;
      }

      const formData: FormResponse = {
        foretakTelefonnummer: existingCookie.formData.foretakTelefonnummer || '',
        foretakWebPageUrl: existingCookie.formData.foretakWebPageUrl || '',
        norskForetaksNavn: existingCookie.formData.norskForetaksNavn || '',
        harFilialINorge: existingCookie.formData.harFilialINorge || false,
        filialAdresse: existingCookie.formData.filialAdresse || '',
        filialPostnummer: existingCookie.formData.filialPostnummer || '',
        filialPoststed: existingCookie.formData.filialPoststed || '',
        filialTelefonnummer: existingCookie.formData.filialTelefonnummer || '',
        filialWebPageUrl: existingCookie.formData.filialWebPageUrl || '',
        filialNaceKode1: existingCookie.formData.filialNaceKode1 || '',
        filialNaceKode2: existingCookie.formData.filialNaceKode2 || '',
        filialNaceKode3: existingCookie.formData.filialNaceKode3 || '',
      };

      const response = await fetch(backendUrl + "/api/sendinn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      navigate(navigateTo);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header' style={{ marginBottom: '20px' }}>Complete your registration</h1>
        <SkjemaProgressBar page={4} />
      </section>
      <hr className='horisontal-divider' />
      <span className='span-text'>Sign the form with a digital ID to complete the registration</span>
      <p>You can sign the registration form with your wallet-app or use BankID if you want to use the wallet-app, you will have to scan a QR code.</p>

      <div className="signing-buttons">
        <Button onClick={() => handleSubmitForm("/signWithNpid")}>Sign with wallet-app</Button>
        <Button onClick={() => handleSubmitForm("/thanks")}>Sign with BankID</Button>
      </div>

      <div className='line-sign-section'>
        <section className='sign-section'>
          <h3>Save and continue later</h3>
          <p>The session is valid for 24 hours and must be completed to avoid restarting the registration process.</p>
          <div className="button-container">
            <Button onClick={() => navigate("/thanks")}>Save application</Button>
          </div>
        </section>
      </div>
      <div className="button-group">
        <Button type="button" variant='tertiary' onClick={() => prevPage()}>Previous</Button>
      </div>
    </main>
  )
}