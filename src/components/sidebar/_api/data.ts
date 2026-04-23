import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";

const token = getCookie(secretStore);

export const logoutData = async (): Promise<any> => {
  const response = await fetch(`${apiUrl}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as any;

  if (!response.ok) throw new Error(res.message);

  return res;
};
