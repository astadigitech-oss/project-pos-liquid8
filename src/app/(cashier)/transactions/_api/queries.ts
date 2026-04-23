import { atomWithQuery } from "jotai-tanstack-query";
import { transactionDetailQuery, transactionListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import {
  selectedTransactionId,
  transactionPage,
  transactionSearch,
} from "./atom";

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
export const detailtransactionAtom = atomWithQuery((get) => ({
  queryKey: ["detail-transaction", get(selectedTransactionId)],
  queryFn: () => transactionDetailQuery(get(selectedTransactionId)),
  enabled: !!get(selectedTransactionId),
  retry: 0,
}));
