import { atomWithMutation } from "jotai-tanstack-query";
import { exportDetailStoreMutation } from "./data";
import { toast } from "sonner";

export const exportDetailTransactionAtom = atomWithMutation(() => ({
  mutationFn: ({ id }: { id: string }) => exportDetailStoreMutation(id),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
