import { atomWithMutation } from "jotai-tanstack-query";
import { transactionCancel } from "./data";
import { toast } from "sonner";

export const deleteTransactionAtom = atomWithMutation(() => ({
  mutationFn: (id: string) => transactionCancel(id),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
