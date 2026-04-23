"use client";

import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RefreshCw, Search, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { useTime } from "@/hooks/use-time";
import { AtomValue } from "@suspensive/jotai";
import { listtransactionAtom } from "../_api/queries";
import { DialogCancelTransaction } from "./_dialog/cancel";
import { DetailTransaction } from "./_dialog/detail";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { transactionPage, transactionSearch } from "../_api/atom";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";

export const TransactionClient = () => {
  const { formattedDate, formattedTime } = useTime();
  return (
    <div className="flex flex-col gap-4 h-full">
      <DialogCancelTransaction />
      <DetailTransaction />
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
      <AtomValue atom={listtransactionAtom}>
        {({ data, isSuccess, isRefetching, isError, refetch, isPending }) => (
          <div className="bg-white p-5 flex flex-col gap-4 rounded-xl shadow">
            <div className="flex items-center w-full gap-2">
              <ShiftSearchInput
                isSuccess={isSuccess}
                disabled={isRefetching}
                isError={isError}
              />
              <Button size={"icon"} onClick={() => refetch()}>
                <RefreshCw
                  className={cn("size-3.5", isRefetching && "animate-spin")}
                />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <DataTable columns={column()} data={data?.resource.data ?? []} />
              <Pagination
                atomPage={transactionPage}
                pagination={data?.resource.pagination}
                isPending={isPending || isRefetching}
              />
            </div>
          </div>
        )}
      </AtomValue>
    </div>
  );
};

const ShiftSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(transactionSearch);
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
        placeholder="Cari transaksi..."
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
