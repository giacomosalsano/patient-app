import type { Patient } from "@/modules/patient/types/patient";
import { createColumns } from "./components/columns";
import { DataTable } from "./components/data-table";

interface PatientsTableProps {
  data: Patient[];
  loading: boolean;
  onPatientUpdated?: () => void;
  onPatientAdded?: () => void;
}

export default function PatientsTable({
  data,
  loading = false,
  onPatientUpdated,
  onPatientAdded,
}: PatientsTableProps) {
  const columns = createColumns(onPatientUpdated);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data as Patient[]}
        loading={loading}
        onPatientAdded={onPatientAdded}
      />
    </div>
  );
}
