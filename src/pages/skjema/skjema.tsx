import './skjema.css'
import { useNavigate } from "react-router";
import { useSession } from '../../context/SessionContext';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../const';
import { SessionResponse } from '../../types/SessionResponse';
import SkjemaPage1 from './skjemaPart1';
import SkjemaPage2 from './skjemaPart2';
import SkjemaPage3 from './skjemaPart3';
import SkjemaPage4 from './skjemaPart4';
import { storeFormDataInCookie } from '../../context/Cookie';
import Header from '../../components/header';

export default function SkjemaPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1)
  const [ready, setReady] = useState(false)
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

          storeFormDataInCookie({
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

            representantNavn: sessionData.personNavn,
            representantFnr: sessionData.personFnr,
            representantAdresse: sessionData.personAdresse,
            representantPostnummer: sessionData.personPostnummer,
            representantPoststed: sessionData.personPoststed,
          })

          setReady(true)
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

  const nextPage = () => { setStep((prev) => prev + 1) }
  const prevPage = () => { setStep((prev) => prev - 1) }

  if (!ready) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <>
      <Header />
      {step === 1 && <SkjemaPage1 nextPage={nextPage} />}
      {step === 2 && <SkjemaPage2 nextPage={nextPage} prevPage={prevPage} />}
      {step === 3 && <SkjemaPage3 nextPage={nextPage} prevPage={prevPage} />}
      {step === 4 && <SkjemaPage4 prevPage={prevPage} />}

    </>
  )
}