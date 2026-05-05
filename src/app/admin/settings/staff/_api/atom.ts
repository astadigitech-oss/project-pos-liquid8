import { atom } from "jotai";

export const addEditStaffDialog = atom<
  "add" | "edit" | "password" | "delete" | ""
>("");
export const selectedStaffId = atom<string>("");

export const staffSearch = atom<string>("");
export const staffPage = atom<number>(1);
