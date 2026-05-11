import { atomWithQuery } from "jotai-tanstack-query";
import { listStorePage, listStoreSearch } from "./atom";
import { keepPreviousData } from "@tanstack/react-query";
import { listStoreQuery, listStoreSelectQuery } from "./data";

export const listStoreAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-store",
    { page: get(listStorePage), q: get(listStoreSearch) },
  ],
  queryFn: () => listStoreQuery(get(listStorePage), get(listStoreSearch)),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const listStoreSelectAtom = atomWithQuery(() => ({
  queryKey: ["select-store"],
  queryFn: listStoreSelectQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));
