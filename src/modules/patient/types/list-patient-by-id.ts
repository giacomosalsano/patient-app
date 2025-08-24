import type { Patient } from "@/modules/patient/types/patient";

export interface ListPatientByIdProps {
  id: number;
}

export type ListPatientByIdResponse = Patient;
