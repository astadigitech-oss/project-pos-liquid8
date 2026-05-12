import { atom } from "jotai";

export const detailTransactionDialog = atom<boolean>(false);
export const selectedTransactionId = atom<string>("");

export const cancelTransactionDialog = atom<boolean>(false);
