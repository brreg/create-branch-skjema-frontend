// src/middleware.ts
import { nanoid } from 'nanoid';
import { FormComplete } from '../types/FormComplete';

const sessionCookieName = 'sessionData=';

export interface Cookie {
  sessionId: string,
  expiresAt: string,
  formData?: FormComplete
}

export function CreateCookieIfMissing() {

  const sessionDurationSeconds = 60 * 60 * 24; // 24 hours

  if (!document.cookie.includes(sessionCookieName)) {
    const sessionId = nanoid();
    const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds; // Unix timestamp in seconds

    const sessionData = {
      sessionId,
      expiresAt,
      formData: {},
    };

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

// export function setCookie(data: Partial<Cookie>) {
//   const existingData = getCookie();
//   const updatedData = { ...existingData, ...data };
//   const sessionValue = JSON.stringify(updatedData);
  

//   document.cookie = `${sessionCookieName}${encodeURIComponent(sessionValue)}; Expires=${existingData?.expiresAt}; Path=/;`;
// }

export function storeFormDataInCookie(formData: FormComplete) {
  console.log('stored data in cookie:')
  console.log(formData)
  const existingData = getCookie();
  const updatedData = { 
    ...existingData, 
    formData: {
      ...existingData?.formData,
      ...formData
    }
  };
  const sessionValue = JSON.stringify(updatedData);
  document.cookie = `${sessionCookieName}${encodeURIComponent(sessionValue)}; Expires=${existingData?.expiresAt}; Path=/;`;
}

export function setCookie(data: Partial<Cookie>) {
  const existingData = getCookie();
  const updatedData = { ...existingData, ...data };
  const sessionValue = JSON.stringify(updatedData);

  document.cookie = `${sessionCookieName}${encodeURIComponent(sessionValue)}; Expires=${existingData?.expiresAt}; Path=/;`;
}

export function updateFormData(formData: Record<string, any>) {
  const existingData = getCookie();
  const updatedData = { 
    ...existingData, 
    formData: {
      ...existingData?.formData,
      ...formData
    }
  };
  const sessionValue = JSON.stringify(updatedData);
  document.cookie = `${sessionCookieName}${encodeURIComponent(sessionValue)}; Expires=${existingData?.expiresAt}; Path=/;`;
}

export function getCookie(): Cookie | null {
  const cookies = document.cookie.split('; ').find(cookie => cookie.startsWith(sessionCookieName));
  if (!cookies) return null;

  const cookieValue = cookies.split('=')[1];
  try {
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch (error) {
    console.error("Error parsing cookie data:", error);
    return null;
  }
}