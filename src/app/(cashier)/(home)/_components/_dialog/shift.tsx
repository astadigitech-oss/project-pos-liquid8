import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai"; // Gunakan hook standar untuk readability
import { Send, XIcon } from "lucide-react";

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
import { shiftDialog } from "../../_api/atoms";
import { invalidate, numericString } from "@/lib/utils";

const formSchema = z.object({
  cash: z.string().min(1, "Saldo wajib diisi"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ShiftDialog = () => {
  const queryClient = useQueryClient();

  // State & Atoms
  const [open, setOpen] = useAtom(shiftDialog);
  const { isSuccess: isActive } = useAtomValue(activeShiftAtom);
  const { mutate: startShift, isPending: isStarting } =
    useAtomValue(startShiftAtom);
  const { mutate: endShift, isPending: isEnding } = useAtomValue(endShiftAtom);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: { cash: "0", note: "" },
  });

  // Handlers
  const handleClose = () => {
    setOpen(null);
    form.reset();
  };

  const onSuccessAction = async () => {
    handleClose();
    await Promise.all([
      invalidate(queryClient, ["current-cart"]),
      invalidate(queryClient, ["active-shift"]),
    ]);
  };

  const onSubmit = (values: FormValues) => {
    const cashAmount = Number.parseFloat(values.cash);

    if (isActive) {
      endShift(
        { actual_cash: cashAmount, note: values.note ?? "" },
        { onSuccess: onSuccessAction },
      );
    } else {
      startShift({ initial_cash: cashAmount }, { onSuccess: onSuccessAction });
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
    <Dialog open={!!open} onOpenChange={(e) => !e && handleClose()}>
      <DialogContent showCloseButton={false} className="min-w-md">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
            <Button type="submit" disabled={config.isLoading}>
              <Send className="size-3.5 mr-2" />
              {config.isLoading ? "Memproses..." : "Kirim"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
