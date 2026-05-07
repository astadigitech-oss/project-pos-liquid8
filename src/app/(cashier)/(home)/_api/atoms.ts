import { atom } from "jotai";

export const checkoutTransactionDialog = atom<boolean>(false);
export const cashierDialog = atom<
  | "shift-end"
  | "shift-start"
  | "product"
  | "draft-list"
  | "draft-add"
  | "customer-add"
  | "customer-list"
  | "customer-edit"
  | "customer-delete"
  | "empty"
  | "checkout"
  | "payment"
  | "packaging"
  | ""
>("");
export const isCustomer = atom<string>("");
export const productSearch = atom<string>("");
export const productPage = atom<number>(1);

export const draftSearch = atom<string>("");
export const draftPage = atom<number>(1);

export const plasticPrice = atom<number>(1);
export const plasticQty = atom<number>(1);

export const customerSearch = atom<string>("");
export const customerPage = atom<number>(1);
export const customerId = atom<string>("");
export const customerSelectedId = atom<string>("");

export const paymentMethodSelected = atom<string | null>(null);
export const paymentCustomer = atom<number>(0);
