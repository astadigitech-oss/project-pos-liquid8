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
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { selectedTransactionId } from "../../../../components/global/transactions/_api/atom";
import { deleteTransactionAtom } from "../_api/mutations";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cancelTransactionDialog } from "../_api/atom";

export const DialogCancelTransaction = () => {
  const queryClient = useQueryClient();
  const [note, setNote] = React.useState("");
  return (
    <Atom atom={cancelTransactionDialog}>
      {([open, setOpen]) => (
        <Atom atom={selectedTransactionId}>
          {([transactionId, setTransactionId]) => (
            <Dialog
              open={open}
              onOpenChange={(e) => {
                if (!e) {
                  setOpen(false);
                  setTransactionId("");
                }
              }}
            >
              <DialogContent showCloseButton={false} className={"min-w-md"}>
                <DialogHeader>
                  <DialogTitle>Batalkan Transaksi</DialogTitle>
                  <DialogDescription>
                    Apakah Anda yakin ingin membatalkan transaksi ini?
                  </DialogDescription>
                </DialogHeader>
                <Field className="gap-1">
                  <FieldLabel required>Catatan</FieldLabel>
                  <Textarea
                    placeholder="cth. kelebihan barang"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />
                </Field>
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
                      <Button
                        variant={"destructive"}
                        onClick={() =>
                          mutate(
                            { id: transactionId, note },
                            {
                              onSuccess: async () => {
                                setOpen(false);
                                await Promise.all([
                                  invalidate(queryClient, ["list-transaction"]),
                                  invalidate(queryClient, ["active-shift"]),
                                ]);
                              },
                            },
                          )
                        }
                      >
                        <Send className="size-3.5" />
                        Batalkan
                      </Button>
                    )}
                  </AtomValue>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </Atom>
      )}
    </Atom>
  );
};
