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
import { LucideIcon, Send, Trash, XIcon } from "lucide-react";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  cashierDialog,
  customerSelectedId,
  paymentCustomer,
  paymentMethodSelected,
} from "@/app/(cashier)/(home)/_api/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  emptyTransactionAtom,
  pendingTransactionAtom,
} from "@/app/(cashier)/(home)/_api/mutation";

export const AlertDialog = () => {
  const queryClient = useQueryClient();
  const setPayment = useSetAtom(paymentCustomer);
  const setPaymentMethod = useSetAtom(paymentMethodSelected);
  const [customerId, setCustomerId] = useAtom(customerSelectedId);
  const { mutate: addToDraf, isPending: isAdding } = useAtomValue(
    pendingTransactionAtom,
  );
  const { mutate: emptyTransaction, isPending: isEmptying } =
    useAtomValue(emptyTransactionAtom);
  const [open, setOpen] = useAtom(cashierDialog);

  const titleDialog: Partial<Record<typeof open, string>> = {
    "draft-add": "Masukan Transaksi ke Draf",
    empty: "Batalkan Transaksi",
  };

  const descriptionDialog: Partial<Record<typeof open, string>> = {
    "draft-add": "Apakah anda yakin ingin menyimpan transaksi ini ke draf?",
    empty:
      "Apakah anda yakin ingin membatalkan transaksi ini? tindakan bersifat permanen.",
  };

  const iconLabelConfirm: Partial<
    Record<typeof open, { icon: LucideIcon; label: string }>
  > = {
    "draft-add": {
      icon: Send,
      label: "Masukan ke Draf",
    },
    empty: {
      icon: Trash,
      label: "Batalkan Transaksi",
    },
  };

  const Icon = iconLabelConfirm[open]?.icon ?? Send;

  const isLoading = isAdding || isEmptying;

  const handleSubmit = () => {
    if (open !== "draft-add" && open !== "empty") return;

    if (open === "draft-add") {
      return addToDraf(
        {
          member_id: Number.parseFloat(customerId),
        },
        {
          onSuccess: async () => {
            setOpen("");
            setCustomerId("");
            setPayment(0);
            setPaymentMethod(null);
            await Promise.all([
              invalidate(queryClient, ["current-cart"]),
              invalidate(queryClient, ["list-pending"]),
            ]);
          },
        },
      );
    }

    return emptyTransaction(undefined, {
      onSuccess: async () => {
        setOpen("");
        setCustomerId("");
        setPayment(0);
        setPaymentMethod(null);
        await invalidate(queryClient, ["current-cart"]);
      },
    });
  };

  return (
    <Dialog
      open={!!open && (open === "draft-add" || open === "empty")}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
        }
      }}
    >
      <DialogContent showCloseButton={false} className={"min-w-md"}>
        <DialogHeader>
          <DialogTitle>{titleDialog[open]}</DialogTitle>
          <DialogDescription>{descriptionDialog[open]}</DialogDescription>
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
          <Button
            disabled={isLoading}
            variant={"diskonter"}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Spinner className="size-3.5" />
            ) : (
              <Icon className="size-3.5" />
            )}
            {isLoading ? "Memproses..." : iconLabelConfirm[open]?.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
