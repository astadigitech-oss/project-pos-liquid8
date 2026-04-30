"use client";

import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, RefreshCw, Search } from "lucide-react";
import React from "react";
import { column } from "./column";
import { AtomValue } from "@suspensive/jotai";
import { listPPNAtom } from "../_api/queries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";

export const PpnSettingClient = () => {
  return (
    <AtomValue atom={listPPNAtom}>
      {({ data }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
              PPN
            </h2>
            <div className="flex items-center gap-2">
              <InputGroup>
                <InputGroupInput />
                <InputGroupAddon>
                  <Search className="size-3.5" />
                </InputGroupAddon>
              </InputGroup>
              <TooltipText
                render={
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"border-gray-300"}
                  >
                    <RefreshCw className={cn("size-3.5")} />
                  </Button>
                }
                value="Muat Ulang"
              />
              <TooltipText
                value="Tambah PPN"
                render={
                  <Button size={"icon"} className={"text-xs"}>
                    <Plus className="size-3.5" />
                  </Button>
                }
              />
            </div>
          </div>
          <DataTable columns={column()} data={data?.data ?? []} />
        </div>
      )}
    </AtomValue>
  );
};
