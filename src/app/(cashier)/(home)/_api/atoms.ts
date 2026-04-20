import { atom } from "jotai";

export const shiftDialog = atom<string | null>(null);
export const draftListDialog = atom<boolean>(false);
export const draftAddDialog = atom<boolean>(false);
export const productDialog = atom<boolean>(false);
export const customerDialog = atom<boolean>(false);
export const emptyTransactionDialog = atom<boolean>(false);
export const checkoutTransactionDialog = atom<boolean>(false);
export const isCustomer = atom<string>("");
export const productSearch = atom<string>("");
export const productPage = atom<number>(1);

export const draftSearch = atom<string>("");
export const draftPage = atom<number>(1);

export const customerSearch = atom<string>("");
export const customerPage = atom<number>(1);
export const customerId = atom<string>("");
export const customerSelectedId = atom<string>("");

export const paymentMethodSelected = atom<string | null>(null);
export const paymentCustomer = atom<number>(0);
