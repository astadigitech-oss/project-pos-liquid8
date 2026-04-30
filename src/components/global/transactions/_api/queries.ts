import { atomWithQuery } from "jotai-tanstack-query";
import { selectedTransactionId } from "./atom";
import { transactionDetailQuery } from "./data";

export const detailtransactionAtom = atomWithQuery((get) => ({
  queryKey: ["detail-transaction", get(selectedTransactionId)],
  queryFn: () => transactionDetailQuery(get(selectedTransactionId)),
  enabled: !!get(selectedTransactionId),
  retry: 0,
}));
