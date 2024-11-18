import { Spinner } from "@digdir/designsystemet-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import styles from '@/styles/wait.module.css'

export default function Wait() {
  const [textIndex, setTextIndex] = useState(0)

  const [finishedArray, setFinishedArray] = useState(new Array(4).fill(false))
  const [activeArray, setActiveArray] = useState([true, false, false, false])
  const router = useRouter()

  const texts = [
    'Kobler til lommeboken',
    'Henter NPID',
    'Henter EUCC',
    'Lagrer data og forbreder skjema'
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((textIndex) => textIndex + 1)

    }, 2000)

    const navigationTimeout = setTimeout(() => {
      router.push('/skjema')
    }, 9000)

    return () => {
      clearInterval(textInterval)
      clearTimeout(navigationTimeout)
    }
  }, [router])

  useEffect(() => {
    const nextFinishedArray = finishedArray.map((b, i) => {
      if (i < textIndex) {
        return true
      } else {
        return false
      }
    })
    setFinishedArray(nextFinishedArray)

    const nextActiveArray = finishedArray.map((b, i) => {
      if (i === textIndex) {
        return true
      } else {
        return false
      }
    })
    setActiveArray(nextActiveArray)
  },[textIndex])

  return (
    <main className={styles.main}>
      <div className={styles.main2}>
        <div className={styles.maincontent}>
          {
            texts.map((s, i) => {
              return <StatusRow key={i} text={s} finished={finishedArray[i]} active={activeArray[i]} />
            })
          }
        </div>
      </div>
    </main>
  )
}

function StatusRow(props: any) {
  const { text, finished, active } = props;

  return (
    <div className={styles.statusrow}>
      <div className={styles.statusicon} >
        {finished ?
          <p>✅</p> : null
        }
        {active ?
          <Spinner title={text} color="accent"
            data-size="sm" /> : null
        }
      </div>
      <p>{text}</p>
    </div>
  )
}