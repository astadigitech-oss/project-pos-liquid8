"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTime } from "@/hooks/use-time";
import { AtSign, LockKeyhole, Send, Shield, User2 } from "lucide-react";
import React from "react";
import ReceiptPrinterEncoder from "@point-of-sale/receipt-printer-encoder";

export const SettingsClient = () => {
  const { formattedDate, formattedTime } = useTime();
  const handlePrint = async () => {
    // 1. Inisialisasi Encoder (tentukan lebar kertas, misal 58mm)
    const encoder = new ReceiptPrinterEncoder({
      width: 32, // Jumlah karakter per baris (biasanya 32 untuk thermal 58mm)
    });

    // 2. Susun desain struk
    const result = encoder
      .initialize()
      .codepage("cp437") // Standar untuk printer thermal
      .align("center")
      .bold(true)
      .line("KOPI JODOH")
      .bold(false)
      .line("Jl. Kenangan No. 5, Jakarta")
      .line("--------------------------------")
      .align("left")
      .table(
        [
          { width: 20, align: "left" },
          { width: 12, align: "right" },
        ],
        [
          ["Kopi Susu x1", "15.000"],
          ["Roti Bakar x2", "20.000"],
        ],
      )
      .line("--------------------------------")
      .align("right")
      .bold(true)
      .line("TOTAL: 35.000")
      .bold(false)
      .align("center")
      .newline()
      .line("Terima Kasih!")
      .newline()
      .newline()
      .cut()
      .encode(); // Menghasilkan Uint8Array

    // 3. Kirim ke Rust Bridge (Port 3001)
    try {
      const response = await fetch("http://localhost:3001/print-raw", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: Buffer.from(result),
      });

      if (response.ok) {
        console.log("✅ Cetak berhasil");
      } else {
        alert("Gagal: Printer tidak siap!");
      }
    } catch (error) {
      alert("Gagal: Pastikan aplikasi POS Bridge sudah aktif.");
    }
  };
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Pengaturan</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 flex flex-col w-full rounded-xl gap-4">
        <div className="grid grid-cols-2 gap-4">
          <p className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-300 before:rounded-full">
            Profil
          </p>
          <Card>
            <CardHeader className="sr-only">
              <CardTitle>Pengaturan Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-2">
                <Field className="gap-1">
                  <FieldLabel>Nama</FieldLabel>
                  <InputGroup>
                    <InputGroupInput placeholder="Jhon Doe" />
                    <InputGroupAddon>
                      <User2 className="size-3.5" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field className="gap-1">
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput type="email" placeholder="ex@mail.co" />
                    <InputGroupAddon>
                      <AtSign className="size-3.5" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button className={"ml-auto"}>
                <Send className="size-3.5" />
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <p className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-300 before:rounded-full">
            Password
          </p>
          <Card>
            <CardHeader className="sr-only">
              <CardTitle>Pengaturan Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-2">
                <Field className="gap-1">
                  <FieldLabel>Password Lama</FieldLabel>
                  <InputPassword icon={Shield} />
                </Field>
                <Field className="gap-1">
                  <FieldLabel>Password Baru</FieldLabel>
                  <InputPassword />
                </Field>
                <Field className="gap-1">
                  <FieldLabel>Konfirmasi Password Baru</FieldLabel>
                  <InputPassword icon={LockKeyhole} />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button className={"ml-auto"}>
                <Send className="size-3.5" />
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Button onClick={handlePrint}>Click me</Button>
      </div>
    </div>
  );
};
