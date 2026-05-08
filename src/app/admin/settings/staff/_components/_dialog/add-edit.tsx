import React, { useEffect, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { AtSign, IdCard, Send, Store, User2, X } from "lucide-react";

// UI Components
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { InputPassword } from "@/components/ui/input-password";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

// API & State
import { userInfoAtom } from "../../../(profil)/_api/queries";
import { listStoreSelectAtom } from "@/app/admin/store/_api/queries";
import { addStaffAtom, updateStaffAtom } from "../../_api/mutations";
import { selectedStaffId, staffDialog } from "../../_api/atom";
import { detailStaffAtom } from "../../_api/queries";
import { invalidate } from "@/lib/utils";

// Types & Schemas
const roleListAdmin = ["kasir"] as const;
const roleListSuperadmin = ["kasir", "admin"] as const;

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().email("Email tidak valid"),
  role: z.string().min(1, "Role harus diisi"),
  password: z.string().optional(),
  store: z
    .object({
      id: z.number(),
      store_name: z.string(),
    })
    .nullable()
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddEdit = () => {
  const queryclient = useQueryClient();

  // Atoms
  const [open, setOpen] = useAtom(staffDialog);
  const [selectedId, setSelectedId] = useAtom(selectedStaffId);
  const {
    data: detailstaff,
    isSuccess,
    isRefetching,
  } = useAtomValue(detailStaffAtom);
  const { data: user } = useAtomValue(userInfoAtom);
  const { data: storeSelect } = useAtomValue(listStoreSelectAtom);
  const { mutate: addStaff } = useAtomValue(addStaffAtom);
  const { mutate: updateStaff } = useAtomValue(updateStaffAtom);

  const isEdit = open === "edit";
  const roleList =
    user?.resource.role === "admin" ? roleListAdmin : roleListSuperadmin;

  // Form Initialization
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: useMemo(() => {
      if (isEdit && detailstaff?.data.resource) {
        const res = detailstaff.data.resource;
        return {
          name: res.Name || "",
          username: res.Username || "", // Perbaikan: sebelumnya Anda memanggil res.Name untuk username
          email: res.Email || "",
          role: res.Role || "",
          store: res.StoreID
            ? { id: res.StoreID, store_name: res.StoreName || "" }
            : null,
          password: "",
        };
      }
      return {
        name: "",
        username: "",
        email: "",
        role: "",
        store: null,
        password: "",
      };
    }, [detailstaff, isEdit]),
  });

  const roleSelected = useWatch({ control: form.control, name: "role" });

  // Handlers
  const onSubmit = (values: FormSchema) => {
    if (open === "add") {
      const password = values.password;
      if (!password) {
        return form.setError("password", { message: "Password harus diisi" });
      }
      if (values.role === "kasir" && !values.store?.id) {
        return form.setError("store", { message: "Store harus diisi" });
      }

      addStaff(
        {
          ...values,
          password: password,
          store_id: values.role === "kasir" ? values.store?.id : undefined,
        },
        {
          onSuccess: async () => {
            setOpen("");
            await invalidate(queryclient, ["list-staff"]);
          },
        },
      );
    } else {
      if (values.role === "kasir" && !values.store?.id) {
        return form.setError("store", { message: "Store harus diisi" });
      }

      updateStaff(
        {
          id: selectedId,
          body: {
            ...values,
            store_id: values.role === "kasir" ? values.store?.id : undefined,
          },
        },
        {
          onSuccess: async () => {
            setOpen("");
            setSelectedId("");
            await invalidate(queryclient, ["list-staff"]);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (open === "") form.reset();
  }, [open, form]);

  // Loading State
  if (isEdit && (!isSuccess || isRefetching)) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-44 flex flex-col items-center justify-center gap-2 text-xs font-semibold">
          <Spinner className="size-6" />
          <p>Memuat data...</p>
        </div>
        <DialogFooter>
          <Skeleton className="w-20 h-9" />
          <Skeleton className="w-20 h-9" />
        </DialogFooter>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Name Field */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel required>Nama</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  placeholder="cth. John Doe"
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <User2 size={16} />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Username Field */}
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel required>Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  placeholder="cth. john_doe"
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <IdCard size={16} />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Email Field */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel required>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="email"
                  placeholder="email@domain.com"
                />
                <InputGroupAddon>
                  <AtSign size={16} />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Password Field (Add Only) */}
        {!isEdit && (
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Password</FieldLabel>
                <InputPassword {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        )}

        {/* Role Field */}
        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel required>Role</FieldLabel>
              <Combobox
                items={roleList}
                value={field.value}
                onValueChange={field.onChange}
                itemToStringLabel={(item) =>
                  item.charAt(0).toUpperCase() + item.slice(1)
                }
              >
                <ComboboxInput className="text-xs" placeholder="Pilih Role" />
                <ComboboxContent>
                  <ComboboxEmpty>Role tidak ditemukan</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        className="capitalize text-xs h-8"
                        key={item}
                        value={item}
                      >
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {/* Store Field (Conditional) */}
        {roleSelected === "kasir" && (
          <Controller
            control={form.control}
            name="store"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Toko</FieldLabel>
                <Combobox
                  items={storeSelect || []}
                  value={field.value}
                  onValueChange={field.onChange}
                  itemToStringLabel={(item) => item.store_name}
                  isItemEqualToValue={(a, b) => a.id === b.id}
                >
                  <ComboboxInput className="text-xs" placeholder="Pilih Toko" />
                  <ComboboxContent>
                    <ComboboxEmpty>Toko tidak ditemukan</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          className="text-xs h-8"
                          key={item.id}
                          value={item}
                        >
                          <Store className="size-3.5 mr-2" />
                          {item.store_name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        )}
      </div>

      <DialogFooter className="mt-2">
        <DialogClose
          render={
            <Button type="button" variant="outline">
              <X className="size-3.5 mr-2" />
              Batal
            </Button>
          }
        />
        <Button type="submit">
          <Send className="size-3.5 mr-2" />
          {isEdit ? "Update" : "Tambah"}
        </Button>
      </DialogFooter>
    </form>
  );
};
