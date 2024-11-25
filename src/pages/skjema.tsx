import './skjema.css'
import { Button, Fieldset, Textfield } from "@digdir/designsystemet-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";

export default function SkjemaPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      orgInfo: {
        navn: "Sveriges Riksdag AB",
        orgnr: "123456789",
        adresse: "Riksgatan 1",
        postnummer: "100 12",
        poststed: "Stockholm",
      },
      nyttForetakInfo: {
        navn: "",
        adresse: "",
        postnummer: "",
        poststed: "",
      },
      dagligLeder: {
        navn: "",
        fnr: "",
        adresse: "",
        postnummer: "",
        poststed: "",
      },
      signaturrett: {
        navn: "Ola Norman",
        fnr: "11111111111",
        adresse: "Karl Johans Gate 22",
        postnummer: "0026",
        poststed: "Oslo",
      },
    },
    validationSchema: Yup.object({
      // Her kan du legge til validering ved hjelp av Yup
    }),
    onSubmit: (values) => {
      // Behandle innsending av skjemaet
      console.log("Innsendte data:", values);
      navigate("/thanks")
    },
  });

  return (
    <>
      <main>
        <form onSubmit={formik.handleSubmit}>
          <div className='fieldset'>
            <Fieldset legend="Informasjon om virksomheten i hjemlandet" className='fieldset'>
              <div className='horisontal'>
                <Textfield
                  label="Navn"
                  name="orgInfo.navn"
                  value={formik.values.orgInfo.navn}
                  onChange={formik.handleChange}
                  readOnly={true}
                  htmlSize={80}
                  className='textfield'
                  required
                />
                <Textfield
                  label="Orgnr"
                  name="orgInfo.orgnr"
                  value={formik.values.orgInfo.orgnr}
                  onChange={formik.handleChange}
                  readOnly={true}
                  htmlSize={10}
                  className='textfield'
                  required
                />
              </div>
              <AdresseField
                prefix="orgInfo"
                readOnly={true}
                formik={formik}
                adresse={formik.values.orgInfo.adresse}
                postnummer={formik.values.orgInfo.postnummer}
                poststed={formik.values.orgInfo.poststed}
              />
            </Fieldset>
          </div>

          <Fieldset legend="Informasjon om det norske foretaket" className='fieldset'>
            <div className='horisontal'>
              <Textfield
                label="Navn"
                name="nyttForetakInfo.navn"
                value={formik.values.nyttForetakInfo.navn}
                onChange={formik.handleChange}
                htmlSize={80}
                className='textfield'
                required
              />
            </div>
            <AdresseField
              prefix="nyttForetakInfo"
              readOnly={false}
              formik={formik}
              adresse={formik.values.nyttForetakInfo.adresse}
              postnummer={formik.values.nyttForetakInfo.postnummer}
              poststed={formik.values.nyttForetakInfo.poststed}
            />
          </Fieldset>

          <InputPersonInfo
            legend="Daglig leder"
            prefix="dagligLeder"
            readOnly={false}
            formik={formik}
            initialValues={formik.values.dagligLeder}
          />

          <InputPersonInfo
            legend="Personer med signaturrett"
            prefix="signaturrett"
            readOnly={true}
            formik={formik}
            initialValues={formik.values.signaturrett}
          />

          <Button className='button' type="submit">Send inn</Button>
        </form>
      </main >
    </>
  );
}

// AdresseField-komponenten
function AdresseField(props: any) {
  const {
    prefix,
    readOnly = false,
    formik,
  } = props;

  return (
    <div className='horisontal'>
      <Textfield
        label="Adresse"
        name={`${prefix}.adresse`}
        value={formik.values[prefix].adresse}
        onChange={formik.handleChange}
        readOnly={readOnly}
        htmlSize={80}
        className='textfield'
        required
      />
      <div className='horisontal'>
        <Textfield
          label="Postnummer"
          name={`${prefix}.postnummer`}
          value={formik.values[prefix].postnummer}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={10}
          className='textfield'
          required
        />
        <Textfield
          label="Poststed"
          name={`${prefix}.poststed`}
          value={formik.values[prefix].poststed}
          onChange={formik.handleChange}
          readOnly={readOnly}
          className='textfield'
          required
        />
      </div>
    </div>
  );
}

// InputPersonInfo-komponenten
function InputPersonInfo(props: any) {
  const {
    legend = "",
    prefix,
    readOnly = false,
    formik,
  } = props;

  return (
    <Fieldset legend={legend} className='fieldset'>
      <div className='horisontal'>
        <Textfield
          label="Navn"
          name={`${prefix}.navn`}
          value={formik.values[prefix].navn}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={80}
          className='textfield'
          required
        />
        <Textfield
          label="Fnr"
          name={`${prefix}.fnr`}
          value={formik.values[prefix].fnr}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={10}
          className='textfield'
          required
        />
      </div>
      <AdresseField
        prefix={prefix}
        readOnly={readOnly}
        formik={formik}
      />
    </Fieldset>
  );
}
