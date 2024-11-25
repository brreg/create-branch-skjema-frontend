// src/middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const sessionCookieName = 'sessionData';
  const sessionDurationSeconds = 60 * 60 * 24; // 24 hours

  // Check if the session cookie exists
  const sessionCookie = request.cookies.get(sessionCookieName);

  if (!sessionCookie) {
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

    // Set the session cookie
    response.cookies.set(sessionCookieName, sessionValue, {
      httpOnly: false, // Accessible via JavaScript
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionDurationSeconds,
    });
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
