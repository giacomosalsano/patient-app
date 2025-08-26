import type { Patient } from "@/modules/patient/types/patient";

export type UpdatePatientProps = Pick<
  Patient,
  "id" | "familyName" | "givenName" | "sex" | "birthDate"
>;

export type UpdatePatientResponse = Patient;
