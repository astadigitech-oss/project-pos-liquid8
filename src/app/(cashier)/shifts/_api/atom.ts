import { atom } from "jotai";

export const detailShiftDialog = atom<boolean>(false);
export const detailShiftId = atom<string>("");

export const shiftSearch = atom<string>("");
export const shiftPage = atom<number>(1);
export const shiftStartDate = atom<string>("2026-04-01");
export const shiftEndDate = atom<string>("2026-04-30");
