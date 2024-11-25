import Header from "@/components/header"
import styles from '@/styles/index.module.css'

import {QRCodeSVG} from "qrcode.react";
import { useRouter } from 'next/router'
import { Button, Textfield } from '@digdir/designsystemet-react';
import { useSession } from "@/context/SessionContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [qrLink, setQrLink] = useState("")
  const router = useRouter()
  const { sessionId } = useSession();

  useEffect(() => {
    fetchQrLink()
  }, [sessionId])

  const fetchQrLink = async () => {
    try {
      if (!sessionId) {
        throw new Error("SessionId is missing")
      }
      const response = await fetch( process.env.NEXT_PUBLIC_BACKEND_URL+"/api/qr-code", {
        headers: {
          "x-session-id": sessionId
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch QR link")
      }

      const data = await response.json()
      console.log("received data from /api/qr-code")
      setQrLink(data.didcommUri)
    } catch (error) {
      console.error("Error fetching QR link:", error)
    }
  }


  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Create branch info side</h1>
        <p>Snedig info om hvordan denne prosessen vil være</p>
        <div className={styles.main}>
          <h2>Scan QR koden for å laste opp credentials</h2>
          <QRCodeSVG value={qrLink} />
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
