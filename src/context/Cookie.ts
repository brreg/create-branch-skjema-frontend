// src/middleware.ts
import { nanoid } from 'nanoid';

const sessionCookieName = 'sessionData=';

export interface Cookie {
  sessionId: string,
  expiresAt: string
}

export function CreateCookieIfMissing() {

  const sessionDurationSeconds = 60 * 60 * 24; // 24 hours

  // Check if the session cookie exists
  if (!document.cookie.includes(sessionCookieName)) {
    // Generate a new unique session ID
    const sessionId = nanoid();

    // Calculate the expiration timestamp
    const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds; // Unix timestamp in seconds

    // Create a session data object
    const sessionData = {
      sessionId,
      expiresAt,
    };

    // Encode the session data as a JSON string
    const sessionValue = JSON.stringify(sessionData);

    document.cookie = sessionCookieName + encodeURIComponent(sessionValue) + "; Max-Age="+ sessionDurationSeconds + "; path=/"
  }
}

export function DeleteCookie() {
  if (import.meta.env.PROD) {
    document.cookie = sessionCookieName + "; Max-Age=0; Path=/; Domain=.polite-bush-0c26cb003.5.azurestaticapps.net"
    document.cookie = sessionCookieName + "; Max-Age=0; Path=/"
  } else {
    document.cookie = sessionCookieName + "; Max-Age=0; Path=/; Domain=localhost"
  }
}