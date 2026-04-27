import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import {
  UserBodyUpdate,
  UserDataResponse,
  UserInfo,
  UserPasswordBodyUpdate,
} from "./types";

export const userInfoQuery = async (): Promise<UserInfo> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = (await response.json()) as UserInfo;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const userDataUpdate = async (
  body: UserBodyUpdate,
): Promise<UserDataResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as UserDataResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};

export const userPasswordUpdate = async (
  body: UserPasswordBodyUpdate,
): Promise<UserDataResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(`${apiUrl}/api/users-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const res = (await response.json()) as UserDataResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
