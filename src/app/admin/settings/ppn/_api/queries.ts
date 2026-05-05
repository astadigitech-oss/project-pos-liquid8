import { keepPreviousData } from "@tanstack/react-query";
import { detailPPNQuery, listPPNQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";
import { ppnSearch, selectedDialogId } from "./atom";

export const listPPNAtom = atomWithQuery((get) => ({
  queryKey: ["list-ppn", { q: get(ppnSearch) }],
  queryFn: () => listPPNQuery(get(ppnSearch)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
export const detailPPNAtom = atomWithQuery((get) => ({
  queryKey: ["detail-ppn", get(selectedDialogId)],
  queryFn: () => detailPPNQuery(get(selectedDialogId)),
  placeholderData: keepPreviousData,
  enabled: !!get(selectedDialogId),
  retry: 0,
}));
