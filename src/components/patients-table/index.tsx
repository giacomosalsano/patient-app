import type { Patient } from "@/modules/patient/types/patient";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

interface PatientsTableProps {
  data: Patient[];
  loading: boolean;
}

export default function PatientsTable({ data, loading = false }: PatientsTableProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as Patient[]} loading={loading} />
    </div>
  );
}
