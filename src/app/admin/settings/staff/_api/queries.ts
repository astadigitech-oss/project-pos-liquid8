import { keepPreviousData } from "@tanstack/react-query";
import { listStaffQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";
import { staffPage, staffSearch } from "./atom";

export const listStaffAtom = atomWithQuery((get) => ({
  queryKey: ["list-staff"],
  queryFn: () => listStaffQuery(get(staffSearch), get(staffPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
