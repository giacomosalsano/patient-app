import type { AxiosResponse } from "axios";

import { apiClient } from "./config";

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
  const query: any = {};
  let axiosResponse: AxiosResponse;

  if (method === "get") {
    Object.assign(query, { params });
  }

  if (method === "post" || method === "put") {
    Object.assign(query, body);
  }

  axiosResponse = await apiClient[method](url, query);

  return {
    code: axiosResponse.status,
    data: axiosResponse.data,
  };
}
