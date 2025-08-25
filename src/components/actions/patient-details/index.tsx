import { Button } from "@/components/ui/button";
import type { Patient } from "@/modules/patient/types";
import { EyeIcon } from "lucide-react";

import { columns } from "@/components/actions/patient-details/components/columns";
import { PatientDetailsTable } from "@/components/actions/patient-details/components/patient-details-table";
import { PatientInfoBox } from "@/components/patient-info-box";
import { DrawerComponent } from "@/components/ui/components/drawer-component";
import { useMemo } from "react";
import { TooltipComponent } from "@/components/ui/components/tooltip-component";

interface PatientDetailsProps {
  patient: Patient;
}

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const patientHasParameters = patient.parameters?.length > 0;

  const patientDetailsTrigger = useMemo(() => {
    return (
      <Button variant="outline" size="sm">
        <TooltipComponent content="View patient details">
          <EyeIcon className="h-4 w-4" />
        </TooltipComponent>
      </Button>
    );
  }, []);

  const patientDetailsContent = useMemo(() => {
    return (
      <div className="flex min-w-6xl flex-col gap-4 space-y-4 overflow-y-auto px-4 pb-4 text-center">
        <PatientInfoBox patient={patient} />
        {patientHasParameters ? (
          <div className="w-full items-center justify-center">
            <PatientDetailsTable columns={columns} data={patient.parameters} />
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground">
              This patient has no parameters
            </p>
          </div>
        )}
      </div>
    );
  }, []);

  return (
    <DrawerComponent
      trigger={patientDetailsTrigger}
      title="Patient Details"
      description="Here you can see the patient details."
      children={patientDetailsContent}
    />
  );
};
