import type { Patient } from "./patient";

export interface UpdatePatientProps {
  id: number;
}

export type UpdatePatientResponse = Patient;
