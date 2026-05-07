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
import { useAtom, useAtomValue } from "jotai";
import { Minus, Plus, Send, XIcon } from "lucide-react";
import React from "react";
import { listPackagingAtom } from "../../../_api/queries";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import NumberFlow from "@number-flow/react";
import { addToCartAtom } from "../../../_api/mutation";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { cashierDialog } from "../../../_api/atoms";
import { Spinner } from "@/components/ui/spinner";

export const PackagingDialog = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useAtomValue(listPackagingAtom);
  const [localQty, setLocalQty] = React.useState(0);
  const [selected, setSelected] = React.useState("");
  const { mutate, isPending: isAdding } = useAtomValue(addToCartAtom);
  const [open, setOpen] = useAtom(cashierDialog);

  const handleClose = () => {
    setOpen("");
    setLocalQty(0);
    setSelected("");
  };

  const handleConfirm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { reference_id: selected.toString(), type: "packaging", qty: localQty },
      {
        onSuccess: async () => {
          handleClose();
          await invalidate(queryClient, ["current-cart"]);
        },
      },
    );
  };
  return (
    <Dialog
      open={!!open && open === "packaging"}
      onOpenChange={(e) => {
        if (!e) {
          handleClose();
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tambah Kantong Belanja</DialogTitle>
          <DialogDescription>
            Pastikan jenis dan jumlah kantong belanja sesuai
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Jenis Kemasan</Label>
              {isPending ? (
                <div className="h-33.25 flex items-center gap-2 justify-center border rounded-lg">
                  <Spinner className="size-4" />
                  <p className="text-sm font-medium">Memuat...</p>
                </div>
              ) : (
                <RadioGroup onValueChange={setSelected} value={selected}>
                  {data?.resource?.map((item) => (
                    <FieldLabel key={item.id}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle className="text-xs">
                            {item.name}
                          </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={item.id} />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              )}
            </div>
            <Field>
              <FieldLabel>Kuantitas</FieldLabel>
              <div className="flex items-center gap-1 max-w-36">
                <Button
                  size={"icon"}
                  type="button"
                  onClick={() => setLocalQty((prev) => prev - 1)}
                  disabled={localQty === 0}
                >
                  <Minus />
                </Button>
                <NumberFlow
                  value={localQty}
                  className="w-10 text-center text-base font-semibold"
                />
                <Button
                  size={"icon"}
                  type="button"
                  onClick={() => setLocalQty((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </Field>
          </div>
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
              disabled={isAdding || isPending || localQty === 0 || !selected}
              type="submit"
            >
              {isAdding ? (
                <Spinner className="size-3.5" />
              ) : (
                <Send className="size-3.5" />
              )}
              {isAdding ? "Menambahkan..." : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
