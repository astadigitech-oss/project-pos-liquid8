import { atomWithQuery } from "jotai-tanstack-query";
import { dashboardIndexQuery, dashboardSalesQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import { periodSalesAtom } from "./atom";

export const dashboardIndexAtom = atomWithQuery(() => ({
  queryKey: ["dashboard-index"],
  queryFn: dashboardIndexQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const dashboardSalesAtom = atomWithQuery((get) => ({
  queryKey: ["dashboard-sales", { period: get(periodSalesAtom) }],
  queryFn: () => dashboardSalesQuery(get(periodSalesAtom)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
