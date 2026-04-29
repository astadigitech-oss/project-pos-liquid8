import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LockKeyhole, Send, Shield } from "lucide-react";
import { InputPassword } from "@/components/ui/input-password";
import z from "zod";
import { AtomValue } from "@suspensive/jotai";
import { userPasswordAtom } from "../../_api/mutations";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  old_password: z.string().min(1, "Password lama harus diisi"),
  new_password: z.string().min(8, "Password baru minimal 8 karakter"),
  confirm_new_password: z
    .string()
    .min(1, "Konfirmasi password baru wajib diisi"),
});

type FormSchema = z.infer<typeof formSchema>;

export const PasswordSetting = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <p className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
        Password
      </p>
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Pengaturan Profil</CardTitle>
        </CardHeader>
        <AtomValue atom={userPasswordAtom}>
          {({ mutate, isPending }) => {
            const handleSubmit = (data: FormSchema) => {
              if (data.confirm_new_password !== data.new_password) {
                form.setError("confirm_new_password", {
                  message: "Password baru tidak cocok",
                });
                return;
              }
              mutate(
                {
                  new_password: data.new_password,
                  old_password: data.old_password,
                },
                {
                  onSuccess: () => {
                    form.setFocus("old_password");
                    form.reset();
                  },
                },
              );
            };
            return (
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <CardContent>
                  <FieldGroup className="gap-2">
                    <Controller
                      control={form.control}
                      name="old_password"
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel required htmlFor={field.name}>
                            Password Lama
                          </FieldLabel>
                          <InputPassword
                            id={field.name}
                            {...field}
                            icon={Shield}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="new_password"
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel required htmlFor={field.name}>
                            Password Baru
                          </FieldLabel>
                          <InputPassword id={field.name} {...field} />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="confirm_new_password"
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel required htmlFor={field.name}>
                            Konfirmasi Password Baru
                          </FieldLabel>
                          <InputPassword
                            id={field.name}
                            {...field}
                            icon={LockKeyhole}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={"diskonter"}
                    disabled={isPending}
                    className={"ml-auto"}
                    type="submit"
                  >
                    {isPending ? (
                      <Spinner className="size-3.5" />
                    ) : (
                      <Send className="size-3.5" />
                    )}
                    {isPending ? "Menyimpan..." : "Simpan"}
                  </Button>
                </CardFooter>
              </form>
            );
          }}
        </AtomValue>
      </Card>
    </div>
  );
};
