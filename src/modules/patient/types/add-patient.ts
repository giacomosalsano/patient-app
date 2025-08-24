import type { Patient, PatientSex } from "@/modules/patient/types";

export interface AddPatientProps {
  id: number;
  familyName: string;
  givenName: string;
  birthDate: string;
  sex: PatientSex;
  parameters: {
    id: number;
    name: string;
    value: number;
    alarm: boolean;
  }[];
}

export type AddPatientResponse = Patient;
