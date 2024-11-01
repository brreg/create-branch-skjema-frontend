import React from 'react';
import Header from "@/components/header";
import { Button, Fieldset, Textfield } from "@digdir/designsystemet-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/skjema.module.css';
import { useRouter } from 'next/router';

export default function Skjema() {
  const router = useRouter()

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
      router.push("/thanks")
    },
  });

  return (
    <>
      <Header />
      <main>
        <form onSubmit={formik.handleSubmit}>
          <Fieldset legend="Informasjon om virksomheten i hjemlandet" className={styles.fieldset}>
            <div className={styles.horisontal}>
              <Textfield
                label="Navn"
                name="orgInfo.navn"
                value={formik.values.orgInfo.navn}
                onChange={formik.handleChange}
                readOnly={true}
                htmlSize={40}
                className={styles.textfield}
                required
              />
              <Textfield
                label="Orgnr"
                name="orgInfo.orgnr"
                value={formik.values.orgInfo.orgnr}
                onChange={formik.handleChange}
                readOnly={true}
                htmlSize={40}
                className={styles.textfield}
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

          <Fieldset legend="Informasjon om det norske foretaket" className={styles.fieldset}>
            <div className={styles.horisontal}>
              <Textfield
                label="Navn"
                name="nyttForetakInfo.navn"
                value={formik.values.nyttForetakInfo.navn}
                onChange={formik.handleChange}
                htmlSize={80}
                className={styles.textfield}
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

          <Button className={styles.button} type="submit">Send inn</Button>
        </form>
      </main>
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
    <div className={styles.horisontal}>
      <Textfield
        label="Adresse"
        name={`${prefix}.adresse`}
        value={formik.values[prefix].adresse}
        onChange={formik.handleChange}
        readOnly={readOnly}
        htmlSize={40}
        className={styles.textfield}
        required
      />
      <div className={styles.horisontal}>
        <Textfield
          label="Postnummer"
          name={`${prefix}.postnummer`}
          value={formik.values[prefix].postnummer}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={15}
          className={styles.textfield}
          required
        />
        <Textfield
          label="Poststed"
          name={`${prefix}.poststed`}
          value={formik.values[prefix].poststed}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={20}
          className={styles.textfield}
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
    <Fieldset legend={legend} className={styles.fieldset}>
      <div className={styles.horisontal}>
        <Textfield
          label="Navn"
          name={`${prefix}.navn`}
          value={formik.values[prefix].navn}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
          required
        />
        <Textfield
          label="Fnr"
          name={`${prefix}.fnr`}
          value={formik.values[prefix].fnr}
          onChange={formik.handleChange}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
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
