"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { InputPassword } from "@/components/ui/input-password";
import { Spinner } from "@/components/ui/spinner";
import { AtSign, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { loginAtom } from "../_api/mutation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtomValue } from "@suspensive/jotai";

const formSchema = z.object({
  email_or_username: z.string(),
  password: z.string(),
});

export const LoginClient = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email_or_username: "",
      password: "",
    },
  });

  return (
    <div className="min-w-sm">
      <AtomValue atom={loginAtom}>
        {({ mutate }) => {
          const handleLogin = (values: z.infer<typeof formSchema>) => {
            mutate(values, {
              onSuccess: () => {
                startTransition(() => router.push("/"));
              },
            });
          };
          return (
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <Card>
                <CardHeader>
                  <CardTitle>Masuk POS Diskonter</CardTitle>
                  <CardDescription className="text-xs">
                    Pastikan email dan password yang Anda masukkan benar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="gap-2">
                    <Controller
                      control={form.control}
                      name="email_or_username"
                      render={({ field, fieldState }) => (
                        <Field
                          className="gap-1"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name} required>
                            Email or Username
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              className="autofill:shadow-white"
                              placeholder="ex@mail.co / jhon"
                              {...field}
                            />
                            <InputGroupAddon>
                              <AtSign className="size-3.5" />
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <Field
                          className="gap-1"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name} required>
                            Password
                          </FieldLabel>
                          <InputPassword
                            id={field.name}
                            {...field}
                            aria-invalid={fieldState.invalid}
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
                    className={"ml-auto"}
                    type="submit"
                    variant="diskonter"
                  >
                    {isPending ? (
                      <Spinner className="size-3.5" />
                    ) : (
                      <LogInIcon className="size-3.5" />
                    )}
                    {isPending ? "Mengalihkan" : "Masuk"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          );
        }}
      </AtomValue>
    </div>
  );
};
