import { atomWithMutation } from "jotai-tanstack-query";
import { transactionCancel } from "./data";
import { toast } from "sonner";

export const deleteTransactionAtom = atomWithMutation(() => ({
  mutationFn: ({ id, note }: { id: string; note: string }) =>
    transactionCancel({ id, body: { note } }),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
