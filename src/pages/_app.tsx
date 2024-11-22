import "@/styles/globals.css";
import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';
import '@digdir/designsystemet-theme/brand/brreg/tokens.css';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import type { AppProps } from "next/app";
import { SessionProvider } from "@/context/SessionContext";
import Debug from "@/components/debug";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Debug />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
          }
          `}</style>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
