import type { Parameter, Patient } from "@/modules/patient/types/patient";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";

import { Actions } from "../../actions";
import { Badge } from "../../ui/badge";

const patientHasAlarm = (parameters: Parameter[]) => {
  if (!parameters || !Array.isArray(parameters)) return false;
  return parameters.some((p) => p.alarm === true);
};

export const columns: ColumnDef<Patient>[] = [
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
      return <div>{formatDate(row.original.birthDate)}</div>;
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
          {row.original.sex === "M" ? (
            <Badge className="rounded-full bg-blue-400 text-white">M</Badge>
          ) : (
            <Badge className="rounded-full bg-red-400 text-white">F</Badge>
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
            <Badge variant="destructive">Yes</Badge>
          ) : (
            <Badge variant="secondary">No</Badge>
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
      return <Actions patient={row.original} />;
    },
  },
];
