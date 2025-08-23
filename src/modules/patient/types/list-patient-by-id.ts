import type { Patient } from "./patient";

export interface ListPatientByIdProps {
  id: number;
}

export type ListPatientByIdResponse = Patient;
