import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { ShiftDetailResponse, ShiftListResponse } from "./types";
import { format } from "date-fns";

const token = getCookie(secretStore);

export const shiftListQuery = async (
  q: string,
  page: number,
  start_date?: string,
  end_date?: string,
): Promise<ShiftListResponse> => {
  const response = await fetch(
    `${apiUrl}/api/shifts?page=${page}&q=${q}&start_date=${start_date ? format(start_date, "yyyy-MM-dd") : ""}&end_date=${end_date ? format(end_date, "yyyy-MM-dd") : ""}`,
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

export const shiftDetailQuery = async (
  id: string,
): Promise<ShiftDetailResponse> => {
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
