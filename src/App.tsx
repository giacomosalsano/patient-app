import { useEffect } from "react";
import PatientsTable from "./components/patients-table";
import { usePatient } from "./modules/patient/hooks/use-patient";
import type { Patient } from "./modules/patient/types/patient";

function App() {
  const { handlers, patients } = usePatient();

  useEffect(() => {
    handlers.handleGetPatients({
      props: {},
    });
  }, []);

  console.log("patients:", patients);

  return (
    <>
      <div className="flex flex-col gap-4">
        <PatientsTable data={patients as Patient[]} />
      </div>
    </>
  );
}

export default App;
