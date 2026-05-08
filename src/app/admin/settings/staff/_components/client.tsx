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
import { Pagination } from "@/components/pagination";
import { staffDialog, staffPage, staffSearch } from "../_api/atom";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { listStaffAtom } from "../_api/queries";
import { StaffDialog } from "./_dialog";
import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue } from "jotai";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { listStoreSelectAtom } from "@/app/admin/store/_api/queries";

export const StaffSettingClient = () => {
  const { isLoading: isLoadingStore } = useAtomValue(listStoreSelectAtom);
  return (
    <AtomValue atom={listStaffAtom}>
      {({ data, isRefetching, isLoading, isSuccess, isError, refetch }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-6">
          <StaffDialog />
          <div className="flex items-center justify-between">
            <h2 className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
              Staff
            </h2>
            <div className="flex items-center gap-2">
              <StaffSearchInput
                disabled={isRefetching || isLoading}
                isSuccess={isSuccess}
                isError={isError}
              />
              <TooltipText
                render={
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"border-gray-300 group"}
                    onClick={() => refetch()}
                  >
                    <RefreshCw
                      className={cn(
                        "size-3.5 group-hover:rotate-45 transition-all",
                        isRefetching && "animate-spin",
                      )}
                    />
                  </Button>
                }
                value="Muat Ulang"
              />
              <SetAtom atom={staffDialog}>
                {(setOpen) => (
                  <TooltipText
                    render={
                      <Button
                        size={"icon"}
                        onClick={() => setOpen("add")}
                        disabled={isLoadingStore}
                      >
                        {isLoadingStore ? (
                          <Spinner className="size-3.5" />
                        ) : (
                          <Plus className="size-3.5" />
                        )}
                      </Button>
                    }
                    value="Tambah Staff"
                  />
                )}
              </SetAtom>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DataTable
              columns={column({
                from: data?.data.resource.pagination.from ?? 1,
                disabledEdit: isLoadingStore,
              })}
              data={data?.data.resource.data ?? []}
            />
            <Pagination
              pagination={data?.data.resource.pagination}
              atomPage={staffPage}
              isPending={isRefetching || isLoading}
            />
          </div>
        </div>
      )}
    </AtomValue>
  );
};

const StaffSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(staffSearch);
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
        placeholder="Cari staff..."
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
