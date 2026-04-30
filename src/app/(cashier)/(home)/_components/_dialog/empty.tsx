import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash, XIcon } from "lucide-react";
import { Atom, AtomValue, SetAtom } from "@suspensive/jotai";
import {
  customerSelectedId,
  emptyTransactionDialog,
  paymentCustomer,
  paymentMethodSelected,
} from "../../_api/atoms";
import { emptyTransactionAtom } from "../../_api/mutation";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export const EmptyTransaction = () => {
  const queryClient = useQueryClient();
  return (
    <Atom atom={emptyTransactionDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-md"}>
            <DialogHeader>
              <DialogTitle>Batalkan Transaksi</DialogTitle>
              <DialogDescription>
                Apakah anda yakin ingin membatalkan transaksi ini? tindakan
                bersifat permanen.
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
              <AtomValue atom={emptyTransactionAtom}>
                {({ mutate, isPending }) => (
                  <SetAtom atom={paymentCustomer}>
                    {(setPayment) => (
                      <SetAtom atom={paymentMethodSelected}>
                        {(setPaymentMethod) => (
                          <SetAtom atom={customerSelectedId}>
                            {(setCustomerId) => (
                              <Button
                                variant={"destructive"}
                                onClick={() =>
                                  mutate(undefined, {
                                    onSuccess: async () => {
                                      setOpen(false);
                                      setCustomerId("");
                                      setPayment(0);
                                      setPaymentMethod(null);
                                      await invalidate(queryClient, [
                                        "current-cart",
                                      ]);
                                    },
                                  })
                                }
                                disabled={isPending}
                              >
                                {isPending ? (
                                  <Spinner className="size-3.5" />
                                ) : (
                                  <Trash className="size-3.5" />
                                )}
                                {isPending
                                  ? "Membatalkan..."
                                  : "Batalkan Transaksi"}
                              </Button>
                            )}
                          </SetAtom>
                        )}
                      </SetAtom>
                    )}
                  </SetAtom>
                )}
              </AtomValue>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
