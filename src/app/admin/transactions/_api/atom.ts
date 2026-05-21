import { atom } from "jotai";

export const transactionListAdminSearch = atom<string>("");
export const transactionListAdminPage = atom<number>(1);
export const transactionListAdminStoreId = atom<string>("");
export const transactionListAdminStatus = atom<string>("");

export const approvedTransactionAdminDialog = atom<"confirm" | "cancel" | "">(
  "",
);
export const approvedTransactionAdminSelectedId = atom<string>("");

export const transactionAdminStartDate = atom<string | undefined>(undefined);
export const transactionAdminEndDate = atom<string | undefined>(undefined);
export const transactionExportAdminStartDate = atom<string | undefined>(
  undefined,
);
export const transactionExportAdminEndDate = atom<string | undefined>(
  undefined,
);
