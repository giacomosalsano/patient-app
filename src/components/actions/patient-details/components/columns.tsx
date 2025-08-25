import { Badge } from "@/components/ui/badge";
import type { Parameter } from "@/modules/patient/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Parameter>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "value",
    header: "Value",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "alarm",
    header: "Alarm",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.alarm ? (
            <Badge className="rounded-full bg-alarm text-white">Yes</Badge>
          ) : (
            <Badge className="rounded-full bg-no-alarm text-white">No</Badge>
          )}
        </div>
      );
    },
  },
];
