import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  MemberAddBody,
  MemberListResponse,
  MemberSummaryResponse,
} from "./types";

export const memberListQuery = async (
  q: string,
  page: number,
  storeId: string,
  sort: string,
  order: string,
  month: string,
  year: string,
): Promise<MemberListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/members/all?page=${page}&q=${q}&store_id=${storeId}&sort_by=${sort}&sort_type=${order}&month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as MemberListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const memberSummaryQuery = async (
  storeId: string,
  month: string,
  year: string,
): Promise<MemberSummaryResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/members/summary?store_id=${storeId}&month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as MemberSummaryResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const memberAddPost = async (body: MemberAddBody): Promise<any> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/admin/members`, {
    method: "POST",
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
