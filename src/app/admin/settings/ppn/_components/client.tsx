"use client";

import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, RefreshCw, Search, XCircle } from "lucide-react";
import React from "react";
import { column } from "./column";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { listPPNAtom } from "../_api/queries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AddEditDialog } from "./_dialog/add-edit";
import { addEditPpnDialog, ppnSearch } from "../_api/atom";
import { AlertPPNDialog } from "./_dialog/alert";
import { useAtom } from "jotai";
import { Spinner } from "@/components/ui/spinner";

export const PpnSettingClient = () => {
  return (
    <AtomValue atom={listPPNAtom}>
      {({ data, isError, isRefetching, isSuccess }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-6">
          <AddEditDialog />
          <AlertPPNDialog />
          <div className="flex items-center justify-between">
            <h2 className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
              PPN
            </h2>
            <div className="flex items-center gap-2">
              <PpnSearchInput
                disabled={isRefetching}
                isError={isError}
                isSuccess={isSuccess}
              />
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
              <SetAtom atom={addEditPpnDialog}>
                {(setOpen) => (
                  <TooltipText
                    value="Tambah PPN"
                    render={
                      <Button
                        onClick={() => setOpen("add")}
                        size={"icon"}
                        className={"text-xs"}
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    }
                  />
                )}
              </SetAtom>
            </div>
          </div>
          <DataTable columns={column()} data={data?.data ?? []} />
        </div>
      )}
    </AtomValue>
  );
};

const PpnSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(ppnSearch);
  const [localValue, setLocalValue] = React.useState(search);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = setTimeout(() => setSearch(localValue), 500);
    return () => clearTimeout(handler);
  }, [localValue, setSearch]);

  React.useEffect(() => {
    setLocalValue(search);
  }, [search]);

  React.useEffect(() => {
    if ((!disabled && isSuccess) || (!disabled && isError)) {
      inputRef.current?.focus();
    }
  }, [disabled, isSuccess, isError]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent w-64">
      <InputGroupInput
        placeholder="Cari ppn..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={disabled}
      />
      <InputGroupAddon>
        <Search className="size-3.5" />
      </InputGroupAddon>
      {disabled && (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-3.5" />
        </InputGroupAddon>
      )}
      {!disabled && search.length > 0 && (
        <InputGroupAddon align="inline-end">
          <TooltipText
            value="Bersihkan pencarian"
            render={
              <InputGroupButton size="icon-xs" onClick={() => setSearch("")}>
                <XCircle className="size-3.5" />
              </InputGroupButton>
            }
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};
