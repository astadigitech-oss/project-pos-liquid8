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
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, Printer, QrCode, XIcon } from "lucide-react";
import { formatRupiah, invalidate, paymentMethods } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Atom, AtomValue } from "@suspensive/jotai";
import {
  checkoutTransactionDialog,
  customerSelectedId,
  paymentCustomer,
  paymentMethodSelected,
} from "../../_api/atoms";
import { currentCartAtom } from "../../_api/queries";
import { checkoutTransactionAtom } from "../../_api/mutation";
import { useQueryClient } from "@tanstack/react-query";

export const CheckoutTransaction = () => {
  const queryClient = useQueryClient();
  return (
    <Atom atom={checkoutTransactionDialog}>
      {([open, setOpen]) => (
        <AtomValue atom={currentCartAtom}>
          {({ data }) => (
            <Atom atom={paymentCustomer}>
              {([payment, setPayment]) => (
                <Atom atom={paymentMethodSelected}>
                  {([paymentMethod, setPaymentMethod]) => (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogContent
                        showCloseButton={false}
                        className={"min-w-md"}
                      >
                        <DialogHeader>
                          <DialogTitle>Apakah Pembayaran Berhasil?</DialogTitle>
                          <DialogDescription>
                            Sebelum mencetak struk pastikan pembayaran customer
                            berhasil terlebih dahulu.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="border rounded-md overflow-hidden flex flex-col">
                          <div className="px-3 h-10 flex items-center bg-gray-100 font-medium">
                            <p>Rangkuman Transaksi</p>
                          </div>
                          <div className="flex flex-col text-sm">
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Total barang:</p>
                              <p>
                                {(
                                  data?.resource.items?.length ?? 0
                                ).toLocaleString()}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Total harga:</p>
                              <p>
                                {formatRupiah(data?.resource.total_amount ?? 0)}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Metode Pembayaran:</p>
                              <div className="flex items-center gap-1">
                                {paymentMethod === "cash" && (
                                  <Banknote className="size-3.5" />
                                )}
                                {paymentMethod === "transfer" && (
                                  <CreditCard className="size-3.5" />
                                )}
                                {paymentMethod === "qris" && (
                                  <QrCode className="size-3.5" />
                                )}
                                <p>
                                  {
                                    paymentMethods.find(
                                      (i) => i.value === paymentMethod,
                                    )?.label
                                  }
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Nominal Pembayaran:</p>
                              <p>{formatRupiah(payment)}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Kembalian:</p>
                              <p>
                                {formatRupiah(
                                  payment - (data?.resource.total_amount ?? 0),
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose
                            render={
                              <Button variant={"outline"}>
                                <XIcon className="size-3.5" />
                                Tutup
                              </Button>
                            }
                          />
                          <AtomValue atom={checkoutTransactionAtom}>
                            {({ mutate, isPending }) => (
                              <Atom atom={customerSelectedId}>
                                {([customerId, setCustomerId]) => (
                                  <Button
                                    disabled={isPending}
                                    onClick={() =>
                                      mutate(
                                        {
                                          member_id:
                                            Number.parseFloat(customerId),
                                          grand_total:
                                            data?.resource.total_amount ?? 0,
                                          paid_amount: payment,
                                          payment_method: paymentMethod ?? "",
                                        },
                                        {
                                          onSuccess: async (data) => {
                                            setOpen(false);
                                            setPayment(0);
                                            setPaymentMethod(null);
                                            setCustomerId("");
                                            await Promise.all([
                                              invalidate(queryClient, [
                                                "current-cart",
                                              ]),
                                              invalidate(queryClient, [
                                                "detail-shift",
                                                data.resource.shift_id.toString(),
                                              ]),
                                            ]);
                                          },
                                        },
                                      )
                                    }
                                  >
                                    <Printer className="size-3.5" />
                                    Selesaikan dan Cetak Struk
                                  </Button>
                                )}
                              </Atom>
                            )}
                          </AtomValue>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </Atom>
              )}
            </Atom>
          )}
        </AtomValue>
      )}
    </Atom>
  );
};
