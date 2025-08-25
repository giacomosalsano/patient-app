import { Charts } from "@/components/charts";
import { Header } from "@/components/header";
import PatientsTable from "@/components/patients-table";
import { usePatient } from "@/modules/patient/hooks/use-patient";
import type { Patient } from "@/modules/patient/types/patient";
import { useEffect, useState } from "react";

function App() {
  const { handlers, patients, loading } = usePatient();
  const [currentView, setCurrentView] = useState<"table" | "charts">("table");

  useEffect(() => {
    handlers.handleGetPatients({
      props: {},
    });
  }, []);

  return (
    <>
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex flex-col gap-4">
        {currentView === "table" ? (
          <PatientsTable
            data={patients as Patient[]}
            loading={loading}
            onPatientUpdated={() => handlers.handleGetPatients({ props: {} })}
            onPatientAdded={() => handlers.handleGetPatients({ props: {} })}
          />
        ) : (
          <Charts patients={patients as Patient[]} />
        )}
      </div>
    </>
  );
}

export default App;
