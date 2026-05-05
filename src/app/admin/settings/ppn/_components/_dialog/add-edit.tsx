import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { addEditPpnDialog, selectedDialogId } from "../../_api/atom";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPpnAtom, updatePpnAtom } from "../../_api/mutations";
import { useAtom, useAtomValue } from "jotai";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Percent, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { invalidate, numericString } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { detailPPNAtom } from "../../_api/queries";

const formSchema = z.object({
  ppn: z.string().min(1, "PPN harus diisi"),
  is_tax_default: z.boolean().optional(),
});

type InferFormSchema = z.infer<typeof formSchema>;

export const AddEditDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useAtom(addEditPpnDialog);
  const [selectedId, setSelectedId] = useAtom(selectedDialogId);
  const { data } = useAtomValue(detailPPNAtom);
  const { mutate: addPPN } = useAtomValue(addPpnAtom);
  const { mutate: updatePPN } = useAtomValue(updatePpnAtom);
  const form = useForm<InferFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      ppn: data?.data.ppn.toString() ?? "0",
      is_tax_default: data?.data.is_tax_default ?? false,
    },
  });

  const handleSubmit = (values: InferFormSchema) => {
    if (open === "") return;

    if (open === "add")
      return addPPN(
        { ppn: Number.parseFloat(values.ppn) },
        {
          onSuccess: async () => {
            setOpen("");
            setSelectedId("");
            form.reset();
            await invalidate(queryClient, ["list-ppn"]);
          },
        },
      );

    if (open === "edit")
      return updatePPN(
        {
          id: Number.parseFloat(selectedId),
          body: {
            ppn: Number.parseFloat(values.ppn),
            is_tax_default: values.is_tax_default ?? false,
          },
        },
        {
          onSuccess: async (data) => {
            setOpen("");
            setSelectedId("");
            form.reset();
            await invalidate(queryClient, ["list-ppn"]);
            await invalidate(queryClient, [
              "detail-ppn",
              data.data.id.toString(),
            ]);
          },
        },
      );
  };

  return (
    <Dialog
      open={!!open}
      onOpenChange={(e) => {
        if (!e) {
          setOpen("");
          setSelectedId("");
          form.reset();
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{open === "add" ? "Tambah" : "Edit"} PPN</DialogTitle>
          <DialogDescription>
            Pastikan nominal PPN sudah benar.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            control={form.control}
            name="ppn"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel>PPN</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(numericString(e.target.value))
                    }
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <Percent />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {open === "edit" && (
            <Controller
              control={form.control}
              name="is_tax_default"
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={field.disabled}
                      className={"border-gray-400"}
                      id={field.name}
                    />
                    <FieldLabel htmlFor={field.name} className="font-normal">
                      PPN Utama
                    </FieldLabel>
                  </div>
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
                <Button type="button" variant={"outline"}>
                  <X className="size-3.5" />
                  Tutup
                </Button>
              }
            />
            <Button type="submit">
              <Send className="size-3.5" />
              Kirim
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
