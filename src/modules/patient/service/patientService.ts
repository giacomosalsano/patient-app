import { request } from "@/core/services/api/request";
import type {
  AddPatientProps,
  AddPatientResponse,
  ListPatientByIdProps,
  ListPatientByIdResponse,
  ListPatientResponse,
  UpdatePatientProps,
  UpdatePatientResponse,
} from "@/modules/patient/types";

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
  const response = await request<UpdatePatientResponse>({
    url: `${module}/Update`,
    method: "post",
    body: params,
  });
  return response;
}
