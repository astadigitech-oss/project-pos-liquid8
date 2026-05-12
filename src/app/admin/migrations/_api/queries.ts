import { atomWithQuery } from "jotai-tanstack-query";
import { migrationListQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import {
  migrationAdminPage,
  migrationAdminSearch,
  migrationAdminStoreId,
} from "./atom";

export const listMigrationAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-migration",
    {
      q: get(migrationAdminSearch),
      page: get(migrationAdminPage),
      storeId: get(migrationAdminStoreId),
    },
  ],
  queryFn: () =>
    migrationListQuery(
      get(migrationAdminSearch),
      get(migrationAdminPage),
      get(migrationAdminStoreId),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
