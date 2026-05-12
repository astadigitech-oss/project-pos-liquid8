import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { ShiftListResponse } from "./types";

export const shiftListQuery = async (
  q: string,
  page: number,
  storeId: string,
): Promise<ShiftListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/shifts/all?page=${page}&q=${q}&store_id=${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as ShiftListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
