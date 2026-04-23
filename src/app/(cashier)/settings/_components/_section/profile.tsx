import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
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
import { AtSign, Send, User2 } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../_api/queries";
import { AtomValue } from "@suspensive/jotai";
import { updateUserDataAtom } from "../../_api/mutations";
import { invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.email("Email tidak valid"),
});

type FormSchema = z.infer<typeof formSchema>;

export const ProfileSetting = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useAtomValue(userInfoAtom);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: data?.resource.name ?? "",
      email: data?.resource.email ?? "",
    },
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-300 before:rounded-full">
        Profil
      </h2>
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Pengaturan Profil</CardTitle>
        </CardHeader>
        <AtomValue atom={updateUserDataAtom}>
          {({ mutate, isPending: isUpdating }) => {
            const handleSubmit = (data: FormSchema) => {
              mutate(data, {
                onSuccess: async () => {
                  await invalidate(queryClient, ["user-info"]);
                  form.reset();
                },
              });
            };

            const isLoading = isUpdating || isPending;

            if (isPending) {
              return (
                <div
                  data-slot="card-footer"
                  className="h-48.5 w-full flex items-center justify-center text-sm flex-col gap-1"
                >
                  <Spinner className="size-5" />
                  <p>Memuat data...</p>
                </div>
              );
            }

            return (
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <CardContent>
                  <FieldGroup className="gap-2">
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel required htmlFor={field.name}>
                            Nama
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              {...field}
                              placeholder="Jhon Doe"
                            />
                            <InputGroupAddon>
                              <User2 className="size-3.5" />
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel required htmlFor={field.name}>
                            Email
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              {...field}
                              type="email"
                              placeholder="ex@mail.co"
                            />
                            <InputGroupAddon>
                              <AtSign className="size-3.5" />
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isLoading}
                    className={"ml-auto"}
                    type="submit"
                  >
                    {isLoading ? (
                      <Spinner className="size-3.5" />
                    ) : (
                      <Send className="size-3.5" />
                    )}
                    {isUpdating ? "Menyimpan..." : "Simpan"}
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
