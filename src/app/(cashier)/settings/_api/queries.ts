import { keepPreviousData } from "@tanstack/react-query";
import { userInfoQuery } from "./data";
import { atomWithQuery } from "jotai-tanstack-query";

export const userInfoAtom = atomWithQuery(() => ({
  queryKey: ["user-info"],
  queryFn: userInfoQuery,
  placeholderData: keepPreviousData,
  retry: 0,
}));
