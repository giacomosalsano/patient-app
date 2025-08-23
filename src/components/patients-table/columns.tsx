import type { Parameter, Patient } from "@/modules/patient/types/patient";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/utils/date";

const patientHasAlarm = (parameters: Parameter[]) => {
  return parameters.some((p) => p.alarm);
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "familyName",
    header: "Family Name",
  },
  {
    accessorKey: "givenName",
    header: "Given Name",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.birthDate)}</div>;
    },
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "parameters",
    header: "Number of Parameters",
    cell: ({ row }) => {
      return <div>{row.original.parameters.length}</div>;
    },
  },
  {
    accessorKey: "parameters.alarm",
    header: "Alarm",
    cell: ({ row }) => {
      return (
        <div>
          {patientHasAlarm(row.original.parameters) ? (
            <Badge variant="destructive">Yes</Badge>
          ) : (
            <Badge variant="secondary">No</Badge>
          )}
        </div>
      );
    },
  },
];
