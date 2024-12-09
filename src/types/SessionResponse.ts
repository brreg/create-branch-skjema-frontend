export interface SessionResponse {
  personNavn: string;
  personFnr: string;
  issuingAuthority: string;
  issuingAuthorityId: string;
  issuingCountry: string;
  foretakNavn: string;
  foretakOrgnr: string;
  foretakStiftet: string;
  foretakAdresse: string;
  foretakNaceKode: string;
  foretakNaceBeskrivelse: string;
  foretakAktive: string;
  representantNavn: string;
  representantFodselsdato: string;
  representantSignaturRegel: string;
  id: number;
  userSessionId: string;
  issuerWalletName: string;
  issuerWalletAddress: string;
  holderWalletAddress: string;
  authenticSourceName: string;
  authenticSourceID: string;
}
