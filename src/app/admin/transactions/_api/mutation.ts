import { atomWithMutation } from "jotai-tanstack-query";
import { approvedTransactionAdminMutation } from "./data";
import { toast } from "sonner";

export const approvedcancelledTransactionAtom = atomWithMutation(() => ({
  mutationFn: ({
    id,
    approve_status,
  }: {
    id: string;
    approve_status: "approved" | "rejected";
  }) => approvedTransactionAdminMutation(id, { approve_status }),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
