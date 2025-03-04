import SkjemaProgressBar from '../../components/skjema/progressBar';
import { Button, Checkbox, Combobox, Fieldset, Textfield } from '@digdir/designsystemet-react';
import { getCookie, updateFormData } from '../../context/Cookie';
import { useFormik } from 'formik';
import naceCodesData from '../../data/naceCodes.json';

interface Props {
  nextPage: () => void;
  prevPage: () => void;
}

export default function SkjemaPage3({ nextPage, prevPage }: Props) {

  const existingCookie = getCookie();

  const formik = useFormik({
    initialValues: {
      norskForetaksNavn: existingCookie?.formData?.foretakNavn + " NUF" || '',
      harFilialINorge: existingCookie?.formData?.harFilialINorge || false,
      filialAdresse: existingCookie?.formData?.filialAdresse || '',
      filialPostnummer: existingCookie?.formData?.filialPostnummer || '',
      filialPoststed: existingCookie?.formData?.filialPoststed || '',
      filialTelefonnummer: existingCookie?.formData?.filialTelefonnummer || '',
      filialWebPageUrl: existingCookie?.formData?.filialWebPageUrl || '',
      representantFnr: existingCookie?.formData?.representantFnr || '',
      representantNavn: existingCookie?.formData?.representantNavn || '',
      representantAdresse: existingCookie?.formData?.representantAdresse || '',
      representantPostnummer: existingCookie?.formData?.representantPostnummer || '',
      representantPoststed: existingCookie?.formData?.representantPoststed || '',
      filialNaceKode1: existingCookie?.formData?.filialNaceKode1 || '',
      filialNaceKode2: existingCookie?.formData?.filialNaceKode2 || '',
      filialNaceKode3: existingCookie?.formData?.filialNaceKode3 || '',
      filialNaceKode: [],
    },
    onSubmit: (values) => {
      update(values);
      nextPage();
    },
  });

  const handlePrevious = () => {
    update(formik.values);
    prevPage();
  };

  function update(values: any) {
    let nace1 = ''
    let nace2 = ''
    let nace3 = ''
    if (values.filialNaceKode.length > 0) {
      nace1 = values.filialNaceKode[0]
    }
    if (values.filialNaceKode.length > 1) {
      nace2 = values.filialNaceKode[1]
    }
    if (values.filialNaceKode.length > 2) {
      nace3 = values.filialNaceKode[2]
    }
    updateFormData({
      norskForetaksNavn: values.norskForetaksNavn,
      harFilialINorge: !!values.harFilialINorge,
      filialAdresse: values.filialAdresse,
      filialPostnummer: values.filialPostnummer,
      filialPoststed: values.filialPoststed,
      filialTelefonnummer: values.filialTelefonnummer,
      filialWebPageUrl: values.filialWebPageUrl,
      representantFnr: values.representantFnr,
      representantNavn: values.representantNavn,
      representantAdresse: values.representantAdresse,
      representantPostnummer: values.representantPostnummer,
      representantPoststed: values.representantPoststed,
      filialNaceKode1: nace1,
      filialNaceKode2: nace2,
      filialNaceKode3: nace3,
    });
  }

  return (
    <main className="main-content">
      <section className="info-section">
        <h1 className='info-header'>Complete your registration</h1>
        <p className='info-paragraph'>Form for Norwegian registered foreign business enterprise( NUF) for registration in the Central Coordinating Register for Legal Entities, the Register of Business Enterprises, NAV Aa register, The Business Register of Statistics Norway and the Corporate Taxation Data Register.  All fields must be filled out. </p>
        <SkjemaProgressBar page={3} />
      </section>
      <hr className='horisontal-divider' />
      <form onSubmit={formik.handleSubmit}>
        <Fieldset
          legend="Information about the enterprise's operations in Norway"
        >
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="The enterprise's complete business name in Norway"
              name="norskForetaksNavn"
              value={formik.values.norskForetaksNavn}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
        </Fieldset>

        <hr className='horisontal-divider' />

        <Fieldset
          legend="Address in Norway"
        >
          <div className='input-boxes-horisontal'>

            <Checkbox
              checked={formik.values.harFilialINorge as boolean}
              onClick={(e) => formik.setFieldValue('harFilialINorge', e.currentTarget.checked)}
              value={formik.values.norskForetaksNavn}
            >
              The enterprise has no premises in Norway
            </Checkbox>
          </div>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="Street, building number or place"
              name="filialAdresse"
              value={formik.values.filialAdresse}
              onChange={formik.handleChange}
              disabled={formik.values.harFilialINorge}
              required
            />
            <div className='main-size-input-box'>
              <div className='input-boxes-horisontal-uten-maring'>
                <Textfield
                  label="Postal code"
                  style={{ marginRight: "20px" }}
                  name="filialPostnummer"
                  value={formik.values.filialPostnummer}
                  onChange={formik.handleChange}
                  disabled={formik.values.harFilialINorge}
                  required
                />
                <Textfield
                  label="Postal district"
                  name="filialPoststed"
                  value={formik.values.filialPoststed}
                  onChange={formik.handleChange}
                  disabled={formik.values.harFilialINorge}
                  required
                />
              </div>
            </div>
          </div>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="Mobile phone number"
              name="filialTelefonnummer"
              value={formik.values.filialTelefonnummer}
              onChange={formik.handleChange}
              disabled={formik.values.harFilialINorge}
              required
            />
            <Textfield
              className='main-size-input-box'
              label="Website"
              name="filialWebPageUrl"
              value={formik.values.filialWebPageUrl}
              onChange={formik.handleChange}
              disabled={formik.values.harFilialINorge}
              required
            />
          </div >
        </Fieldset>

        <hr className='horisontal-divider' />

        <Fieldset
          legend="General manager, contact person or business manager"
        >
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="National identification no./d-number (11 digits)"
              name="representantFnr"
              value={formik.values.representantFnr}
              onChange={formik.handleChange}
              readOnly
            />
            <Textfield
              className='main-size-input-box'
              label="Name"
              name="representantNavn"
              value={formik.values.representantNavn}
              onChange={formik.handleChange}
              readOnly
            />
          </div>
          <div className='input-boxes-horisontal'>
            <Textfield
              className='main-size-input-box'
              label="Adress"
              name="representantAdresse"
              value={formik.values.representantAdresse}
              onChange={formik.handleChange}
              readOnly
            />
            <div className='main-size-input-box'>
              <div className='input-boxes-horisontal-uten-maring'>
                <Textfield
                  className='smal-input-box'
                  label="Postal code"
                  style={{ marginRight: "20px" }}
                  name="filialPostnummer"
                  value={formik.values.representantPostnummer}
                  onChange={formik.handleChange}
                  readOnly
                />
                <Textfield
                  className='smal-input-box'
                  label="Postal district"
                  name="filialPoststed"
                  value={formik.values.representantPoststed}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>
        </Fieldset>

        <hr className='horisontal-divider' />

        <Fieldset
          legend="Add company activity/industry"
        >
          <div className='input-boxes-horisontal'>
            <Combobox
              className='main-size-input-box'
              label="Add industry"
              value={formik.values.filialNaceKode}
              multiple
              onValueChange={(data) => {
                formik.setFieldValue('filialNaceKode', data)
              }}
              virtual
              placeholder={formik.values.filialNaceKode?.length === 0 ? "Search by NACE code or start typing" : undefined}
            >
              {
                naceCodesData.data.map((code) => (
                  <Combobox.Option key={code.naceCode} value={code.naceCode} description={code.naceCode}>
                    {code.description}
                  </Combobox.Option>
                ))
              }
            </Combobox>
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