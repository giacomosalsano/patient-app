import { PatientService } from "@/services/patients/patientService";

async function App() {
  const patients = await PatientService.getAllPatients();

  return (
    <>
      <h1 className="m-12 p-3 text-3xl font-bold text-red-500 underline">
        {patients.map((patient) => (
          <div key={patient.id}>
            {patient.givenName} {patient.familyName}
          </div>
        ))}
      </h1>
    </>
  );
}

export default App;
