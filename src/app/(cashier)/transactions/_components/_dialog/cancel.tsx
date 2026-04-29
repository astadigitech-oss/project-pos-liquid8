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
import { Atom, AtomValue } from "@suspensive/jotai";
import { Send, XIcon } from "lucide-react";
import React from "react";
import {
  cancelTransactionDialog,
  selectedTransactionId,
} from "../../_api/atom";
import { deleteTransactionAtom } from "../../_api/mutations";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export const DialogCancelTransaction = () => {
  const queryClient = useQueryClient();
  return (
    <Atom atom={cancelTransactionDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-md"}>
            <DialogHeader>
              <DialogTitle>Batalkan Transaksi</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin membatalkan transaksi ini?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant={"outline"}>
                    <XIcon className="size-3.5" />
                    Tutup
                  </Button>
                }
              />
              <AtomValue atom={deleteTransactionAtom}>
                {({ mutate }) => (
                  <AtomValue atom={selectedTransactionId}>
                    {(transactionId) => (
                      <Button
                        variant={"destructive"}
                        onClick={() =>
                          mutate(transactionId, {
                            onSuccess: async () => {
                              setOpen(false);
                              await Promise.all([
                                invalidate(queryClient, ["list-transaction"]),
                                invalidate(queryClient, ["active-shift"]),
                              ]);
                            },
                          })
                        }
                      >
                        <Send className="size-3.5" />
                        Konfirmasi pembatalan
                      </Button>
                    )}
                  </AtomValue>
                )}
              </AtomValue>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
