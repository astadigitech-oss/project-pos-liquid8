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
import { Send, XIcon } from "lucide-react";
import { Atom, AtomValue, SetAtom } from "@suspensive/jotai";
import {
  customerSelectedId,
  draftAddDialog,
  paymentCustomer,
  paymentMethodSelected,
} from "../../_api/atoms";
import { pendingTransactionAtom } from "../../_api/mutation";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export const AddToDraft = () => {
  const queryClient = useQueryClient();

  return (
    <Atom atom={draftAddDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-md"}>
            <DialogHeader>
              <DialogTitle>Masukan Transaksi ke Draf</DialogTitle>
              <DialogDescription>
                Apakah anda yakin ingin menyimpan transaksi ini ke draf?
              </DialogDescription>
            </DialogHeader>
            <AtomValue atom={pendingTransactionAtom}>
              {({ mutate, isPending }) => (
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant={"outline"}>
                        <XIcon className="size-3.5" />
                        Tutup
                      </Button>
                    }
                  />
                  <Atom atom={customerSelectedId}>
                    {([customerId, setCustomerId]) => (
                      <SetAtom atom={paymentCustomer}>
                        {(setPayment) => (
                          <SetAtom atom={paymentMethodSelected}>
                            {(setPaymentMethod) => (
                              <Button
                                disabled={isPending}
                                variant={"diskonter"}
                                onClick={() =>
                                  mutate(
                                    {
                                      member_id: Number.parseFloat(customerId),
                                    },
                                    {
                                      onSuccess: async () => {
                                        setOpen(false);
                                        setCustomerId("");
                                        setPayment(0);
                                        setPaymentMethod(null);
                                        await Promise.all([
                                          invalidate(queryClient, [
                                            "current-cart",
                                          ]),
                                          invalidate(queryClient, [
                                            "list-pending",
                                          ]),
                                        ]);
                                      },
                                    },
                                  )
                                }
                              >
                                {isPending ? (
                                  <Spinner className="size-3.5" />
                                ) : (
                                  <Send className="size-3.5" />
                                )}
                                {isPending ? "Memproses..." : "Masukan ke Draf"}
                              </Button>
                            )}
                          </SetAtom>
                        )}
                      </SetAtom>
                    )}
                  </Atom>
                </DialogFooter>
              )}
            </AtomValue>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
