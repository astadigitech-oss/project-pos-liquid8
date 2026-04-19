"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDays, SearchIcon, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { useTime } from "@/hooks/use-time";
import { AtomValue } from "@suspensive/jotai";
import { listShiftAtom } from "../_api/queries";
import { ShiftDetailDialog } from "./_dialog/detail";

export const ShiftsClient = () => {
  const { formattedDate, formattedTime } = useTime();
  return (
    <div className="flex flex-col gap-4 h-full">
      <ShiftDetailDialog />
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Manajemen Shift</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <AtomValue atom={listShiftAtom}>
        {({ data }) => (
          <div className="bg-white p-5 flex flex-col gap-4 rounded-xl shadow">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-2">
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
                  <InputGroupInput
                    className="w-52"
                    placeholder="Cari shift..."
                  />
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
            <div>
              <DataTable columns={column()} data={data?.resource.data ?? []} />
            </div>
          </div>
        )}
      </AtomValue>
    </div>
  );
};
