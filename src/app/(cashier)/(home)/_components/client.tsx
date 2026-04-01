"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { formatPhoneNumber, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  CalendarDaysIcon,
  ClipboardClock,
  Clock7Icon,
  Edit2,
  PowerIcon,
  ReceiptTextIcon,
  ScanSearch,
  SearchIcon,
  Send,
  User2Icon,
  UserPlus2,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { column } from "./columns";
import { columnSelected } from "./columns-selected";

const now = new Date();

export const HomeClient = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    // Memperbarui state setiap detik
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger
                className={
                  "rounded-full size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
                }
              />
              <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
                <div className="size-7 bg-sky-100/60 text-sky-600 flex items-center justify-center rounded-full">
                  <CalendarDaysIcon className="size-3.5" />
                </div>
                <p className="pr-2 tabular-nums">
                  {format(time, "iii, dd MMM yyyy", {
                    locale: id,
                    in: tz("Asia/Jakarta"),
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <p>–</p>
              </div>
              <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
                <div className="size-7 bg-sky-100/60 text-sky-600 flex items-center justify-center rounded-full">
                  <Clock7Icon className="size-3.5" />
                </div>
                <p className="pr-2 tabular-nums">
                  {format(time, "HH:mm", {
                    locale: id,
                    in: tz("Asia/Jakarta"),
                  })}
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant={"outline"}
                    className={
                      "h-10 rounded-full px-1.5 border-white hover:border-gray-300 shadow hover:bg-white"
                    }
                  >
                    <p className="pl-2 tabular-nums">Mulai Shift</p>
                    <div className="size-7 bg-red-100/60 text-red-600 flex items-center justify-center rounded-full">
                      <PowerIcon className="size-3.5" />
                    </div>
                  </Button>
                }
              />
              <DialogContent showCloseButton={false} className={"min-w-md"}>
                <DialogHeader>
                  <DialogTitle>Masukan Saldo Awal</DialogTitle>
                  <DialogDescription>
                    Masukan total uang tunai dari laci kasir untuk memulai shift
                  </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel>Saldo Awal</FieldLabel>
                    <InputGroup>
                      <InputGroupInput defaultValue={100000} />
                      <InputGroupAddon align={"inline-end"}>
                        <InputGroupText className="text-sm bg-gray-200/80 px-2 rounded">
                          {formatRupiah(100000)}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button type="button" variant={"outline"}>
                          <XIcon className="size-3.5" />
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
          </div>
          <div className="bg-white w-full rounded-xl h-[calc(100svh-32px-40px-16px)] shadow">
            <div className="flex items-center gap-2 p-4 border-b border-gray-300">
              <InputGroup>
                <InputGroupInput placeholder="Cari customer..." />
                <InputGroupAddon>
                  <SearchIcon className="size-3.5" />
                </InputGroupAddon>
              </InputGroup>
              <Button>
                <ScanSearch className="size-3.5" />
                Produk
              </Button>
            </div>
            <div className="p-4">
              <DataTable
                columns={columnSelected()}
                data={[
                  {
                    name: "Cosmos Dispencer",
                    qty: 2,
                    type: "sku",
                    price: 2000000,
                  },
                  { name: "Cepit Rambut", qty: 1, type: "brown", price: 12000 },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <div className="bg-white w-full h-[calc(100svh-32px)] rounded-xl shadow">
          <div className="flex items-center gap-2 p-3 justify-between border-b border-gray-300">
            <TooltipText
              value="Draf Pesanan"
              sideOffset={10}
              render={
                <Button
                  className={"rounded-full border-gray-300 size-10"}
                  variant={"outline"}
                  size={"icon"}
                >
                  <ClipboardClock />
                </Button>
              }
            />
            <div className="flex flex-col items-center justify-center">
              <p className="font-light leading-tight text-lg">
                Customer&apos;s Name
              </p>
              <p className="text-sm text-gray-500">0888-8888-8888</p>
            </div>
            <Dialog>
              <TooltipText
                value={"Pilih Customer"}
                sideOffset={10}
                render={
                  <DialogTrigger
                    render={
                      <Button
                        className={"rounded-full border-gray-300 size-10"}
                        variant={"outline"}
                        size={"icon"}
                      >
                        <User2Icon />
                      </Button>
                    }
                  />
                }
              />
              <DialogContent showCloseButton={false} className={"min-w-lg"}>
                <DialogHeader>
                  <DialogTitle>Pilih Customer</DialogTitle>
                  <DialogDescription>
                    Pastikan data customer sesuai
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <InputGroup>
                    <InputGroupInput placeholder="Cari customer..." />
                    <InputGroupAddon>
                      <SearchIcon className="size-3.5" />
                    </InputGroupAddon>
                  </InputGroup>
                  <Button size={"icon"}>
                    <UserPlus2 className="size-3.5" />
                  </Button>
                </div>
                <DataTable
                  columns={column()}
                  data={[
                    { name: "Ahmad Fulan", phone: "088888888888" },
                    { name: "Jhon Doe", phone: "088888888888" },
                  ]}
                />
                {/*<form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Field className="gap-1">
                      <FieldLabel>Nama</FieldLabel>
                      <Input type="text" defaultValue={"Ahmad Fulan"} />
                    </Field>
                    <Field className="gap-1">
                      <FieldLabel>Nomor Telepon</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          defaultValue={"088888888888"}
                          type="number"
                        />
                        <InputGroupAddon align={"inline-end"}>
                          <InputGroupText className="text-sm bg-gray-200/80 px-2 rounded tabular-nums">
                            {formatPhoneNumber("088888888888")}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  </div>
                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button type="button" variant={"outline"}>
                          <XIcon className="size-3.5" />
                          Tutup
                        </Button>
                      }
                    />
                    <Button type="submit">
                      <Send className="size-3.5" />
                      Kirim
                    </Button>
                  </DialogFooter>
                </form>*/}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
