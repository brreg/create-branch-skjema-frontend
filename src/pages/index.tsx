import Header from "@/components/header"
import styles from '@/styles/index.module.css'

import { useRouter } from 'next/router'
import { Button, Textfield } from '@digdir/designsystemet-react';

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Create branch info side</h1>
        <p>Snedig info om hvordan denne prosessen vil være</p>
        <div className={styles.main}>
          <h2>Scan QR koden for å laste opp credentials</h2>
          <img src='qr.png' alt='Scan to push credentials' />
          <h2>Eller fyll inn DID addressen til lommeboken din</h2>
          <div className={styles.didinput}>
            <Textfield
              data-size="md"
              label="DID addresse til din personlommebok"
              htmlSize={40}
              required
            />
            <Button onClick={() => router.push('/wait')}>Send inn</Button>
          </div>
        </div>
      </main>
    </>
  );
}
