import { atom } from "jotai";

export const storeSelectedId = atom<string>("");
export const storePeriod = atom<"week" | "month">("week");

export const storeIdPage = atom<number>(1);
export const storeIdSearch = atom<string>("");
