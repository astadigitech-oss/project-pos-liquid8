import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  ExportDetailStoreResponse,
  StoreChartResponse,
  StoreDetailResponse,
} from "./types";

export const storeDetailQuery = async (
  id: string,
  page: number,
  q: string,
): Promise<StoreDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/stores/${id}?page=${page}&q=${q}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as StoreDetailResponse;

  if (!response.ok) throw new Error("Select Store Error");

  return res;
};
export const storeChartQuery = async (
  id: string,
  period: string,
): Promise<StoreChartResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/stores/${id}/sales-period?period=${period}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as StoreChartResponse;

  if (!response.ok) throw new Error("Select Store Error");

  return res;
};

export const exportDetailStoreMutation = async (
  id: string,
): Promise<ExportDetailStoreResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/stores/${id}/export`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as ExportDetailStoreResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
