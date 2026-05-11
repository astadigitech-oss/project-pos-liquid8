import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { transactionDetailResponse } from "./types";

export const transactionDetailQuery = async (
  id: string,
): Promise<transactionDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/transactions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as transactionDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
