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
import * as qz from "qz-tray";

export const SettingsClient = () => {
  const payload = {
    storeName: "TOKO MAJU JAYA",
    orderId: "INV-001",
    total: 50000,
    items: [
      { name: "Kopi Hitam", qty: 2, price: 15000 },
      { name: "Roti Bakar", qty: 1, price: 20000 },
    ],
  };
  const { formattedDate, formattedTime } = useTime();
  const printUSB = async () => {
    try {
      // 1. Hubungkan ke QZ Tray jika belum aktif
      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }

      // 2. Buat Konfigurasi Printer
      const config = qz.configs.create("thermal");

      // 3. Susun data dalam format ESC/POS (Raw)
      // Karakter HEX seperti \x1B adalah perintah hardware
      const data = [
        "\x1B" + "\x40", // Initialize printer
        "\x1B" + "\x61" + "\x01", // Rata tengah (Center)
        "\x1B" + "\x45" + "\x01", // Bold ON
        payload.storeName + "\n",
        "\x1B" + "\x45" + "\x00", // Bold OFF
        "ID: " + payload.orderId + "\n",
        "------------------------------\n",
        "\x1B" + "\x61" + "\x00", // Rata kiri (Left)
      ];

      // Tambahkan item belanja
      payload.items.forEach((item: any) => {
        data.push(item.name + "\n");
        data.push(
          item.qty + " x " + item.price + "\t" + item.qty * item.price + "\n",
        );
      });

      data.push("------------------------------\n");
      data.push("\x1B" + "\x61" + "\x02"); // Rata kanan (Right)
      data.push("\x1B" + "\x45" + "\x01"); // Bold ON
      data.push("TOTAL: " + payload.total + "\n");
      data.push("\x1B" + "\x45" + "\x00"); // Bold OFF

      // Spasi akhir dan potong kertas
      data.push("\n\n\n");
      data.push("\x1D" + "\x56" + "\x41"); // Perintah Paper Cut (jika printer mendukung)

      // 4. Kirim ke printer
      await qz.print(config, data);

      console.log("Cetak Berhasil!");
    } catch (err) {
      console.error("Gagal cetak via QZ Tray:", err);
      throw err;
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
        <Button onClick={printUSB}>Click me</Button>
      </div>
    </div>
  );
};
