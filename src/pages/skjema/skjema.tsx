import './skjema.css'
import { Button, Fieldset, Textfield } from "@digdir/designsystemet-react";
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useSession } from '../../context/SessionContext';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../const';
import { SessionResponse } from '../../types/SessionResponse';
import { FormComplete } from '../../types/FormComplete';
import SkjemaPage1 from './skjemaPart1';
import SkjemaPage2 from './skjemaPart2';
import SkjemaPage3 from './skjemaPart3';
import SkjemaPage4 from './skjemaPart4';

export default function SkjemaPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1)
  // const [initialValues, setInitialValues] = useState<FormComplete | null>(null);
  const { sessionId } = useSession()

  const validationSchemas = [
    Yup.object({
      personNavn: Yup.string().required('Personnavn er påkrevd'),
      personFnr: Yup.string().required('Fødselsnummer er påkrevd'),
    }),
    Yup.object({
      foretakNavn: Yup.string().required('Foretakets navn er påkrevd'),
      foretakOrgnr: Yup.string().required('Organisasjonsnummer er påkrevd'),
    }),
    Yup.object({
      representantNavn: Yup.string().required('Representantnavn er påkrevd'),
    }),
    Yup.object({
      filialAdresse: Yup.string().required('Filial adresse er påkrevd'),
    }),
  ];

  const formik = useFormik<FormComplete>({
    initialValues: {
      personNavn: '',
      personFnr: '',
      personAdresse: '',
      personPostnummer: '',
      personPoststed: '',
      personLand: '',
      issuingAuthority: '',
      issuingAuthorityId: '',
      issuingCountry: '',
      authenticSourceName: '',
      authenticSourceID: '',
      foretakNavn: '',
      foretakOrgnr: '',
      foretakOrgform: '',
      foretakStiftet: '',
      foretakAdresse: '',
      foretakNaceKode: '',
      foretakNaceBeskrivelse: '',
      foretakAktive: '',
      foretakTelefonnummer: '',
      foretakWebPageUrl: '',
      representantNavn: '',
      representantFodselsdato: '',
      representantSignaturRegel: '',
      norskForetaksNavn: '',
      harFilialINorge: false,
      filialAdresse: '',
      filialPostnummer: '',
      filialPoststed: '',
      filialTelefonnummer: '',
      filialWebPageUrl: '',
      filialNaceKode1: '',
      filialNaceKode2: '',
      filialNaceKode3: '',
    },
    validationSchema: validationSchemas[step - 1],
    onSubmit: values => {
      console.log("hello")
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const getStoredData = () => {
  //   const storedData = localStorage.getItem('formData');
  //   return storedData ? JSON.parse(storedData) : null;
  // };

  useEffect(() => {
    getSessionData();
  }, [sessionId])

  const getSessionData = async () => {
    try {
      if (sessionId) {
        const response = await fetch(backendUrl + "/api/session", {
          headers: {
            "x-session-id": sessionId
          }
        })
        if (response.status === 200) {
          console.log("Data funnet i /api/session");
          const sessionData: SessionResponse = await response.json();
          formik.setValues({
            ...formik.values,
            personNavn: sessionData.personNavn,
            personFnr: sessionData.personFnr,
            personAdresse: sessionData.personAdresse,
            personPostnummer: sessionData.personPostnummer,
            personPoststed: sessionData.personPoststed,
            personLand: sessionData.personLand,

            issuingAuthority: sessionData.issuingAuthority,
            issuingAuthorityId: sessionData.issuingAuthorityId,
            issuingCountry: sessionData.issuingCountry,
            authenticSourceName: sessionData.authenticSourceName,
            authenticSourceID: sessionData.authenticSourceID,

            foretakNavn: sessionData.foretakNavn,
            foretakOrgnr: sessionData.foretakOrgnr,
            foretakOrgform: sessionData.foretakOrgform,
            foretakStiftet: sessionData.foretakStiftet,
            foretakAdresse: sessionData.foretakAdresse,
            foretakNaceKode: sessionData.foretakNaceKode,
            foretakNaceBeskrivelse: sessionData.foretakNaceBeskrivelse,
            foretakAktive: sessionData.foretakAktive,
            foretakTelefonnummer: '',
            foretakWebPageUrl: '',

            representantNavn: sessionData.representantNavn,
            representantFodselsdato: sessionData.representantFodselsdato,
            representantSignaturRegel: sessionData.representantSignaturRegel,

            norskForetaksNavn: '',
            harFilialINorge: false,
            filialAdresse: '',
            filialPostnummer: '',
            filialPoststed: '',
            filialTelefonnummer: '',
            filialWebPageUrl: '',
            filialNaceKode1: '',
            filialNaceKode2: '',
            filialNaceKode3: '',
          })
        }

        if (response.status === 204) {
          console.log("Ingen data funnet i /api/session");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Feil ved henting av data for sesjon: ", error);
    }
  }

  // const nextPage = () => { setStep((prev) => prev + 1) }

  const nextPage = async () => {
    try {
      await validationSchemas[step - 1].validate(formik.values, { abortEarly: false });
      setStep((prev) => prev + 1);
    } catch (error: any) {
      console.warn('Valideringsfeil på siden:', error.errors);
      formik.setErrors(error.inner.reduce((acc: any, currentError: any) => {
        acc[currentError.path] = currentError.message;
        return acc;
      }, {}));
    }
  };

  const prevPage = () => { setStep((prev) => prev - 1) }

  // const nextPage = (validateForm: Function, values: FormComplete) => {
  //   validateForm().then((errors: any) => {
  //     if (Object.keys(errors).length === 0) {
  //       localStorage.setItem('formData', JSON.stringify(values)); // Lagre skjema-data
  //       setStep((prev) => prev + 1);
  //     }
  //   });
  // };

  // const prevPage = (validateForm: Function, values: FormComplete) => {
  //   validateForm().then((errors: any) => {
  //     if (Object.keys(errors).length === 0) {
  //       localStorage.setItem('formData', JSON.stringify(values)); // Lagre skjema-data
  //       setStep((prev) => prev - 1);
  //     }
  //   });
  // };

  // if (!formik) {
  //   return (
  //     <p>loading..</p>
  //   )
  // }

  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 1 && <SkjemaPage1 formik={formik} />}
      {step === 2 && <SkjemaPage2 formik={formik} />}
      {step === 3 && <SkjemaPage3 formik={formik} />}
      {step === 4 && <SkjemaPage4 formik={formik} />}

      <div>
        {step > 1 && <Button type='button' onClick={prevPage}>Forrige</Button>}
        {step < 4 ? (
          <Button type='button' onClick={nextPage}>Neste</Button>
        ) : (
          <Button type="submit">Send inn</Button>
        )}
      </div>
    </form>
  )

  // return (
  //   <>
  //     <main>
  //       <form onSubmit={formik.handleSubmit}>
  //         <div className='fieldset'>
  //           <Fieldset legend="Informasjon om virksomheten i hjemlandet" className='fieldset'>
  //             <div className='horisontal'>
  //               <Textfield
  //                 label="Navn"
  //                 name="orgInfo.navn"
  //                 value={formik.values.orgInfo.navn}
  //                 onChange={formik.handleChange}
  //                 readOnly={true}
  //                 htmlSize={80}
  //                 className='textfield'
  //                 required
  //               />
  //               <Textfield
  //                 label="Orgnr"
  //                 name="orgInfo.orgnr"
  //                 value={formik.values.orgInfo.orgnr}
  //                 onChange={formik.handleChange}
  //                 readOnly={true}
  //                 htmlSize={10}
  //                 className='textfield'
  //                 required
  //               />
  //             </div>
  //             <AdresseField
  //               prefix="orgInfo"
  //               readOnly={true}
  //               formik={formik}
  //               adresse={formik.values.orgInfo.adresse}
  //               postnummer={formik.values.orgInfo.postnummer}
  //               poststed={formik.values.orgInfo.poststed}
  //             />
  //           </Fieldset>
  //         </div>

  //         <Fieldset legend="Informasjon om det norske foretaket" className='fieldset'>
  //           <div className='horisontal'>
  //             <Textfield
  //               label="Navn"
  //               name="nyttForetakInfo.navn"
  //               value={formik.values.nyttForetakInfo.navn}
  //               onChange={formik.handleChange}
  //               htmlSize={80}
  //               className='textfield'
  //               required
  //             />
  //           </div>
  //           <AdresseField
  //             prefix="nyttForetakInfo"
  //             readOnly={false}
  //             formik={formik}
  //             adresse={formik.values.nyttForetakInfo.adresse}
  //             postnummer={formik.values.nyttForetakInfo.postnummer}
  //             poststed={formik.values.nyttForetakInfo.poststed}
  //           />
  //         </Fieldset>

  //         <InputPersonInfo
  //           legend="Daglig leder"
  //           prefix="dagligLeder"
  //           readOnly={false}
  //           formik={formik}
  //           initialValues={formik.values.dagligLeder}
  //         />

  //         <InputPersonInfo
  //           legend="Personer med signaturrett"
  //           prefix="signaturrett"
  //           readOnly={true}
  //           formik={formik}
  //           initialValues={formik.values.signaturrett}
  //         />

  //         <Button className='button' type="submit">Send inn</Button>
  //       </form>
  //     </main >
  //   </>
  // );
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
