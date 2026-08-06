import api from "./axios";
import type { ApiResponse } from "../types";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const request = async <T>({
  method,
  url,
  payload,
  baseURL
}: {
  method: Method;
  url: string;
  payload?: unknown;
  baseURL?: string
}): Promise<ApiResponse<T>> => {
  const response = await api.request({
    method,
    url,
    data: payload,
    baseURL: baseURL ?? import.meta.env.VITE_API_URL,
  });

  return response.data as ApiResponse<T>;
};
