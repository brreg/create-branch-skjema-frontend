import Header from "@/components/header"
import { Button, Fieldset, Textfield } from "@digdir/designsystemet-react"

import styles from '@/styles/skjema.module.css'
import { useState } from "react";

export default function Skjema() {
  return (
    <>
      <Header />
      <main>
        <form>
          <InputOrgInfo
            readOnly={true}
            navn="Sveriges Riksdag AB"
            orgnr="123456789"
            adresse="Riksgatan 1"
            postnummer="100 12"
            poststed="Stockholm"
          />
          <InputNyttForetakInfo />
          <InputPersonInfo
            legend="Daglig leder"
          />
          <InputPersonInfo
            legend="Personer med signaturrett"
            readOnly={true}
            navn="Ola Norman"
            fnr="11111111111"
            adresse="Karl Johans Gate 22"
            postnummer="0026"
            poststed="Oslo"
          />
          <Button type="submit">Send inn</Button>
        </form>
      </main>
    </>
  )
}

function InputOrgInfo(props: InputOrgInfoProps) {
  const {
    readOnly = false,
    navn = "",
    orgnr = "",
    adresse = "",
    postnummer = "",
    poststed = "",
  } = props;

  const [localNavn, setLocalNavn] = useState<string>(navn);
  const [localOrgnr, setLocalOrgnr] = useState<string>(orgnr);

  return (
    <Fieldset
      legend="Informasjon om virksomheten i hjemlandet"
      className={styles.fieldset}
    >
      <div className={styles.horisontal}>
        <Textfield
          label="Navn"
          value={navn}
          onChange={(e) => setLocalNavn(e.target.value)}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
          required
        />
        <Textfield
          label="Orgnr"
          value={orgnr}
          onChange={(e) => setLocalOrgnr(e.target.value)}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
          required
        />
      </div>
      <AdresseField
        readOnly={readOnly}
        adresse={adresse}
        postnummer={postnummer}
        poststed={poststed}
      />
    </Fieldset>
  )
}

function InputNyttForetakInfo() {
  return (
    <Fieldset
      legend="Informasjon det norske foretaket"
      className={styles.fieldset}
    >
      <div className={styles.horisontal}>
        <Textfield
          label="Navn"
          htmlSize={80}
          className={styles.textfield}
          required
        />
      </div>
      <AdresseField
        readOnly={false}
      />
    </Fieldset>
  )
}

function InputPersonInfo(props: InputPersonInfoProps) {
  const {
    legend = "",
    readOnly = false,
    navn = "",
    fnr = "",
    adresse = "",
    postnummer = "",
    poststed = "",
  } = props;

  const [localNavn, setLocalNavn] = useState<string>(navn);
  const [localFnr, setLocalFnr] = useState<string>(fnr);

  return (
    <Fieldset
      legend={legend}
      className={styles.fieldset}
    >
      <div className={styles.horisontal}>
        <Textfield
          label="Navn"
          value={navn}
          onChange={(e) => setLocalNavn(e.target.value)}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
          required
        />
        <Textfield
          label="Fnr"
          value={fnr}
          onChange={(e) => setLocalFnr(e.target.value)}
          readOnly={readOnly}
          htmlSize={40}
          className={styles.textfield}
          required
        />
      </div>
      <AdresseField
        readOnly={readOnly}
        adresse={adresse}
        postnummer={postnummer}
        poststed={poststed}
      />
    </Fieldset>
  )
}

function AdresseField(props: AdresseFieldProps) {
  const {
    readOnly = false,
    adresse = "",
    postnummer = "",
    poststed = "",
  } = props;

  const [localAdresse, setLocalAdresse] = useState<string>(adresse);
  const [localPostnummer, setLocalPostnummer] = useState<string>(postnummer);
  const [localPoststed, setLocalPoststed] = useState<string>(poststed);

  return (
    <div className={styles.horisontal}>
      <Textfield
        label="Adresse"
        value={localAdresse}
        onChange={(e) => setLocalAdresse(e.target.value)}
        readOnly={readOnly}
        htmlSize={40}
        className={styles.textfield}
        required
      />
      <div className={styles.horisontal}>
        <Textfield
          label="Postnummer"
          value={localPostnummer}
          onChange={(e) => setLocalPostnummer(e.target.value)}
          readOnly={readOnly}
          htmlSize={15}
          className={styles.textfield}
          required
        />
        <Textfield
          label="Poststed"
          value={localPoststed}
          onChange={(e) => setLocalPoststed(e.target.value)}
          readOnly={readOnly}
          htmlSize={20}
          className={styles.textfield}
          required
        />
      </div>
    </div>
  )

}

interface InputOrgInfoProps {
  readOnly?: boolean;
  navn?: string;
  orgnr?: string;
  adresse?: string;
  postnummer?: string;
  poststed?: string;
}

interface InputPersonInfoProps {
  legend: string;
  readOnly?: boolean;
  navn?: string;
  fnr?: string;
  adresse?: string;
  postnummer?: string;
  poststed?: string;
}

interface AdresseFieldProps {
  readOnly?: boolean;
  adresse?: string;
  postnummer?: string;
  poststed?: string;
}