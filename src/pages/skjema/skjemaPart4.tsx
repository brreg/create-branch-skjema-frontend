import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Button } from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router';
// import { getCookie } from '../../context/Cookie';


interface Props {
  prevPage: () => void;
}


export default function SkjemaPage4({ prevPage }: Props) {
  const navigate = useNavigate();
  // const existingCookie = getCookie();

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header' style={{ marginBottom: '20px' }}>Complete your registration</h1>
        <SkjemaProgressBar page={4} />
      </section>
      <hr className='horisontal-divider' />
      <span className='span-text'>Sign the form with a digital ID to complete the registration</span>
      <div className='line-sign-section'>
        <section className='sign-section'>
          <h3>Use BankID to sign the registration form</h3>
          <div className="button-container">
            <Button onClick={() => navigate("/thanks")}>Sign with BankID</Button>
          </div>
        </section>
        <section className='sign-section'>
          <h3>Sign the registration form with your Personal Wallet</h3>
          <div className="button-container">
            <Button onClick={() => navigate("/signWithNpid")}>Sign with NPID</Button>
          </div>
        </section>
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