import { atomWithMutation } from "jotai-tanstack-query";
import { logoutData } from "./data";
import { toast } from "sonner";

export const logoutAtom = atomWithMutation(() => ({
  mutationFn: logoutData,
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
