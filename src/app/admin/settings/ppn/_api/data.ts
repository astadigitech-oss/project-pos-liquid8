import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  AddPpnBody,
  PpnDetailResponse,
  PpnListResponse,
  UpdatePpnBody,
} from "./types";

export const listPPNQuery = async (
  search: string,
): Promise<PpnListResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns?q=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as PpnListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
export const detailPPNQuery = async (
  id: string,
): Promise<PpnDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as PpnDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const addPPNPost = async (
  body: AddPpnBody,
): Promise<PpnDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as PpnDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const updatePPNPut = async (
  id: number,
  body: UpdatePpnBody,
): Promise<PpnDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as PpnDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const deletePPNDelete = async (
  id: number,
): Promise<PpnDetailResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/ppns/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as PpnDetailResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
