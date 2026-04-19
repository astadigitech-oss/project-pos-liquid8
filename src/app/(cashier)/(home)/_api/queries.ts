import { keepPreviousData } from "@tanstack/react-query";
import {
  activeShiftQuery,
  currentCartQuery,
  detailMemberQuery,
  listDraftQuery,
  listMemberQuery,
  listProductQuery,
} from "./data";
import { atomWithQuery } from "jotai-tanstack-query";
import {
  customerId,
  customerPage,
  customerSearch,
  customerSelectedId,
  draftPage,
  draftSearch,
  productPage,
  productSearch,
} from "./atoms";

export const currentCartAtom = atomWithQuery(() => ({
  queryKey: ["current-cart"],
  queryFn: currentCartQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const activeShiftAtom = atomWithQuery(() => ({
  queryKey: ["active-shift"],
  queryFn: activeShiftQuery,
  retry: 0,
}));

export const listProductAtom = atomWithQuery((get) => ({
  queryKey: ["list-product", { q: get(productSearch), page: get(productPage) }],
  queryFn: () => listProductQuery(get(productSearch), get(productPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const listPendingAtom = atomWithQuery((get) => ({
  queryKey: ["list-pending", { q: get(draftSearch), page: get(draftPage) }],
  queryFn: () => listDraftQuery(get(draftSearch), get(draftPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const listMemberAtom = atomWithQuery((get) => ({
  queryKey: [
    "list-member",
    { q: get(customerSearch), page: get(customerPage) },
  ],
  queryFn: () => listMemberQuery(get(customerSearch), get(customerPage)),
  placeholderData: keepPreviousData,
  retry: 0,
}));
export const detailMemberAtom = atomWithQuery((get) => ({
  queryKey: ["detail-member", get(customerId)],
  queryFn: () => detailMemberQuery(get(customerId)),
  enabled: !!get(customerId),
  placeholderData: keepPreviousData,
  retry: 0,
}));
export const detailSelectedMemberAtom = atomWithQuery((get) => ({
  queryKey: ["detail-selected-member", get(customerSelectedId)],
  queryFn: () => detailMemberQuery(get(customerSelectedId)),
  enabled: !!get(customerSelectedId),
  placeholderData: keepPreviousData,
  retry: 0,
}));
