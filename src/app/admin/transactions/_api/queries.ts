import { atomWithQuery } from "jotai-tanstack-query";
import { transactionListAdminPage, transactionListAdminSearch } from "./atom";
import { keepPreviousData } from "@tanstack/react-query";
import { transactionListAdminQuery } from "./data";

export const transactionListAdminAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-transaction-admin",
    { page: get(transactionListAdminPage), q: get(transactionListAdminSearch) },
  ],
  queryFn: () =>
    transactionListAdminQuery(
      get(transactionListAdminPage),
      get(transactionListAdminSearch),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
