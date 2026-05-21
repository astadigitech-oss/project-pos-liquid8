import { atomWithQuery } from "jotai-tanstack-query";
import { dashboardIndexQuery, dashboardSalesQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import { dashboardEndDate, dashboardStartDate, periodSalesAtom } from "./atom";

export const dashboardIndexAtom = atomWithQuery(() => ({
  queryKey: ["dashboard-index"],
  queryFn: dashboardIndexQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const dashboardSalesAtom = atomWithQuery((get) => ({
  queryKey: [
    "dashboard-sales",
    {
      period: get(periodSalesAtom),
      startDate:
        get(periodSalesAtom) === "custom" ? get(dashboardStartDate) : undefined,
      endDate:
        get(periodSalesAtom) === "custom" ? get(dashboardEndDate) : undefined,
    },
  ],
  queryFn: () =>
    dashboardSalesQuery(
      get(periodSalesAtom),
      get(periodSalesAtom) === "custom" ? get(dashboardStartDate) : undefined,
      get(periodSalesAtom) === "custom" ? get(dashboardEndDate) : undefined,
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
