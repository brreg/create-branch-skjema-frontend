import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Button, Fieldset, Textfield } from '@digdir/designsystemet-react';
import { getCookie, updateFormData } from '../../context/Cookie';
import { useFormik } from 'formik';
import { QuestionmarkCircleIcon } from '@navikt/aksel-icons';

interface Props {
  nextPage: () => void;
  prevPage: () => void;
}

export default function SkjemaPage2({ nextPage, prevPage }: Props) {
  const existingCookie = getCookie();

  const formik = useFormik({
    initialValues: {
      foretakNavn: existingCookie?.formData?.foretakNavn || '',
      foretakOrgnr: existingCookie?.formData?.foretakOrgnr || '',
      foretakAdresse: existingCookie?.formData?.foretakAdresse?.split(";")[0] || '',
      foretakPostnummerOgSted: existingCookie?.formData?.foretakAdresse?.split(";").slice(1, 3).join(" ") || '',
      foretakLand: existingCookie?.formData?.foretakAdresse?.split(";")[3] || '',
      foretakTelefonnummer: existingCookie?.formData?.foretakTelefonnummer || '',
      foretakWebPageUrl: existingCookie?.formData?.foretakWebPageUrl || '',
      foretakOrgform: existingCookie?.formData?.foretakOrgform || '',
      registerNavn: existingCookie?.formData?.authenticSourceName || '',
    },
    onSubmit: (values) => {
      updateFormData({
        foretakNavn: values.foretakNavn,
        foretakOrgnr: values.foretakOrgnr,
        foretakAdresse: values.foretakAdresse + ";" + values.foretakPostnummerOgSted + ";" + values.foretakLand,
        foretakTelefonnummer: values.foretakTelefonnummer,
        foretakWebPageUrl: values.foretakWebPageUrl,
        foretakOrgform: values.foretakOrgform,
        registerNavn: values.registerNavn,
      });
      nextPage();
    },
  });

  const handlePrevious = () => {
    updateFormData({
      foretakNavn: formik.values.foretakNavn,
      foretakOrgnr: formik.values.foretakOrgnr
    });
    prevPage();
  };

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Thank you for your attestations - we have used the data in them to pre-fill the form. If you want to change the pre-filled fields you need to go to the authority that issued the attestations. There will likely be data fields that we could not fill in from the attestations, these are marked with a red *. Please fill them in to go to the next page.</p>
        <SkjemaProgressBar page={2} />
      </section>
      <hr className='horisontal-divider' />
      <form onSubmit={formik.handleSubmit}>
        <Fieldset>
          <Fieldset.Legend>Information about the business in the country of origin<QuestionmarkCircleIcon /></Fieldset.Legend>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="Complete name of the business "
              name="foretakNavn"
              value={formik.values.foretakNavn}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='main-size-input-box'
              label="State the enterprise's registration number/ID number in the country of origin"
              name="foretakOrgnr"
              value={formik.values.foretakOrgnr}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
        </Fieldset>
        <hr className='horisontal-divider' />
        <Fieldset>
          <Fieldset.Legend>Head office address in the country of origin<QuestionmarkCircleIcon /></Fieldset.Legend>
          <div className='input-boxes-horisontal'>

            <Textfield
              className='main-size-input-box '
              label="Street, building number or place"
              name="foretakAdresse"
              value={formik.values.foretakAdresse}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='main-size-input-box '
              label="Postal code and Postal district"
              name="foretakPostnummerOgSted"
              value={formik.values.foretakPostnummerOgSted}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='smal-input-box'
              label="Country"
              name="foretakLand"
              value={formik.values.foretakLand}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box '
              label="Mobile phone number"
              name="foretakTelefonnummer"
              value={formik.values.foretakTelefonnummer}
              onChange={formik.handleChange}
            />
            <Textfield
              className='main-size-input-box '
              label="Website"
              name="foretakWebPageUrl"
              value={formik.values.foretakWebPageUrl}
              onChange={formik.handleChange}
            />
          </div>
        </Fieldset>
        <hr className='horisontal-divider' />
        <Fieldset>
          <Fieldset.Legend>Type of organisation in the country of origin<QuestionmarkCircleIcon /></Fieldset.Legend>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box '
              label="Add company type"
              name="foretakOrgform"
              value={formik.values.foretakOrgform}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
        </Fieldset>
        <hr className='horisontal-divider' />
        <Fieldset>
          <Fieldset.Legend>The business register in the country of origin<QuestionmarkCircleIcon /></Fieldset.Legend>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box '
              label="Name of register"
              name="registerNavn"
              value={formik.values.registerNavn}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
        </Fieldset>
        <div className="button-group">
          <Button type="submit">Next</Button>
          <Button type="button" variant='tertiary' onClick={handlePrevious}>Previous</Button>
        </div>
      </form>
    </main>
  )
}