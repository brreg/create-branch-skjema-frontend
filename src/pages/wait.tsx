import { Spinner } from "@digdir/designsystemet-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import styles from '@/styles/wait.module.css'

export default function Wait() {
  const [textIndex, setTextIndex] = useState(0)
  const router = useRouter()

  const texts = [
    'Laster inn data fra lommeboken',
    'Gjør avansert prosessering',
    'Selger sensitive data til Amerika',
    'Gjør hverdagen din bedre'
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 2000)

    const navigationTimeout = setTimeout(() => {
      router.push('/skjema')
    }, 7800)

    return () => {
      clearInterval(textInterval)
      clearTimeout(navigationTimeout)
    }
  }, [router])

  return (
    <main className={styles.main}>
      <div>
        <Spinner title={texts[textIndex]} color='accent' data-size='xl' />
        <p>{texts[textIndex]}</p>
      </div>
    </main>
  )
}