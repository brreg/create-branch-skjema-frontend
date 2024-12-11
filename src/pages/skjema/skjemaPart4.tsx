import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Button } from '@digdir/designsystemet-react';
// import { getCookie } from '../../context/Cookie';


interface Props {
  prevPage: () => void;
}

export default function SkjemaPage4({ prevPage }: Props) {
  // const existingCookie = getCookie();

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Form for Norwegian registered foreign business enterprise( NUF) for registration in the Central Coordinating Register for Legal Entities, the Register of Business Enterprises, NAV Aa register, The Business Register of Statistics Norway and the Corporate Taxation Data Register.  All fields must be filled out. </p>
        <SkjemaProgressBar page={4} />
      </section>
      <hr className='horisontal-divider' />
        <h2>Her kommer det løsning for signering snart</h2>
        <div className="button-group">
          <Button type="button" variant='tertiary' onClick={() => prevPage()}>Forrige</Button>
        </div>
    </main>
  )
}