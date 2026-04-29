import { atom } from "jotai";

export const periodSalesAtom = atom<"week" | "month">("week");
