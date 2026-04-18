import { apiUrl, secretStore } from "@/config";
import {
  AddMemberBody,
  AddToCartBody,
  AddUpdateMemberBody,
  CurrentCartResponse,
  DetailMemberResponse,
  DraftTransactionResponse,
  EndShiftBody,
  MemberListResponse,
  ProductListResponse,
  ShiftResponse,
  StartShiftBody,
} from "./types";
import { getCookie } from "cookies-next/client";

const token = getCookie(secretStore);

export const currentCartQuery = async (): Promise<CurrentCartResponse> => {
  const response = await fetch(`${apiUrl}/api/carts/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as CurrentCartResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const activeShiftQuery = async (): Promise<ShiftResponse> => {
  const response = await fetch(`${apiUrl}/api/shifts-active`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as ShiftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const listProductQuery = async (
  q: string = "",
  page: number = 1,
): Promise<ProductListResponse> => {
  const response = await fetch(
    `${apiUrl}/api/products-by-store?q=${q}&page=${page}&per_page=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as ProductListResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const listDraftQuery = async (
  q: string = "",
): Promise<DraftTransactionResponse> => {
  const response = await fetch(`${apiUrl}/api/carts/pending?q=${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as DraftTransactionResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const listMemberQuery = async (
  q: string = "",
  page: number = 1,
): Promise<MemberListResponse> => {
  const response = await fetch(
    `${apiUrl}/api/members?q=${q}&page=${page}&per_page=10`,
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
export const detailMemberQuery = async (
  id: string = "",
): Promise<DetailMemberResponse> => {
  const response = await fetch(`${apiUrl}/api/members/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as DetailMemberResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

// mutations

export const startShiftPost = async (
  body: StartShiftBody,
): Promise<ShiftResponse> => {
  const response = await fetch(`${apiUrl}/api/shifts/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as ShiftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const endShiftPost = async (
  body: EndShiftBody,
): Promise<ShiftResponse> => {
  const response = await fetch(`${apiUrl}/api/shifts/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as ShiftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const addToCartPost = async (
  body: AddToCartBody,
): Promise<AddUpdateMemberBody> => {
  const response = await fetch(`${apiUrl}/api/carts/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as AddUpdateMemberBody;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const addMemberPost = async (
  body: AddMemberBody,
): Promise<AddUpdateMemberBody> => {
  const response = await fetch(`${apiUrl}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as AddUpdateMemberBody;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const updateMemberPost = async (
  body: AddMemberBody,
  id: string,
): Promise<ShiftResponse> => {
  const response = await fetch(`${apiUrl}/api/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as ShiftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const deleteMemberPost = async (id: string): Promise<ShiftResponse> => {
  const response = await fetch(`${apiUrl}/api/members/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as ShiftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
