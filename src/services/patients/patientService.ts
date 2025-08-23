import { fetchPatients, updatePatient } from "@/services/api";
import type { Patient, PatientUpdatePayload } from "@/types/patient";

export class PatientService {
  static async getAllPatients(): Promise<Patient[]> {
    try {
      return await fetchPatients();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  static async updatePatientData(payload: PatientUpdatePayload): Promise<void> {
    try {
      await updatePatient(payload);
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  }

  static async getPatientById(id: number): Promise<Patient | null> {
    try {
      const patients = await this.getAllPatients();
      return patients.find((patient) => patient.id === id) || null;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  }
}
