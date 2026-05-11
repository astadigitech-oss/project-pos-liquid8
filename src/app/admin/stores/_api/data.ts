import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { StoreListResponse, StoreSelectResponse } from "./types";

export const listStoreQuery = async (
  page: number,
  q: string,
): Promise<StoreListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/stores?page=${page}&q=${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as StoreListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const listStoreSelectQuery = async (): Promise<StoreSelectResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/stores-dropdown`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as StoreSelectResponse;

  if (!response.ok) throw new Error("Select Store Error");

  return res;
};
