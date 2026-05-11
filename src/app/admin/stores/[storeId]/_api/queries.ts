import { atomWithQuery } from "jotai-tanstack-query";
import {
  storeIdPage,
  storeIdSearch,
  storePeriod,
  storeSelectedId,
} from "./atom";
import { storeChartQuery, storeDetailQuery } from "./data";
import { keepPreviousData } from "@tanstack/react-query";

export const storeDetailAtom = atomWithQuery((get) => ({
  queryKey: [
    "store-detail",
    get(storeSelectedId),
    { page: get(storeIdPage), q: get(storeIdSearch) },
  ],
  queryFn: () =>
    storeDetailQuery(
      get(storeSelectedId),
      get(storeIdPage),
      get(storeIdSearch),
    ),
  enabled: !!get(storeSelectedId),
  placeholderData: keepPreviousData,
  retry: 0,
}));

export const storeChartAtom = atomWithQuery((get) => ({
  queryKey: ["store-chart", get(storeSelectedId), { period: get(storePeriod) }],
  queryFn: () => storeChartQuery(get(storeSelectedId), get(storePeriod)),
  enabled: !!get(storeSelectedId),
  retry: 0,
}));
