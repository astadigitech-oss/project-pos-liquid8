import { atom } from "jotai";

export const cancelTransactionDialog = atom<boolean>(false);
export const detailTransactionDialog = atom<boolean>(false);
export const selectedTransactionId = atom<string>("");
