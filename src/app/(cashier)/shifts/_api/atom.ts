import { atom } from "jotai";

const now = new Date().toString();

export const shiftSearch = atom<string>("");
export const shiftPage = atom<number>(1);
export const shiftStartDate = atom<string | undefined>(now);
export const shiftEndDate = atom<string | undefined>(now);
