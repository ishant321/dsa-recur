import api from "./axios";
import type { ApiResponse } from "../types";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const request = async <T>({
  method,
  url,
  payload,
}: {
  method: Method;
  url: string;
  payload?: unknown;
}): Promise<ApiResponse<T>> => {
  const response = await api.request({
    method,
    url,
    data: payload,
  });

  return response.data as ApiResponse<T>;
};
