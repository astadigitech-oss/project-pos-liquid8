import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { MigrationListResponse } from "./types";

export const migrationListQuery = async (
  q: string,
  page: number,
  storeId: string,
): Promise<MigrationListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/migrate-history?page=${page}&q=${q}&store_id=${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as MigrationListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
