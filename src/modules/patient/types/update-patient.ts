import type { Patient } from "@/modules/patient/types/patient";

export type UpdatePatientProps = Pick<
  Patient,
  "familyName" | "givenName" | "sex"
>;

export type UpdatePatientResponse = Patient;
