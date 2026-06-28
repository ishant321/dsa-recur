import api from "./axios";

export const loginApi = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/login", data);
};

export const signupApi = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/signup", data);
};

export const refreshTokenApi = (refreshToken: string) => {
  return api.post("/refresh_token", { refreshToken });
};