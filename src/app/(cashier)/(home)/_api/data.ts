import { apiUrl, secretStore } from "@/config";
import {
  AddMemberBody,
  AddToCartBody,
  AddUpdateMemberResponse,
  CheckoutTransactionBody,
  CheckoutTransactionResponse,
  CurrentCartResponse,
  DetailMemberResponse,
  DraftTransactionResponse,
  EndShiftBody,
  MemberListResponse,
  PendingTransactionBody,
  ProductListResponse,
  ResumeDraftResponse,
  ShiftEndResponse,
  ShiftResponse,
  ShiftStartResponse,
  StartShiftBody,
} from "./types";
import { getCookie } from "cookies-next/client";

export const currentCartQuery = async (): Promise<CurrentCartResponse> => {
  const token = getCookie(secretStore);
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
  const token = getCookie(secretStore);
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
  const token = getCookie(secretStore);
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
  page: number = 1,
): Promise<DraftTransactionResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/carts/pending?q=${q}&page=${page}&per_page=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as DraftTransactionResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const listMemberQuery = async (
  q: string = "",
  page: number = 1,
): Promise<MemberListResponse> => {
  const token = getCookie(secretStore);
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
  const token = getCookie(secretStore);
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
): Promise<ShiftStartResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/shifts/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as ShiftStartResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const endShiftPost = async (
  body: EndShiftBody,
): Promise<ShiftEndResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/shifts/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as ShiftEndResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const addToCartPost = async (
  body: AddToCartBody,
): Promise<AddUpdateMemberResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as AddUpdateMemberResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const removeItemCartPost = async (
  id: string,
): Promise<AddUpdateMemberResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as AddUpdateMemberResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const addMemberPost = async (
  body: AddMemberBody,
): Promise<AddUpdateMemberResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as AddUpdateMemberResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const updateMemberPost = async (
  body: AddMemberBody,
  id: string,
): Promise<ShiftResponse> => {
  const token = getCookie(secretStore);
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
  const token = getCookie(secretStore);
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

export const pendingTransactionPost = async (
  body: PendingTransactionBody,
): Promise<ShiftResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/pending`, {
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

export const emptyTransactionPost = async (): Promise<ShiftResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/current`, {
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

export const resumeDraftPut = async (
  code: string,
): Promise<ResumeDraftResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/${code}/resume-check`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as ResumeDraftResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
export const draftDelete = async (code: string): Promise<ShiftResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/carts/pending/${code}`, {
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

export const checkoutTransactionPost = async (
  body: CheckoutTransactionBody,
): Promise<CheckoutTransactionResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/transactions/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as CheckoutTransactionResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
