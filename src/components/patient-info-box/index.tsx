import { PatientSex, type Patient } from "@/modules/patient/types/patient";
import { formatDate } from "@/utils/date";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardTitle } from "../ui/card";

interface PatientInfoBoxProps {
  patient: Patient;
}

export const PatientInfoBox = ({ patient }: PatientInfoBoxProps) => {
  return (
    <Card className="w-full">
      <CardTitle className="flex flex-row items-center justify-center gap-2 text-center text-lg font-bold">
        {patient.givenName} {patient.familyName}
      </CardTitle>
      <CardContent>
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="font-bold">ID:</p>
            <p>{patient.id}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="font-bold">Birth Date:</p>
            <p>{formatDate(patient.birthDate)}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            {patient.sex === PatientSex.MALE ? (
              <Badge className="rounded-full bg-blue-400 text-white">M</Badge>
            ) : (
              <Badge className="rounded-full bg-red-400 text-white">F</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
