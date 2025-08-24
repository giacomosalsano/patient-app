import { useEffect } from "react";
import PatientsTable from "./components/patients-table";
import { usePatient } from "./modules/patient/hooks/use-patient";
import type { Patient } from "./modules/patient/types/patient";

function App() {
  const { handlers, patients, loading } = usePatient();

  useEffect(() => {
    handlers.handleGetPatients({
      props: {},
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <PatientsTable data={patients as Patient[]} loading={loading} />
      </div>
    </>
  );
}

export default App;
