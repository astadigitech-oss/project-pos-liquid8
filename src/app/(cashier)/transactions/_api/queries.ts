import { atomWithQuery } from "jotai-tanstack-query";
import { transactionListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import { transactionPage, transactionSearch } from "./atom";

export const listtransactionAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-transaction",
    {
      q: get(transactionSearch),
      page: get(transactionPage),
    },
  ],
  queryFn: () =>
    transactionListQuery(get(transactionSearch), get(transactionPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
