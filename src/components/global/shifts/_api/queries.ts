import { atomWithQuery } from "jotai-tanstack-query";
import { detailShiftId } from "./atom";
import { shiftDetailQuery } from "./data";

export const detailShiftAtom = atomWithQuery((get) => ({
  queryKey: ["detail-shift", get(detailShiftId)],
  queryFn: () => shiftDetailQuery(get(detailShiftId)),
  enabled: !!get(detailShiftId),
  retry: 0,
}));
