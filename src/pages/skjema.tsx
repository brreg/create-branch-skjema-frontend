import './skjema.css'
import { Button, Fieldset, Textfield } from "@digdir/designsystemet-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useSession } from '../context/SessionContext';
import { useEffect, useState } from 'react';
import { backendUrl } from '../const';
import { SessionResponse } from '../types/SessionResponse';

export default function SkjemaPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<SessionResponse | null>(null);
  const { sessionId } = useSession()

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
          setData(sessionData);
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

  const formik = useFormik({
    initialValues: {
      orgInfo: {
        navn: data?.foretakNavn || "",
        orgnr: data?.foretakOrgnr || "",
        adresse: data?.foretakAdresse ? data.foretakAdresse.split(';')[0] : "",
        postnummer: data?.foretakAdresse ? data.foretakAdresse.split(';')[1]?.slice(0, 4) : "",
        poststed: data?.foretakAdresse ? data.foretakAdresse.split(';')[2] : "",
      },
      nyttForetakInfo: {
        navn: "",
        adresse: "",
        postnummer: "",
        poststed: "",
      },
      dagligLeder: {
        navn: data?.representantNavn || "",
        fnr: data?.personFnr || "",
        adresse: "",
        postnummer: "",
        poststed: "",
      },
      signaturrett: {
        navn: data?.representantNavn || "",
        fnr: data?.personFnr || "",
        adresse: "",
        postnummer: "",
        poststed: "",
      },
    },
    enableReinitialize: true, // VIKTIG: Tillater oppdatering av initialValues etter at data er hentet
    validationSchema: Yup.object({
      // Her kan du legge til validering ved hjelp av Yup
    }),
    onSubmit: (values) => {
      // Behandle innsending av skjemaet
      console.log("Innsendte data:", values);
      navigate("/thanks");
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        orgInfo: {
          navn: data.foretakNavn || "",
          orgnr: data.foretakOrgnr || "",
          adresse: data.foretakAdresse ? data.foretakAdresse.split(';')[0] : "",
          postnummer: data.foretakAdresse ? data.foretakAdresse.split(';')[1]?.slice(0, 4) : "",
          poststed: data.foretakAdresse ? data.foretakAdresse.split(';')[2] : "",
        },
        nyttForetakInfo: {
          navn: "",
          adresse: "",
          postnummer: "",
          poststed: "",
        },
        dagligLeder: {
          navn: data.representantNavn || "",
          fnr: data.personFnr || "",
          adresse: "",
          postnummer: "",
          poststed: "",
        },
        signaturrett: {
          navn: data.representantNavn || "",
          fnr: data.personFnr || "",
          adresse: "",
          postnummer: "",
          poststed: "",
        },
      });
    }
  }, [data]);

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
