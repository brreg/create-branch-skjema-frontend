import './skjema.css'
import SkjemaProgressBar from "../../components/skjema/progressBar";
import { Button, Fieldset, Textfield } from '@digdir/designsystemet-react';
import { getCookie, updateFormData } from '../../context/Cookie';
import { useFormik } from 'formik';

export default function SkjemaPage1({ nextPage }: { nextPage: any }) {
  const existingCookie = getCookie();

  const formik = useFormik({
    initialValues: {
      personNavn: existingCookie?.formData?.personNavn || '',
      personAdresse: existingCookie?.formData?.personAdresse || '',
      personTelefonnummer: existingCookie?.formData?.personTelefonnummer || '',
      personPostnummer: existingCookie?.formData?.personPostnummer || '',
      personPoststed: existingCookie?.formData?.personPoststed || '',
      personLand: existingCookie?.formData?.personLand || '',
    },
    onSubmit: (values) => {
      updateFormData({
        personNavn: values.personNavn,
        personAdresse: values.personAdresse,
        personPostnummer: values.personPostnummer,
        personPoststed: values.personPoststed,
        personLand: values.personLand,
      });
      nextPage();
    },
  });

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Form for Norwegian registered foreign business enterprise( NUF) for registration in the Central Coordinating Register for Legal Entities, the Register of Business Enterprises, NAV Aa register, The Business Register of Statistics Norway and the Corporate Taxation Data Register.  All fields must be filled out. </p>
        <SkjemaProgressBar page={1} />
      </section>
      <hr className='horisontal-divider' />
      <form onSubmit={formik.handleSubmit}>
        <Fieldset
          legend="Submitter/person liable for fee"
          description="The person or entity submitting the form will receive the feedback related to the case, and will receive any invoice connected to the registration in The Central Coordinating Register for Legal Entities/The Register of Business Enterprises This information is prefilled based on your NPID and can not be changed."
        >
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="Name"
              name="personNavn"
              value={formik.values.personNavn}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              label="Phone number"
              name="personTelefonnummer"
              value={formik.values.personTelefonnummer}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="P.O. Box, street, house number or place"
              name="personAdresse"
              value={formik.values.personAdresse}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              style={{ marginRight: "20px" }}
              label="Postal code"
              name="personPostnummer"
              value={formik.values.personPostnummer}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              style={{ marginRight: "20px" }}
              label="Postal district"
              name="personPoststed"
              value={formik.values.personPoststed}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              label="Country"
              name="personLand"
              value={formik.values.personLand}
              onChange={formik.handleChange}
              readOnly
            />
          </div>

        </Fieldset>
        <div className="button-group">
          <Button className='next-page-button' type="submit">Neste</Button>
        </div>
      </form>
    </main>
  )
}