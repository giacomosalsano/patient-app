import { createColumns } from "@/components/patients-table/components/columns";
import { DataTable } from "@/components/patients-table/components/data-table";
import type { Patient } from "@/modules/patient/types/patient";

interface PatientsTableProps {
  data: Patient[];
  loading: boolean;
  onPatientUpdated?: () => void;
}

export default function PatientsTable({
  data,
  loading = false,
  onPatientUpdated,
}: PatientsTableProps) {
  const columns = createColumns(onPatientUpdated);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as Patient[]} loading={loading} />
    </div>
  );
}
