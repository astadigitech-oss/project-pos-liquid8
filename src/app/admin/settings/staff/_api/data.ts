import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  StaffAddBody,
  StaffAddResponse,
  StaffDetailResponse,
  StaffEditBody,
  StaffListResponse,
} from "./types";

export const listStaffQuery = async (
  q: string,
  page: number,
): Promise<StaffListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/users?page=${page}&q=${q}&per_page=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as StaffListResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};

export const detailStaffQuery = async (
  id: string,
): Promise<StaffDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as StaffDetailResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};

// mutation ---------------------------------------------------------
export const addStaffMutation = async (
  body: StaffAddBody,
): Promise<StaffAddResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as StaffAddResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};

export const updateStaffMutation = async (
  id: string,
  body: StaffEditBody,
): Promise<StaffAddResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as StaffAddResponse;

  if (!response.ok) throw new Error(res.data.message);

  return res;
};
