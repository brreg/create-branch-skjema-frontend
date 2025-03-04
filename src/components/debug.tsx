import { useSession } from "../context/SessionContext";
import CSS from "csstype";
import { useEffect, useState } from "react";
import { DeleteCookie } from "../context/Cookie";
import { Button } from "@digdir/designsystemet-react";
import { BugIcon } from "@navikt/aksel-icons";

export default function Debug() {
  const [ttl, setTtl] = useState(0);
  const [open, setOpen] = useState(false); // Legg til state for å styre dropdown
  const { sessionId, expiresAt } = useSession();

  useEffect(() => {
    const ttlInterval = setInterval(() => {
      if (expiresAt) {
        setTtl(expiresAt * 1000 - Date.now());
      }
    }, 1000);

    return () => {
      clearInterval(ttlInterval);
    };
  }, [expiresAt]);

  const handleDeleteSession = () => {
    DeleteCookie();
    window.location.reload();
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const containerStyle: CSS.Properties = {
    position: "relative",
    display: "inline-block",
    // marginTop: "20px",
  };

  const dropdownStyle: CSS.Properties = {
    display: open ? "block" : "none",
    position: "absolute",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "10px",
    marginTop: "5px",
    zIndex: 999,
    whiteSpace: "nowrap"
  };

  return (
    <div style={containerStyle}>
      <Button
        variant='tertiary'
        onClick={toggleDropdown}>
        Debug
        <BugIcon title="a11y-title" fontSize="1.5rem" />
      </Button>
      <div style={dropdownStyle}>
        <p><strong>Session ID:</strong> {sessionId}</p>
        <p>
          <strong>Expires in:</strong>{" "}
          {Math.floor((ttl % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} timer,{" "}
          {Math.floor((ttl % (1000 * 60 * 60)) / (1000 * 60))} minutter og{" "}
          {Math.floor((ttl % (1000 * 60)) / 1000)} sekunder
        </p>
        <button onClick={handleDeleteSession}>Slett session</button>
      </div>
    </div>
  );
}