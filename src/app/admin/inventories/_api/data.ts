import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { InventoryListResponse } from "./types";

export const inventoryListQuery = async (
  q: string,
  page: number,
  storeId: string,
): Promise<InventoryListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/products?page=${page}&q=${q}&store_id=${storeId}&per_page=20`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as InventoryListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
