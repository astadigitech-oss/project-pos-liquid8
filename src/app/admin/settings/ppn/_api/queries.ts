import { keepPreviousData } from "@tanstack/react-query";
import { listPPNQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";

export const listPPNAtom = atomWithQuery(() => ({
  queryKey: ["list-ppn"],
  queryFn: listPPNQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));
