import {
  PatientSex,
  type Parameter,
  type Patient,
} from "@/modules/patient/types";
import { formatAge, formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";

import { EditPatientAction } from "@/components/actions/edit-patient-action";
import { PatientDetails } from "@/components/actions/patient-details";

import { Badge } from "@/components/ui/badge";

const patientHasAlarm = (parameters: Parameter[]) => {
  if (!parameters || !Array.isArray(parameters)) return false;
  return parameters.some((p) => p.alarm === true);
};

export const createColumns = (
  onPatientUpdated?: () => void,
): ColumnDef<Patient>[] => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "familyName",
    header: "Family Name",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "givenName",
    header: "Given Name",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{formatDate(row.original.birthDate)}</div>
          <div className="text-xs text-gray-500">
            {formatAge(row.original.birthDate)} years old
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sex",
    header: "Sex",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.sex === PatientSex.MALE ? (
            <Badge className="bg-male rounded-full text-white">M</Badge>
          ) : (
            <Badge className="bg-female rounded-full text-white">F</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "parameters",
    header: "Number of Parameters",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return <div>{row.original.parameters.length}</div>;
    },
  },
  {
    id: "alarm",
    accessorFn: (row) => patientHasAlarm(row.parameters),
    header: "Alarm",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      const hasAlarm = patientHasAlarm(row.original.parameters);
      if (value === "true") return hasAlarm;
      if (value === "false") return !hasAlarm;
      return true;
    },
    cell: ({ row }) => {
      return (
        <div>
          {patientHasAlarm(row.original.parameters) ? (
            <Badge className="bg-alarm rounded-full text-white">Yes</Badge>
          ) : (
            <Badge className="bg-no-alarm rounded-full text-white">No</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <PatientDetails patient={row.original} />
          <EditPatientAction
            patient={row.original}
            onPatientUpdated={onPatientUpdated}
          />
        </div>
      );
    },
  },
];

export const columns = createColumns();
