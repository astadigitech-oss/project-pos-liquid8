import { atomWithQuery } from "jotai-tanstack-query";
import { shiftListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import { shiftAdminPage, shiftAdminSearch, shiftAdminStoreId } from "./atom";

export const listShiftAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-shift-admin",
    {
      q: get(shiftAdminSearch),
      page: get(shiftAdminPage),
      storeId: get(shiftAdminStoreId),
    },
  ],
  queryFn: () =>
    shiftListQuery(
      get(shiftAdminSearch),
      get(shiftAdminPage),
      get(shiftAdminStoreId),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
