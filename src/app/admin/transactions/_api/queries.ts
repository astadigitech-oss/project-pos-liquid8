import { atomWithQuery } from "jotai-tanstack-query";
import {
  transactionAdminEndDate,
  transactionAdminStartDate,
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
      startDate: get(transactionAdminStartDate),
      endDate: get(transactionAdminEndDate),
    },
  ],
  queryFn: () =>
    transactionListAdminQuery(
      get(transactionListAdminPage),
      get(transactionListAdminSearch),
      get(transactionListAdminStoreId),
      get(transactionListAdminStatus),
      get(transactionAdminStartDate),
      get(transactionAdminEndDate),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
