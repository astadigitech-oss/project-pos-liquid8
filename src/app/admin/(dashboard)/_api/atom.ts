import { endOfMonth, startOfMonth } from "date-fns";
import { atom } from "jotai";

export const periodSalesAtom = atom<"week" | "month" | "custom">("week");

const now = new Date();
const startMonth = startOfMonth(now).toString();
const lastMonth = endOfMonth(now).toString();

export const dashboardStartDate = atom<string | undefined>(startMonth);
export const dashboardEndDate = atom<string | undefined>(lastMonth);
