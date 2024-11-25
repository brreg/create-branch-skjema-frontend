import './wait.css'
import { Spinner } from "@digdir/designsystemet-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

export default function WaitPage() {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0)

  const [finishedArray, setFinishedArray] = useState(new Array(4).fill(false))
  const [activeArray, setActiveArray] = useState([true, false, false, false])

  // husk å oppdatere finishedArray default array length når du endrer lengden på listen med texts
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
      navigate("/skjema")
    }, 9000)

    return () => {
      clearInterval(textInterval)
      clearTimeout(navigationTimeout)
    }
  }, [])

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
    <main className='main'>
      <div className='main2'>
        <div className='maincontent'>
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
    <div className='statusrow'>
      <div className='statusicon' >
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