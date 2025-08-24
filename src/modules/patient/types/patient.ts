export interface Parameter {
  id: number;
  name: string;
  value: string;
  alarm: boolean;
}

export enum PatientSex {
  MALE = "M",
  FEMALE = "F",
}

export interface Patient {
  id: number;
  familyName: string;
  givenName: string;
  birthDate: string;
  sex: PatientSex;
  parameters: Parameter[];
}
