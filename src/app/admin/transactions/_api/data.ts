import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { TransactionListAdminResponse } from "./types";

export const transactionListAdminQuery = async (
  page: number,
  q: string,
  storeId: string,
  status: string,
): Promise<TransactionListAdminResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/transactions/all?page=${page}&q=${q}&store_id=${storeId}&status=${status}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as TransactionListAdminResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const approvedTransactionAdminMutation = async (
  id: string,
  body: { approve_status: "approved" | "rejected" },
): Promise<TransactionListAdminResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/transactions/${id}/approve-cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const res = (await response.json()) as TransactionListAdminResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
