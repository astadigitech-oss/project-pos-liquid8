import {
  cashierDialog,
  customerSelectedId,
  paymentCustomer,
  paymentMethodSelected,
} from "@/app/(cashier)/(home)/_api/atoms";
import { currentCartAtom } from "@/app/(cashier)/(home)/_api/queries";
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
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RupiahInput } from "@/components/ui/rupiah-input";
import {
  formatRupiah,
  invalidate,
  numericString,
  paymentMethods,
} from "@/lib/utils";
import { useAtom, useAtomValue } from "jotai";
import {
  Banknote,
  CreditCard,
  Printer,
  PrinterX,
  QrCode,
  XIcon,
} from "lucide-react";
import React from "react";
import { Alert } from "../alert";
import { useQueryClient } from "@tanstack/react-query";
import { printAction, printCheck } from "@/lib/print-action";
import { checkoutTransactionAtom } from "@/app/(cashier)/(home)/_api/mutation";
import { CheckoutTransactionResponse } from "@/app/(cashier)/(home)/_api/types";
import { transactionReciept } from "@/lib/receipt-template";

export const CheckoutDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useAtom(cashierDialog);
  const [paymentMethod, setPaymentMethod] = useAtom(paymentMethodSelected);
  const [payment, setPayment] = useAtom(paymentCustomer);
  const { data } = useAtomValue(currentCartAtom);
  const { mutate } = useAtomValue(checkoutTransactionAtom);
  const [customerId, setCustomerId] = useAtom(customerSelectedId);

  const handleCheckout = async () => {
    return mutate(
      {
        member_id: Number.parseFloat(customerId),
        grand_total: data?.resource.total_amount ?? 0,
        paid_amount: payment,
        payment_method: paymentMethod ?? "",
      },
      {
        onSuccess: async (data) => {
          setOpen("");
          setPayment(0);
          setPaymentMethod(null);
          setCustomerId("");
          await Promise.all([
            invalidate(queryClient, ["current-cart"]),
            invalidate(queryClient, ["active-shift"]),
            invalidate(queryClient, [
              "detail-shift",
              data.resource.shift_id?.toString(),
            ]),
          ]);
        },
      },
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await printCheck();
    if (!status) return;
    return mutate(
      {
        member_id: Number.parseFloat(customerId),
        grand_total: data?.resource.total_amount ?? 0,
        paid_amount: payment,
        payment_method: paymentMethod ?? "",
      },
      {
        onSuccess: async (data) => {
          setOpen("");
          setPayment(0);
          setPaymentMethod(null);
          handlePrint(data);
          setCustomerId("");
          await Promise.all([
            invalidate(queryClient, ["current-cart"]),
            invalidate(queryClient, ["active-shift"]),
            invalidate(queryClient, [
              "detail-shift",
              data.resource.shift_id?.toString(),
            ]),
          ]);
        },
      },
    );
  };

  const handlePrint = (data: CheckoutTransactionResponse) => {
    const paymentMethodSelected = data?.resource.payment_method;
    const paymentMethodLabel = paymentMethods.find(
      (i) => i.value === paymentMethodSelected,
    )?.label;

    const bytes = transactionReciept(data.resource, paymentMethodLabel);

    printAction(bytes);
  };

  return (
    <Dialog
      open={!!open && open === "checkout"}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
        }
      }}
    >
      <DialogContent showCloseButton={false} className={"min-w-2xl"}>
        <DialogHeader>
          <DialogTitle>Selesaikan Transaksi</DialogTitle>
          <DialogDescription>
            Pastikan metode dan detail pembayaran sudah sesuai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col border rounded-lg col-span-2 text-xs">
              <div className="flex items-center font-semibold bg-gray-100 px-3 h-8 text-sm border-b">
                <p>Rangkuman Transaksi</p>
              </div>
              <div className="flex items-center justify-between px-3 h-8 border-b">
                <p>Produk:</p>
                <p>{(data?.resource.products?.length ?? 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between px-3 h-8 border-b">
                <p>Subtotal:</p>
                <p>{formatRupiah(data?.resource.subtotal ?? 0)}</p>
              </div>
              <div className="flex items-center justify-between px-3 h-8 border-b">
                <p>PPN:</p>
                <p>{formatRupiah(data?.resource.ppn.amount ?? 0)}</p>
              </div>
              <div className="flex items-center justify-between px-3 h-8 border-b">
                <p>Pembulatan:</p>
                <p>{formatRupiah(data?.resource.pembulatan ?? 0)}</p>
              </div>
              <div className="flex items-center justify-between px-3 h-8 font-semibold text-sm">
                <p>Total:</p>
                <p>{formatRupiah(data?.resource.total_amount ?? 0)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 col-span-3 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">Metode Pembayaran</p>
                <RadioGroup
                  className={"grid grid-cols-3"}
                  value={paymentMethod}
                  onValueChange={(e) => {
                    console.log(e);
                    if (e === "qris" || e === "transfer") {
                      setPayment(data?.resource.total_amount ?? 0);
                    } else {
                      setPayment(0);
                    }
                    return setPaymentMethod(e);
                  }}
                >
                  <FieldLabel>
                    <Field orientation={"horizontal"}>
                      <FieldContent className="flex-row items-center gap-1">
                        <Banknote className="size-3.5" />
                        <FieldTitle className="text-xs">Tunai</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={"cash"} />
                    </Field>
                  </FieldLabel>
                  <FieldLabel>
                    <Field orientation={"horizontal"}>
                      <FieldContent className="flex-row items-center gap-1">
                        <CreditCard className="size-3.5" />
                        <FieldTitle className="text-xs">Transfer</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={"transfer"} />
                    </Field>
                  </FieldLabel>
                  <FieldLabel>
                    <Field orientation={"horizontal"}>
                      <FieldContent className="flex-row items-center gap-1">
                        <QrCode className="size-3.5" />
                        <FieldTitle className="text-xs">QRIS</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={"qris"} />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </div>
              <Field className="gap-1">
                <FieldLabel>Nominal Pembayaran</FieldLabel>
                <RupiahInput
                  value={payment}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    requestAnimationFrame(() => {
                      el.setSelectionRange(el.value.length, el.value.length);
                    });
                  }}
                  onValueChange={(v) =>
                    setPayment(Number.parseFloat(numericString(v ?? "0")))
                  }
                  readOnly={paymentMethod !== "cash"}
                  className="h-10 text-base! font-semibold read-only:cursor-default"
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel>Kembalian</FieldLabel>
                <RupiahInput
                  value={payment - (data?.resource.total_amount ?? 0)}
                  readOnly
                  className="bg-red-100 border-red-200 focus-visible:border-red-200 cursor-default font-medium"
                />
              </Field>
            </div>
          </div>
          {(!paymentMethod ||
            (paymentMethod === "cash" &&
              payment < (data?.resource.total_amount ?? 0))) && (
            <div className="flex items-center gap-2">
              {!paymentMethod && (
                <Alert
                  className="w-full"
                  label="Metode pembayaran belum di pilih"
                />
              )}
              {paymentMethod === "cash" &&
                payment < (data?.resource.total_amount ?? 0) && (
                  <Alert className="w-full" label="Uang Tunai Kurang" />
                )}
            </div>
          )}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant={"outline"}>
                  <XIcon className="size-3.5" />
                  Tutup
                </Button>
              }
            />
            <Button
              disabled={
                !paymentMethod ||
                (paymentMethod === "cash" &&
                  payment < (data?.resource.total_amount ?? 0))
              }
              type="button"
              onClick={handleCheckout}
            >
              <PrinterX className="size-3.5" />
              Tanpa Struk
            </Button>
            <Button
              disabled={
                !paymentMethod ||
                (paymentMethod === "cash" &&
                  payment < (data?.resource.total_amount ?? 0))
              }
              type="submit"
            >
              <Printer className="size-3.5" />
              Selesaikan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
