import type { Patient } from "@/modules/patient/types/patient";

import { PatientDetails } from "../patient-details";
import { EditPatientAction } from "./components/edit-patient-action";

export const Actions = ({ patient }: { patient: Patient }) => {
  return (
    <div className="flex justify-center gap-2">
      <PatientDetails patient={patient} />
      <EditPatientAction />
    </div>
  );
};
