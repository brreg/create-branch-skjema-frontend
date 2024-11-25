import { useSession } from "../context/SessionContext"; 
import CSS from "csstype";
import { useEffect, useState } from "react";
import { DeleteCookie } from "../context/Cookie";

export default function Debug() {
  const [ttl, setTtl] = useState(0)
  const { sessionId, expiresAt } = useSession()

  const style: CSS.Properties = {
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "20px"
  };

  useEffect(() => {
    const ttlInterval = setInterval(() => {
      if (expiresAt) {
        setTtl(expiresAt * 1000 - Date.now())
      }
    }, 1000)

    return () => {
      clearInterval(ttlInterval)
    }
  }, [expiresAt])

  const handleDeleteSession = () => {
    DeleteCookie()
    window.location.reload()
  }

  return (
    <div style={style}>
      <p>Your sessionId: {sessionId}</p>
      <p>Session expires in {Math.floor((ttl % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, {Math.floor((ttl % (1000 * 60 * 60)) / (1000 * 60))} minutes and {Math.floor((ttl % (1000 * 60)) / 1000)} seconds</p>
      <button onClick={handleDeleteSession}>Delete Session</button>
    </div>
  )
}