import { getCookie } from "cookies-next/client";
import { ShiftDetailResponse } from "./types";
import { apiUrl, secretStore } from "@/config";

export const shiftDetailQuery = async (
  id: string,
): Promise<ShiftDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/shifts/${id}/transaction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as ShiftDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
