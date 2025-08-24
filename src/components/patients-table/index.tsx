import type { Patient } from "@/modules/patient/types/patient";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

interface PatientsTableProps {
  data: Patient[];
}

export default function PatientsTable({ data }: PatientsTableProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as Patient[]} />
    </div>
  );
}
