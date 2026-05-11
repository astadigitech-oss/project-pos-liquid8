import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Send, X } from "lucide-react";

// UI Components
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputPassword } from "@/components/ui/input-password";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

// API & State
import { updateStaffAtom } from "../../_api/mutations";
import { selectedStaffId, staffDialog } from "../../_api/atom";
import { Delay } from "@suspensive/react";
import { detailStaffAtom } from "../../_api/queries";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(1, "Nama harus diisi"),
  password_confirm: z.string().min(1, "Nama harus diisi"),
});

type FormSchema = z.infer<typeof formSchema>;

export const Password = () => {
  // Atoms
  const [open, setOpen] = useAtom(staffDialog);
  const [selectedId, setSelectedId] = useAtom(selectedStaffId);
  const { mutate: updateStaff } = useAtomValue(updateStaffAtom);
  const {
    data: detailstaff,
    isSuccess,
    isRefetching,
  } = useAtomValue(detailStaffAtom);

  // Form Initialization
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      password: "",
      password_confirm: "",
    },
  });

  // Handlers
  const onSubmit = (values: FormSchema) => {
    if (values.password !== values.password_confirm)
      return form.setError("password_confirm", {
        message: "Password tidak sama",
      });

    if (!detailstaff) return toast.error("Menyiapkan data, silahkan coba lagi");

    updateStaff(
      {
        id: selectedId,
        body: {
          name: detailstaff?.data.resource.Name,
          username: detailstaff?.data.resource.Username,
          email: detailstaff?.data.resource.Email,
          role: detailstaff?.data.resource.Role,
          store_id: detailstaff?.data.resource.StoreID,
          password: values.password,
        },
      },
      {
        onSuccess: () => {
          setSelectedId("");
          setOpen("");
        },
      },
    );
  };

  useEffect(() => {
    if (open === "") form.reset();
  }, [open, form]);

  if (!isSuccess || isRefetching) return <Loader />;

  return (
    <Delay ms={500} fallback={<Loader />}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 gap-2">
          {/* Name Field */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel required>Password</FieldLabel>
                <InputPassword {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password_confirm"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel required>Konfirmasi Password</FieldLabel>
                <InputPassword {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <DialogFooter className="mt-2">
          <DialogClose
            render={
              <Button type="button" variant="outline">
                <X className="size-3.5" />
                Batal
              </Button>
            }
          />
          <Button type="submit">
            <Send className="size-3.5" />
            Update
          </Button>
        </DialogFooter>
      </form>
    </Delay>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-28.25 flex flex-col items-center justify-center gap-2 text-xs font-semibold">
        <Spinner className="size-6" />
        <p>Memuat data...</p>
      </div>
      <DialogFooter>
        <Skeleton className="w-20 h-9" />
        <Skeleton className="w-20 h-9" />
      </DialogFooter>
    </div>
  );
};
