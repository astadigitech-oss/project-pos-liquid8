import {
  cashierDialog,
  paymentMethodSelected,
} from "@/app/(cashier)/(home)/_api/atoms";
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
import { useAtom, useSetAtom } from "jotai";
import { Banknote, CreditCard, QrCode, Send, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const PaymentMethodDialog = () => {
  const [localMethod, setLocalMethod] = React.useState<
    "cash" | "card" | "qris" | ""
  >("");
  const [open, setOpen] = useAtom(cashierDialog);
  const setPaymentMethod = useSetAtom(paymentMethodSelected);

  const handleSubmit = () => {
    if (!localMethod) return toast.error("Metode pembayaran tidak dipilih");
    setOpen("");
    setPaymentMethod(localMethod);
  };

  return (
    <Dialog
      open={!!open && open === "payment"}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
        }
      }}
    >
      <DialogContent showCloseButton={false} className={"min-w-md"}>
        <DialogHeader>
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
          <DialogDescription>
            Pastikan anda memilih metode pembayaran dengan benar
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant={"outlineDestructive"}
            data-active={localMethod === "cash"}
            className={"flex flex-col gap-1 h-24 data-[active=true]:bg-red-100"}
            onClick={() => {
              setLocalMethod("cash");
            }}
          >
            <Banknote className="size-8 stroke-[1.25] flex-none" />
            <p className="px-5 whitespace-pre-wrap text-center text-xs">
              Pembayaran Tunai
            </p>
          </Button>
          <Button
            type="button"
            variant={"outlineDestructive"}
            data-active={localMethod === "card"}
            className={"flex flex-col gap-1 h-24 data-[active=true]:bg-red-100"}
            onClick={() => {
              setLocalMethod("card");
            }}
          >
            <CreditCard className="size-8 stroke-[1.25] flex-none" />
            <p className="px-5 whitespace-pre-wrap text-center text-xs">
              Pembayaran EDC
            </p>
          </Button>
          <Button
            type="button"
            variant={"outlineDestructive"}
            data-active={localMethod === "qris"}
            className={"flex flex-col gap-1 h-24 data-[active=true]:bg-red-100"}
            onClick={() => {
              setLocalMethod("qris");
            }}
          >
            <QrCode className="size-8 stroke-[1.25] flex-none" />
            <p className="px-5 whitespace-pre-wrap text-center text-xs">
              Pembayaran QRIS
            </p>
          </Button>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant={"outline"}>
                <X className="size-3.5" />
                Tutup
              </Button>
            }
          />
          <Button onClick={() => handleSubmit()}>
            <Send className="size-3.5" />
            Konfirmasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
