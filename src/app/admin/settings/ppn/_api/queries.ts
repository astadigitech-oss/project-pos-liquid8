import { keepPreviousData } from "@tanstack/react-query";
import { listPPNQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";
import { ppnSearch } from "./atom";

export const listPPNAtom = atomWithQuery((get) => ({
  queryKey: ["list-ppn"],
  queryFn: () => listPPNQuery(get(ppnSearch)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
