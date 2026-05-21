import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  ExportTransactionAdminResponse,
  TransactionListAdminResponse,
} from "./types";
import { format } from "date-fns";

export const transactionListAdminQuery = async (
  page: number,
  q: string,
  storeId: string,
  status: string,
  startDate?: string,
  endDate?: string,
): Promise<TransactionListAdminResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/transactions/all?page=${page}&q=${q}&store_id=${storeId}&status=${status}&start_date=${startDate ? format(startDate, "yyyy-MM-dd") : ""}&end_date=${endDate ? format(endDate, "yyyy-MM-dd") : ""}`,
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

export const exportTransactionAdminMutation = async (
  id: string,
  startDate?: string,
  endDate?: string,
): Promise<ExportTransactionAdminResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/transactions/export?store_id=${id}&start_date=${startDate ? format(startDate, "yyyy-MM-dd") : ""}&end_date=${endDate ? format(endDate, "yyyy-MM-dd") : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as ExportTransactionAdminResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
