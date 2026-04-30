import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { PpnListResponse } from "./types";

export const listPPNQuery = async (
  search: string,
): Promise<PpnListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns?q=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as PpnListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
