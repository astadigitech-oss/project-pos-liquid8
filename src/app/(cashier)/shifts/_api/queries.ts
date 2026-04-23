import { atomWithQuery } from "jotai-tanstack-query";
import { shiftDetailQuery, shiftListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import {
  detailShiftId,
  shiftEndDate,
  shiftPage,
  shiftSearch,
  shiftStartDate,
} from "./atom";

export const listShiftAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-shift",
    {
      q: get(shiftSearch),
      page: get(shiftPage),
      startDate: get(shiftStartDate),
      endDate: get(shiftEndDate),
    },
  ],
  queryFn: () =>
    shiftListQuery(
      get(shiftSearch),
      get(shiftPage),
      get(shiftStartDate),
      get(shiftEndDate),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const detailShiftAtom = atomWithQuery((get) => ({
  queryKey: ["detail-shift", get(detailShiftId)],
  queryFn: () => shiftDetailQuery(get(detailShiftId)),
  enabled: !!get(detailShiftId),
  retry: 0,
}));
