import { useEffect } from "react";
import { usePatient } from "./modules/patient/hooks/use-patient";
import type { Patient } from "./modules/patient/types/patient";

function App() {
  const { handlers, patients } = usePatient();

  useEffect(() => {
    handlers.handleGetPatients({
      props: {},
    });
    console.log(patients);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Patient:</h1>
        {patients?.map((p: Patient, index: number) => (
          <div key={index}>
            <h2>{p.familyName}</h2>
            <p>{p.givenName}</p>
            <p>{p.birthDate}</p>
            <p>{p.sex}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
