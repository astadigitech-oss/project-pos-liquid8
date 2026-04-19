import { atomWithQuery } from "jotai-tanstack-query";
import { shiftListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import { shiftEndDate, shiftPage, shiftSearch, shiftStartDate } from "./atom";

export const listShiftAtom = atomWithQuery((get) => ({
  queryKey: ["list-shift"],
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
