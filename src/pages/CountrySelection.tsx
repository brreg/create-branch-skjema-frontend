import React from 'react';
import CountryFlag from 'react-country-flag';
import './CountrySelection.css';
import Header from '../components/header'


const countriesNPID = [
  { code: 'BE', name: 'Belgium' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'HR', name: 'Croatia' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LI', name: 'Lichtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxemburg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DE', name: 'Germany' },
  { code: 'AT', name: 'Austria' },
];
const countryLinksNPID: { [key: string]: string } = {
    NO: 'https://info.tt02.altinn.no/skjemaoversikt/bronnoysundregistrene/lag-gyldig-virksomhetslommebok/',
    // Add more as needed
  };
  


const countriesEUCC = [
    { code: 'BE', name: 'Belgium' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'HR', name: 'Croatia' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LI', name: 'Lichtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxemburg' },
    { code: 'MT', name: 'Malta' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NO', name: 'Norway' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DE', name: 'Germany' },
    { code: 'AT', name: 'Austria' },
  ];
  const countryLinksEUCC: { [key: string]: string } = {
    NO: 'https://info.tt02.altinn.no/skjemaoversikt/bronnoysundregistrene/lag-gyldig-virksomhetslommebok/',
    SE: 'https://attestering-portal-pilot-ui.k821.system.bolagsverket.se/'
    // Add more as needed
  };
  

const CountrySelection: React.FC = () => {
  return (
    <>
    <Header />
    <div id="npid" className="country-selection-container-npid">
    <a href="#npid">
      <h1>Natural Person Identification (NPID)</h1>
    </a>
      <h2>Choose the country which has your original registration and can issue you attestations:</h2>
      <p>A new page with their credential issuing information will open in a new tab</p>
      <hr />
      <div className="country-grid">
        {countriesNPID.map((country) => {
          const isEnabled = country.code === 'NO';
          const link = countryLinksNPID[country.code];
          const button = (
            <button
              className="country-flag-btn"
              key={country.code}
              disabled={!isEnabled}
              style={!isEnabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              <CountryFlag countryCode={country.code} svg style={{ width: '2.5em', height: '2.5em' }} />
              <span className="country-name">{country.name}</span>
            </button>
          );
          return isEnabled && link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={country.code}
              className="country-flag-link"
            >
              {button}
            </a>
          ) : (
            button
          );
        })}
      </div>
    </div>
    <div id="eucc" className="country-selection-container-eucc">
    <a href="#eucc">
      <h1>European Company Certificate (EUCC)</h1>
    </a>
      <h2>Choose the country which has your original registration and can issue you attestations:</h2>
      <p>A new page with their credential issuing information will open in a new tab</p>
      <hr />
      <div className="country-grid">
        {countriesEUCC.map((country) => {
          const isEnabled = country.code === 'NO' || country.code === 'SE';
          const link = countryLinksEUCC[country.code];
          const button = (
            <button
              className="country-flag-btn"
              key={country.code}
              disabled={!isEnabled}
              style={!isEnabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              <CountryFlag countryCode={country.code} svg style={{ width: '2.5em', height: '2.5em' }} />
              <span className="country-name">{country.name}</span>
            </button>
          );
          return isEnabled && link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={country.code}
              className="country-flag-link"
            >
              {button}
            </a>
          ) : (
            button
          );
        })}
      </div>
    </div>
  </>
);
}
export default CountrySelection; 