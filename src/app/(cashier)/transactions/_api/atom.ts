import { atom } from "jotai";

export const transactionSearch = atom<string>("");
export const transactionPage = atom<number>(1);

export const cancelTransactionDialog = atom<boolean>(false);
