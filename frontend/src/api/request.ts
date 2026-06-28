import api from "./axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const request = async <T>({
  method,
  url,
  payload,
}: {
  method: Method;
  url: string;
  payload?: any;
}): Promise<T> => {
  const response = await api.request({
    method,
    url,
    data: payload,
  });

  return response.data;
};