import { atom } from "jotai";

export const cancelTransactionDialog = atom<boolean>(false);
export const detailTransactionDialog = atom<boolean>(false);
export const selectedTransactionId = atom<string>("");

export const transactionSearch = atom<string>("");
export const transactionPage = atom<number>(1);
