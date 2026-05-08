import { atomWithMutation } from "jotai-tanstack-query";
import { StaffAddBody, StaffEditBody } from "./types";
import { addStaffMutation, updateStaffMutation } from "./data";
import { toast } from "sonner";

export const addStaffAtom = atomWithMutation(() => ({
  mutationFn: (body: StaffAddBody) => addStaffMutation(body),
  onSuccess: ({ data }) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const updateStaffAtom = atomWithMutation(() => ({
  mutationFn: ({ id, body }: { id: string; body: StaffEditBody }) =>
    updateStaffMutation(id, body),
  onSuccess: ({ data }) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
