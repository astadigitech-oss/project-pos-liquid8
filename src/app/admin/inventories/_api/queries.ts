import { atomWithQuery } from "jotai-tanstack-query";
import { inventoryListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import {
  inventoryAdminPage,
  inventoryAdminSearch,
  inventoryAdminStoreId,
} from "./atom";

export const listInventoryAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-inventory",
    {
      q: get(inventoryAdminSearch),
      page: get(inventoryAdminPage),
      storeId: get(inventoryAdminStoreId),
    },
  ],
  queryFn: () =>
    inventoryListQuery(
      get(inventoryAdminSearch),
      get(inventoryAdminPage),
      get(inventoryAdminStoreId),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
