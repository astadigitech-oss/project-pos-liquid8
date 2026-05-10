import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Atom, AtomValue, SetAtom } from "@suspensive/jotai";
import { Trash, X } from "lucide-react";
import React from "react";
import { deleteStaffAtom } from "../../_api/mutations";
import { detailStaffAtom } from "../../_api/queries";
import { useAtomValue } from "jotai";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { selectedStaffId, staffDialog } from "../../_api/atom";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Delay } from "@suspensive/react";

export const Delete = () => {
  const queryClient = useQueryClient();
  const { isSuccess, isRefetching } = useAtomValue(detailStaffAtom);

  if (!isSuccess || isRefetching) return <Loader />;
  return (
    <Delay ms={500} fallback={<Loader />}>
      <DialogFooter>
        <DialogClose
          render={
            <Button type="button" variant={"outline"}>
              <X className="size-3.5" />
              Batal
            </Button>
          }
        />
        <SetAtom atom={staffDialog}>
          {(setOpen) => (
            <Atom atom={selectedStaffId}>
              {([selectedId, setSelectedId]) => (
                <AtomValue atom={deleteStaffAtom}>
                  {({ mutate, isPending }) => (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        mutate(selectedId, {
                          onSuccess: async () => {
                            setSelectedId("");
                            setOpen("");
                            await invalidate(queryClient, ["list-staff"]);
                          },
                        });
                      }}
                      type="button"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Spinner className="size-3.5" />
                      ) : (
                        <Trash className="size-3.5" />
                      )}
                      {isPending ? "Menghapus..." : "Hapus"}
                    </Button>
                  )}
                </AtomValue>
              )}
            </Atom>
          )}
        </SetAtom>
      </DialogFooter>
    </Delay>
  );
};

const Loader = () => {
  return (
    <DialogFooter>
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2 text-xs">
          <Spinner className="size-4" />
          <p>Memuat data...</p>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-9 bg-gray-200" />
          <Skeleton className="w-20 h-9 bg-gray-200" />
        </div>
      </div>
    </DialogFooter>
  );
};
