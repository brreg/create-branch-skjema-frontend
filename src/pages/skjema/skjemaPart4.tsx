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
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Form for Norwegian registered foreign business enterprise( NUF) for registration in the Central Coordinating Register for Legal Entities, the Register of Business Enterprises, NAV Aa register, The Business Register of Statistics Norway and the Corporate Taxation Data Register.  All fields must be filled out. </p>
        <SkjemaProgressBar page={4} />
      </section>
      <hr className='horisontal-divider' />
      <span className='span-text'>Sign the form with a digital ID to complete the registration</span>
      <div className='line-sign-section'>
        <section className='sign-section'>
          <h3>Use BankID to sign the registration form</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus.</p>
          <Button onClick={() => navigate("/thanks")}>Sign with BankID</Button>
        </section>
        <section className='sign-section'>
          <h3>Save and continue later</h3>
          <p>Your session wil only last for 24 hours, press the button below to permanently store the application, and continue at a later time</p>
          <Button onClick={() => navigate("/thanks")}>Save application</Button>
        </section>
      </div>
      <div className="button-group">
        <Button type="button" variant='tertiary' onClick={() => prevPage()}>Forrige</Button>
      </div>
    </main>
  )
}