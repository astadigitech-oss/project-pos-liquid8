import { atom } from "jotai";

export const shiftDialog = atom<string | null>(null);
export const draftDialog = atom<boolean>(false);
export const productDialog = atom<boolean>(false);
export const customerDialog = atom<boolean>(false);
export const isCustomer = atom<string>("");
export const productSearch = atom<string>("");
export const productPage = atom<number>(1);

export const customerSearch = atom<string>("");
export const customerPage = atom<number>(1);
export const customerId = atom<string>("");
