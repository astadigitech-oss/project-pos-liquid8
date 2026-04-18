import { toast } from "sonner";
import {
  AddMemberBody,
  AddToCartBody,
  EndShiftBody,
  StartShiftBody,
} from "./types";
import {
  addMemberPost,
  addToCartPost,
  deleteMemberPost,
  endShiftPost,
  startShiftPost,
  updateMemberPost,
} from "./data";
import { atomWithMutation } from "jotai-tanstack-query";

export const startShiftAtom = atomWithMutation(() => ({
  mutationFn: (body: StartShiftBody) => startShiftPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const endShiftAtom = atomWithMutation(() => ({
  mutationFn: (body: EndShiftBody) => endShiftPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const addToCartAtom = atomWithMutation(() => ({
  mutationFn: (body: AddToCartBody) => addToCartPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
export const addMemberAtom = atomWithMutation(() => ({
  mutationFn: (body: AddMemberBody) => addMemberPost(body),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));

export const updateMemberAtom = atomWithMutation(() => ({
  mutationFn: ({ body, id }: { body: AddMemberBody; id: string }) =>
    updateMemberPost(body, id),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
export const deleteMemberAtom = atomWithMutation(() => ({
  mutationFn: ({ id }: { id: string }) => deleteMemberPost(id),
  onSuccess: (data) => {
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
