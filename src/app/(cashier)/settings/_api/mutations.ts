import { atomWithMutation } from "jotai-tanstack-query";
import { userDataUpdate, userPasswordUpdate } from "./data";
import { toast } from "sonner";
import { UserBodyUpdate, UserPasswordBodyUpdate } from "./types";

export const updateUserDataAtom = atomWithMutation(() => ({
  mutationFn: (body: UserBodyUpdate) => userDataUpdate(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const userPasswordAtom = atomWithMutation(() => ({
  mutationFn: (body: UserPasswordBodyUpdate) => userPasswordUpdate(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
