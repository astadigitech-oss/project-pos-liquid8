import { atomWithMutation } from "jotai-tanstack-query";
import { toast } from "sonner";
import { transactionCancel } from "./data";

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
