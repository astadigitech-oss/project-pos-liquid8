import { keepPreviousData } from "@tanstack/react-query";
import { detailStaffQuery, listStaffQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";
import { selectedStaffId, staffPage, staffSearch } from "./atom";

export const listStaffAtom = atomWithQuery((get) => ({
  queryKey: ["list-staff"],
  queryFn: () => listStaffQuery(get(staffSearch), get(staffPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const detailStaffAtom = atomWithQuery((get) => ({
  queryKey: ["detail-staff", get(selectedStaffId)],
  queryFn: () => detailStaffQuery(get(selectedStaffId)),
  placeholderData: keepPreviousData,
  enabled: !!get(selectedStaffId),
  retry: 0,
}));
