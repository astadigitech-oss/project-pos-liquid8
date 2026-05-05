import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { Send, Smartphone, User2, XIcon } from "lucide-react";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { cashierDialog, customerId } from "../../_api/atoms";
import { addMemberAtom, updateMemberAtom } from "../../_api/mutation";
import { detailMemberAtom } from "../../_api/queries";
import { formatPhoneNumber, invalidate } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  phone: z.string().min(1, "Nomor telepon harus diisi"),
});

type CustomerFormValues = z.infer<typeof formSchema>;

export const CustomerAdd = () => {
  const queryClient = useQueryClient();

  // Atoms & State
  const [dialog, setDialog] = useAtom(cashierDialog);
  const idCustomer = useAtomValue(customerId);
  const { data: detail } = useAtomValue(detailMemberAtom);

  // Mutations
  const { mutate: addMember, isPending: isAdding } =
    useAtomValue(addMemberAtom);
  const { mutate: updateMember, isPending: isUpdating } =
    useAtomValue(updateMemberAtom);

  const isEditMode = dialog === "customer-edit";
  const isLoading = isAdding || isUpdating;

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: isEditMode ? (detail?.resource?.name ?? "") : "",
      phone: isEditMode ? (detail?.resource?.phone ?? "") : "",
    },
  });

  // Handlers
  const handleClose = () => {
    setDialog("customer-list");
    form.reset();
  };

  const onSubmit = (values: CustomerFormValues) => {
    const options = {
      onSuccess: async () => {
        handleClose();
        await invalidate(queryClient, ["list-member"]);
      },
    };

    if (isEditMode) {
      updateMember({ body: values, id: idCustomer }, options);
    } else {
      addMember(values, options);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? "Edit Customer" : "Tambah Customer"}
        </DialogTitle>
        <DialogDescription>
          Pastikan nama dan nomor telepon customer sesuai
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        {/* Field Nama */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel required>Nama</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  autoComplete="off"
                  placeholder="Contoh: John Doe"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <User2 className="size-3.5" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field Telepon */}
        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel required>Nomor Telepon</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="number"
                  autoComplete="off"
                  placeholder="08xxxxxxxxxx"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon>
                  <Smartphone className="size-3.5" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="text-xs tracking-wider bg-red-100/80 text-black/80 px-2 rounded tabular-nums">
                    {formatPhoneNumber(field.value)}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={isLoading}
        >
          <XIcon className="size-3.5 mr-2" />
          Batal
        </Button>
        <Button type="submit" disabled={isLoading} variant={"diskonter"}>
          {isLoading ? (
            <Spinner className="size-3.5 mr-2" />
          ) : (
            <Send className="size-3.5 mr-2" />
          )}
          {isLoading ? "Mengirim..." : "Kirim"}
        </Button>
      </DialogFooter>
    </form>
  );
};
