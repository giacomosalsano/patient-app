export interface Parameter {
  id: number;
  name: string;
  value: string;
  alarm: boolean;
}

export interface Patient {
  id: number;
  familyName: string;
  givenName: string;
  birthDate: string;
  sex: "M" | "F" | "O" | "U";
  parameters: Parameter[];
}

export type PatientUpdatePayload = Pick<
  Patient,
  "id" | "familyName" | "givenName" | "sex"
>;
