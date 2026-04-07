"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDays, SearchIcon, User2, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { useTime } from "@/hooks/use-time";

export const TransactionClient = () => {
  const { formattedDate, formattedTime } = useTime();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Riwayat Transaksi</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <Separator className={"bg-gray-300"} />
      <div className="flex items-center justify-between w-full gap-4 px-5">
        <div className="flex items-center gap-2">
          <Button
            className={"text-xs bg-transparent hover:bg-white"}
            variant={"outline"}
          >
            <User2 className="size-3.5" />
            Customer
          </Button>
          <Button
            className={"text-xs bg-transparent hover:bg-white"}
            variant={"outline"}
          >
            <CalendarDays className="size-3.5" />
            <p className="pr-2">
              {format(new Date("2026-01-01"), "PP", {
                locale: id,
                in: tz("Asia/Jakarta"),
              }) +
                " - " +
                format(new Date("2026-01-01"), "PP", {
                  locale: id,
                  in: tz("Asia/Jakarta"),
                })}
            </p>
          </Button>
        </div>
        <div>
          <InputGroup>
            <InputGroupInput className="w-52" placeholder="Cari transaksi..." />
            <InputGroupAddon>
              <SearchIcon className="size-3.5" />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton className={"hover:bg-gray-200 size-6"}>
                <XCircle className="size-3.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="px-5">
        <DataTable
          columns={column()}
          data={[
            {
              order_id: "SKJ26100100001",
              customer: "Jhon Doe",
              price: 2000000,
              status: true,
              date: new Date("2026-01-01 08:00"),
            },
            {
              order_id: "SKJ26100100002",
              customer: "Jhon Chesna",
              price: 3000000,
              status: false,
              date: new Date("2026-01-01 07:00"),
            },
          ]}
        />
      </div>
    </div>
  );
};
