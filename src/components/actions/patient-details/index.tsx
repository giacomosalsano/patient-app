import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Patient } from "@/modules/patient/types/patient";
import { EyeIcon } from "lucide-react";

import { columns } from "@/components/actions/patient-details/components/columns";
import { PatientDetailsTable } from "@/components/actions/patient-details/components/patient-details-table";
import { PatientInfoBox } from "@/components/patient-info-box";

interface PatientDetailsProps {
  patient: Patient;
}

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const patientHasParameters = patient.parameters?.length > 0;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <EyeIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full items-center justify-center">
        <DrawerHeader>
          <DrawerTitle>Patient Details</DrawerTitle>
          <DrawerDescription>
            Here you can see the patient details.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex min-w-6xl flex-col gap-4 space-y-4 overflow-y-auto px-4 pb-4 text-center">
          <PatientInfoBox patient={patient} />
          {patientHasParameters ? (
            <div className="w-full items-center justify-center">
              <PatientDetailsTable
                columns={columns}
                data={patient.parameters}
              />
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">
                This patient has no parameters
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
