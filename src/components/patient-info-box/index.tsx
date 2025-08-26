import { PatientSex, type Patient } from "@/modules/patient/types";
import { formatDate } from "@/utils/date";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { CardComponent } from "@/components/ui/components/card-component";

interface PatientInfoBoxProps {
  patient: Patient;
}

export const PatientInfoBox = ({ patient }: PatientInfoBoxProps) => {
  const patientInfoBoxContent = useMemo(() => {
    return (
      <div className="flex flex-row items-center justify-center gap-4 lg:gap-4">
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-bold">ID:</p>
          <p>{patient.id}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="hidden font-bold md:block">Birth Date:</p>
          <p className="font-bold md:font-normal">{formatDate(patient.birthDate)}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-1">
          {patient.sex === PatientSex.MALE ? (
            <Badge className="bg-male rounded-full text-white">M</Badge>
          ) : (
            <Badge className="bg-female rounded-full text-white">F</Badge>
          )}
        </div>
      </div>
    );
  }, []);

  return (
    <CardComponent
      title={`${patient.givenName} ${patient.familyName}`}
      cardContent={patientInfoBoxContent}
    />
  );
};
