import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { StaffListResponse } from "./types";

export const listStaffQuery = async (
  q: string,
  page: number,
): Promise<StaffListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users?page=${page}&q=${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as StaffListResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};

export const detailStaffQuery = async (
  id: string,
): Promise<StaffListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as StaffListResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};
