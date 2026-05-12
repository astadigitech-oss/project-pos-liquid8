import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { ArrowLeft, Check, XIcon } from "lucide-react";
import React from "react";
import {
  approvedTransactionAdminDialog,
  approvedTransactionAdminSelectedId,
} from "../../_api/atom";
import { Atom, AtomValue } from "@suspensive/jotai";
import { approvedcancelledTransactionAtom } from "../../_api/mutation";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export const AlertDialog = () => {
  const [open, setOpen] = useAtom(approvedTransactionAdminDialog);
  const queryClient = useQueryClient();

  return (
    <Dialog
      open={!!open}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembatalan Transaksi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin membatalkan transaksi ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <DialogClose
              render={
                <Button variant={"outline"}>
                  <ArrowLeft className="size-3.5" />
                  Tutup
                </Button>
              }
            />
            <Atom atom={approvedTransactionAdminSelectedId}>
              {([selectedId, setSelectedId]) => (
                <AtomValue atom={approvedcancelledTransactionAtom}>
                  {({ mutate }) => (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outlineDestructive"
                        onClick={() =>
                          mutate(
                            { approve_status: "rejected", id: selectedId },
                            {
                              onSuccess: async () => {
                                setSelectedId("");
                                setOpen("");
                                await invalidate(queryClient, [
                                  "list-transaction-admin",
                                ]);
                              },
                            },
                          )
                        }
                      >
                        <XIcon className="size-3.5" />
                        Tolak
                      </Button>
                      <Button
                        onClick={() =>
                          mutate(
                            { approve_status: "approved", id: selectedId },
                            {
                              onSuccess: async () => {
                                setSelectedId("");
                                setOpen("");
                                await invalidate(queryClient, [
                                  "list-transaction-admin",
                                ]);
                              },
                            },
                          )
                        }
                      >
                        <Check className="size-3.5" />
                        Setuju
                      </Button>
                    </div>
                  )}
                </AtomValue>
              )}
            </Atom>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
