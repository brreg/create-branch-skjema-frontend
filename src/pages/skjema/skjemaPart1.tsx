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
      personVeiAddresse: existingCookie?.formData?.personVeiAddresse || '',
      personTelefonnummer: existingCookie?.formData?.personTelefonnummer || '',
      personPostcode: existingCookie?.formData?.personPostcode || '',
      personBy: existingCookie?.formData?.personBy || '',
      personLand: existingCookie?.formData?.personLand || '',
    },
    onSubmit: (values) => {
      updateFormData({
        personNavn: values.personNavn,
        personVeiAddresse: values.personVeiAddresse,
        personTelefonnummer: values.personTelefonnummer,
        personPostcode: values.personPostcode,
        personBy: values.personBy,
        personLand: values.personLand,
      });
      nextPage();
    },
  });

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Thank you for your attestations - we have used the data in them to pre-fill the form. If you want to change the pre-filled fields you need to go to the authority that issued the attestations. There will likely be data fields that we could not fill in from the attestations, these are marked with a red *. Please fill them in to go to the next page.</p>
        <SkjemaProgressBar page={1} />
      </section>
      <hr className='horisontal-divider' />
      <form onSubmit={formik.handleSubmit}>
        <Fieldset>
          <Fieldset.Legend>Submitter/person liable for fee</Fieldset.Legend>
          <p className='info-paragraph'>The person or entity submitting the form will receive the feedback related to the case, and will receive any invoice connected to the registration in The Central Coordinating Register for Legal Entities/The Register of Business Enterprises. This information is prefilled based on your NPID and can not be changed.</p>
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
              label={<span>Phone number <span style={{ color: 'red' }}>*</span></span>}
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
              name="personVeiAddresse"
              value={formik.values.personVeiAddresse}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              style={{ marginRight: "20px" }}
              label="Postal code"
              name="personPostcode"
              value={formik.values.personPostcode}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              style={{ marginRight: "20px" }}
              label="Postal district"
              name="personBy"
              value={formik.values.personBy}
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
          <Button className='next-page-button' type="submit">Next</Button>
        </div>
      </form>
    </main>
  )
}