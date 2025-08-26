import type { AxiosResponse } from "axios";

import { apiClient } from "@/core/services/api/config";

type RequestProps = {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  body?: any;
  params?: any;
};

type Response<T> = {
  code: number;
  data: T;
};

export async function request<T>({
  url,
  method = "get",
  body,
  params,
}: RequestProps): Promise<Response<T>> {
  let axiosResponse: AxiosResponse;

  if (method === "get") {
    axiosResponse = await apiClient.get(url, { params });
  } else if (method === "post" || method === "put") {
    axiosResponse = await apiClient[method](url, body);
  } else {
    axiosResponse = await apiClient[method](url);
  }

  return {
    code: axiosResponse.status,
    data: axiosResponse.data,
  };
}
