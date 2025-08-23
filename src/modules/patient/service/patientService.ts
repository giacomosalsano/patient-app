import { request } from "@/core/services/api/request";
import type {
  ListPatientByIdProps,
  ListPatientByIdResponse,
} from "@/modules/patient/types/list-patient-by-id";
import type { ListPatientResponse } from "@/modules/patient/types/list-patients";
import type { AddPatientProps, AddPatientResponse } from "../types/add-patient";
import type {
  UpdatePatientProps,
  UpdatePatientResponse,
} from "../types/update-patient";

const module = "/Patient";

export async function listPatients() {
  return await request<ListPatientResponse>({
    url: `${module}/GetList`,
    method: "get",
    params: {},
  });
}

export async function listPatientById(params: ListPatientByIdProps) {
  return await request<ListPatientByIdResponse>({
    url: `${module}/Get/${params.id}`,
    method: "get",
    params: {},
  });
}

export async function addPatient(params: AddPatientProps) {
  return await request<AddPatientResponse>({
    url: `${module}/Add`,
    method: "post",
    body: params,
  });
}

export async function updatePatient(params: UpdatePatientProps) {
  return await request<UpdatePatientResponse>({
    url: `${module}/Update`,
    method: "post",
    body: params,
  });
}
