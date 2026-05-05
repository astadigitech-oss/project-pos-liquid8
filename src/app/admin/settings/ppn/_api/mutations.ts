import { atomWithMutation } from "jotai-tanstack-query";
import { toast } from "sonner";
import { AddPpnBody, UpdatePpnBody } from "./types";
import { addPPNPost, deletePPNDelete, updatePPNPut } from "./data";

export const addPpnAtom = atomWithMutation(() => ({
  mutationFn: (body: AddPpnBody) => addPPNPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const updatePpnAtom = atomWithMutation(() => ({
  mutationFn: ({ id, body }: { id: number; body: UpdatePpnBody }) =>
    updatePPNPut(id, body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const deletePpnAtom = atomWithMutation(() => ({
  mutationFn: ({ id }: { id: number }) => deletePPNDelete(id),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
