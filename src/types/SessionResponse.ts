export interface SessionResponse {
  personNavn: string;
  personFnr: string;
  personVeiAddresse: string;
  personPostcode: string;
  personBy: string;
  personLand: string;
  issuingAuthority: string;
  issuingAuthorityId: string;
  issuingCountry: string;
  authenticSourceName: string;
  authenticSourceID: string;
  foretakNavn: string;
  foretakOrgnr: string;
  foretakOrgform: string;
  foretakStiftet: string;
  foretakAdresse: string;
  foretakNaceKode: string;
  foretakNaceBeskrivelse: string;
  foretakAktive: string;
  representantNavn: string;
  representantFodselsdato: string;
  representantSignaturRegel: string;
}
