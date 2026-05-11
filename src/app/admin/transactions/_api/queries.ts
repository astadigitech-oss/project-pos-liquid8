import { atomWithQuery } from "jotai-tanstack-query";
import {
  transactionListAdminPage,
  transactionListAdminSearch,
  transactionListAdminStatus,
  transactionListAdminStoreId,
} from "./atom";
import { keepPreviousData } from "@tanstack/react-query";
import { transactionListAdminQuery } from "./data";

export const transactionListAdminAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-transaction-admin",
    {
      page: get(transactionListAdminPage),
      q: get(transactionListAdminSearch),
      storeId: get(transactionListAdminStoreId),
      status: get(transactionListAdminStatus),
    },
  ],
  queryFn: () =>
    transactionListAdminQuery(
      get(transactionListAdminPage),
      get(transactionListAdminSearch),
      get(transactionListAdminStoreId),
      get(transactionListAdminStatus),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
