import { atomWithMutation } from "jotai-tanstack-query";
import { memberAddPost } from "./data";
import { MemberAddBody } from "./types";
import { toast } from "sonner";

export const addMemberAtom = atomWithMutation(() => ({
  mutationFn: (body: MemberAddBody) => memberAddPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
