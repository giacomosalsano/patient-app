import type { Patient, PatientUpdatePayload } from "@/types/patient";
import axios from "axios";
import { apiClient } from "./config";

export async function fetchPatients(): Promise<Patient[]> {
  try {
    const response = await apiClient.get<Patient[]>("/Patient/GetList");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch patients: ${error.response?.data || error.message}`,
      );
    }
    throw new Error("Failed to fetch patients: Unknown error");
  }
}

export async function updatePatient(
  payload: PatientUpdatePayload,
): Promise<void> {
  try {
    await apiClient.post("/Patient/Update", payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data || error.message;
      throw new Error(`Failed to update patient: ${errorMessage}`);
    }
    throw new Error("Failed to update patient: Unknown error");
  }
}
