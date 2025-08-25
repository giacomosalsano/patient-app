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
    <div className="container p-4 pb-20 text-center md:py-10 lg:mx-auto lg:px-0">
      <div className="mb-4 flex flex-col gap-2 md:mb-8">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-start md:text-3xl">
          Table
        </h2>
        <p className="text-muted-foreground text-center md:text-start">
          Manage your patients
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data as Patient[]}
        loading={loading}
        onPatientAdded={onPatientAdded}
      />
    </div>
  );
}
