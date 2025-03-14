export interface FormComplete {
  personNavn?: string;
  personFnr?: string;
  personTelefonnummer?: string,
  personVeiAddresse?: string;
  personPostcode?: string;
  personBy?: string;
  personLand?: string;

  issuingAuthority?: string;
  issuingAuthorityId?: string;
  issuingCountry?: string;
  authenticSourceName?: string;
  authenticSourceID?: string;

  foretakNavn?: string;
  foretakOrgnr?: string;
  foretakOrgform?: string;
  foretakStiftet?: string;
  foretakAdresse?: string;
  foretakNaceKode?: string;
  foretakNaceBeskrivelse?: string;
  foretakAktive?: string;
  foretakTelefonnummer?: string;
  foretakWebPageUrl?: string;

  representantFnr?: string;
  representantNavn?: string;
  representantAdresse?: string;
  representantPostnummer?: string;
  representantPoststed?: string;
  representantSignaturRegel?: string;

  norskForetaksNavn?: string;
  harFilialINorge?: boolean;
  filialAdresse?: string;
  filialPostnummer?: string;
  filialPoststed?: string;
  filialTelefonnummer?: string;
  filialWebPageUrl?: string;
  filialNaceKode1?: string;
  filialNaceKode2?: string;
  filialNaceKode3?: string;
}
