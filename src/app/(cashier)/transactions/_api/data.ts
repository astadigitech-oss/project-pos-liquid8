import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { transactionListResponse } from "./types";

export const transactionListQuery = async (
  q: string,
  page: number,
): Promise<transactionListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/transactions?page=${page}&q=${q}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as transactionListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const transactionCancel = async ({
  id,
  body,
}: {
  id: string;
  body: { note: string };
}): Promise<any> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as any;

  if (!response.ok) throw new Error(res.message);

  return res;
};
