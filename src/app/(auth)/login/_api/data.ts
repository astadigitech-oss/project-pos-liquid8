import { apiUrl } from "@/config";
import { LoginBody, LoginResponse } from "./types";

export const loginPost = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as LoginResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
