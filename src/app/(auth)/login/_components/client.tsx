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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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

export const LoginClient = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = () => {
    startTransition(() => router.push("/"));
  };
  return (
    <div className="min-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Masuk POS Diskonter</CardTitle>
          <CardDescription className="text-xs">
            Pastikan email dan password yang Anda masukkan benar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-2">
            <Field className="gap-1">
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput type="email" placeholder="ex@mail.co" />
                <InputGroupAddon>
                  <AtSign className="size-3.5" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field className="gap-1">
              <FieldLabel>Password</FieldLabel>
              <InputPassword />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className={"ml-auto"} onClick={handleLogin}>
            {isPending ? (
              <Spinner className="size-3.5" />
            ) : (
              <LogInIcon className="size-3.5" />
            )}
            {isPending ? "Mengalihkan" : "Masuk"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
