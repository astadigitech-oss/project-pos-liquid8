import { atomWithQuery } from "jotai-tanstack-query";
import { memberListQuery, memberSummaryQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";
import {
  memberAdminMonth,
  memberAdminOrder,
  memberAdminPage,
  memberAdminSearch,
  memberAdminSort,
  memberAdminStoreId,
  memberAdminYear,
} from "./atom";

export const listMemberAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-admin-member",
    {
      q: get(memberAdminSearch),
      page: get(memberAdminPage),
      storeId: get(memberAdminStoreId),
      sort: get(memberAdminSort),
      order: get(memberAdminOrder),
      month: get(memberAdminMonth),
      year: get(memberAdminYear),
    },
  ],
  queryFn: () =>
    memberListQuery(
      get(memberAdminSearch),
      get(memberAdminPage),
      get(memberAdminStoreId),
      get(memberAdminSort),
      get(memberAdminOrder),
      get(memberAdminMonth),
      get(memberAdminYear),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const summaryMemberAtom = atomWithQuery((get) => ({
  queryKey: [
    "summary-admin-member",
    {
      storeId: get(memberAdminStoreId),
      month: get(memberAdminMonth),
      year: get(memberAdminYear),
    },
  ],
  queryFn: () =>
    memberSummaryQuery(
      get(memberAdminStoreId),
      get(memberAdminMonth),
      get(memberAdminYear),
    ),
  placeholderData: keepPreviousData,
  retry: 0,
}));
