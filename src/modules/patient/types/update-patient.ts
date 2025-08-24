import type { Patient } from "./patient";

export type UpdatePatientProps = Pick<
  Patient,
  "familyName" | "givenName" | "sex"
>;

export type UpdatePatientResponse = Patient;
