import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai"; // Gunakan hook standar untuk readability
import { Printer, PrinterX, Send, XIcon } from "lucide-react";

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RupiahInput } from "@/components/ui/rupiah-input";
import { Textarea } from "@/components/ui/textarea";

import { endShiftAtom, startShiftAtom } from "../../_api/mutation";
import { activeShiftAtom } from "../../_api/queries";
import { cashierDialog } from "../../_api/atoms";
import { formatRupiah, invalidate, numericString } from "@/lib/utils";
import { printAction, printCheck } from "@/lib/print-action";
import { ShiftEndResponse } from "../../_api/types";
import { userInfoAtom } from "@/app/(cashier)/settings/_api/queries";
import { shiftReceipt } from "@/lib/receipt-template";

const formSchema = z.object({
  cash: z.string().min(1, "Saldo wajib diisi"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ShiftDialog = () => {
  const queryClient = useQueryClient();

  // State & Atoms
  const [open, setOpen] = useAtom(cashierDialog);
  const { data, isSuccess: isActive } = useAtomValue(activeShiftAtom);
  const { mutate: startShift, isPending: isStarting } =
    useAtomValue(startShiftAtom);
  const { data: userInfo } = useAtomValue(userInfoAtom);
  const { mutate: endShift, isPending: isEnding } = useAtomValue(endShiftAtom);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: { cash: "0", note: "" },
  });

  // Handlers
  const handleClose = () => {
    setOpen("");
    form.reset();
  };

  const handlePrint = async (data: ShiftEndResponse) => {
    const bytes = shiftReceipt(data, userInfo);

    const res = await printAction(bytes);
    return res;
  };

  const onSuccessAction = async () => {
    handleClose();

    await Promise.all([
      invalidate(queryClient, ["current-cart"]),
      invalidate(queryClient, ["active-shift"]),
      invalidate(queryClient, ["list-shift"]),
    ]);
  };

  const [cash, note] = useWatch({
    control: form.control,
    name: ["cash", "note"],
  });

  const onSubmit = async (withStruck: boolean = true) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    const cashAmount = Number.parseFloat(cash);

    if (!isActive) {
      return startShift(
        { initial_cash: cashAmount },
        { onSuccess: onSuccessAction },
      );
    }

    if (withStruck) {
      const check = await printCheck();
      if (!check.status) return;
      endShift(
        { actual_cash: cashAmount, note: note ?? "" },
        {
          onSuccess: async (data) => {
            const res = await handlePrint(data);
            if (!res.status) return;
            await onSuccessAction();
          },
        },
      );
    } else {
      endShift(
        { actual_cash: cashAmount, note: note ?? "" },
        {
          onSuccess: onSuccessAction,
        },
      );
    }
  };

  // UI Constants
  const config = {
    title: isActive ? "Masukan Saldo Akhir" : "Masukan Saldo Awal",
    description: isActive
      ? "Masukan total uang tunai di laci kasir untuk mengakhiri shift"
      : "Masukan total uang tunai di laci kasir untuk memulai shift",
    label: isActive ? "Saldo Akhir" : "Saldo Awal",
    isLoading: isStarting || isEnding,
  };

  return (
    <Dialog
      open={!!open && (open === "shift-end" || open === "shift-start")}
      onOpenChange={(e) => !e && handleClose()}
    >
      <DialogContent showCloseButton={false} className="min-w-md">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Input Saldo */}
          <Controller
            control={form.control}
            name="cash"
            render={({ field: { onChange, ...fieldRest }, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={fieldRest.name} required>
                  {config.label}
                </FieldLabel>
                <RupiahInput
                  {...fieldRest}
                  id={fieldRest.name}
                  onValueChange={(v) => onChange(numericString(v ?? "0"))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Input Catatan (Hanya muncul saat Akhiri Shift) */}
          {isActive && (
            <div className="flex flex-col gap-4">
              <Controller
                control={form.control}
                name="note"
                render={({ field, fieldState }) => (
                  <Field className="gap-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Catatan</FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Catatan selisih saldo (opsional)"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">Expetasi Saldo Akhir</p>
                <div className="px-3 h-8 flex items-center bg-red-100 text-sm rounded-md border border-red-200">
                  {formatRupiah(data.resource.expected_cash)}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={config.isLoading}
                >
                  <XIcon className="size-3.5 mr-2" />
                  Tutup
                </Button>
              }
            />
            {isActive && (
              <Button
                disabled={config.isLoading}
                onClick={() => onSubmit(false)}
              >
                <PrinterX className="size-3.5" />
                {config.isLoading ? "Memproses..." : "Tanpa Struk"}
              </Button>
            )}
            <Button disabled={config.isLoading} onClick={() => onSubmit(true)}>
              {isActive ? (
                <Printer className="size-3.5 " />
              ) : (
                <Send className="size-3.5 " />
              )}
              {config.isLoading
                ? "Memproses..."
                : isActive
                  ? "Cetak Struk"
                  : "Kirim"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
