import { atom } from "jotai";

export const memberAdminSearch = atom<string>("");
export const memberAdminPage = atom<number>(1);
export const memberAdminStoreId = atom<string>("");
export const memberAdminSort = atom<string>("");
export const memberAdminOrder = atom<"asc" | "desc">("desc");
export const memberAdminMonth = atom<string>("");
export const memberAdminYear = atom<string>("");
