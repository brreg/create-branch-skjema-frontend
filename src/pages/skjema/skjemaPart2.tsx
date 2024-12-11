import { Field, ErrorMessage } from 'formik';
import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Textfield } from '@digdir/designsystemet-react';

export default function SkjemaPage2({ formik }: { formik: any }) {
  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Form for Norwegian registered foreign business enterprise( NUF) for registration in the Central Coordinating Register for Legal Entities, the Register of Business Enterprises, NAV Aa register, The Business Register of Statistics Norway and the Corporate Taxation Data Register.  All fields must be filled out. </p>
        <SkjemaProgressBar page={2} />
      </section>
      <hr className='horisontal-divider' />
      <section>
        <Textfield
          name='personNavn'
          value={formik.values.personNavn}
          onChange={formik.handleChange}
          required
        />
      </section>
    </main>
  )
}