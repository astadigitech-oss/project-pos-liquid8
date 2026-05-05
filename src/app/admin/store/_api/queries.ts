import { atomWithQuery } from "jotai-tanstack-query";
import { listStorePage, listStoreSearch } from "./atom";
import { keepPreviousData } from "@tanstack/react-query";
import { transactionListAdminQuery } from "./data";

export const transactionListAdminAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-store",
    { page: get(listStorePage), q: get(listStoreSearch) },
  ],
  queryFn: () =>
    transactionListAdminQuery(get(listStorePage), get(listStoreSearch)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
