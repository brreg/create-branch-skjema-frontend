import React, { createContext, useContext, useEffect, useState } from "react";


interface SessionContextProps {
  sessionId: string | null
  expiresAt: number | null
}

const SessionContext = createContext<SessionContextProps>({ sessionId: null, expiresAt: null })

export const useSession = () => useContext(SessionContext)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    // Access the session ID from the cookie
    const match = document.cookie.match(/(^| )sessionData=([^;]+)/);
    if (match) {
      try {
        // Decode the session data
        const sessionData = JSON.parse(decodeURIComponent(match[2])) as {
          sessionId: string;
          expiresAt: number;
        };

        setSessionId(sessionData.sessionId);
        setExpiresAt(sessionData.expiresAt);
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, expiresAt }}>
      {children}
    </SessionContext.Provider>
  );
};