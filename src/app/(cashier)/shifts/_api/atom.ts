import { atom } from "jotai";

export const detailShiftDialog = atom<boolean>(false);
export const detailShiftId = atom<string>("");

export const shiftSearch = atom<string>("");
export const shiftPage = atom<number>(1);
export const shiftStartDate = atom<string>("");
export const shiftEndDate = atom<string>("");
