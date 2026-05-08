"use client";

import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { Pagination } from "@/components/pagination";
import { listStorePage, listStoreSearch } from "../_api/atom";
import { AtomValue } from "@suspensive/jotai";
import { listStoreAtom } from "../_api/queries";
import { useAtom } from "jotai";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { DetailTransaction } from "./_dialog/detail";

export const StoreAdminClient = () => {
  return (
    <AtomValue atom={listStoreAtom}>
      {({ data, isSuccess, isError, isRefetching }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-4">
          <DetailTransaction />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Toko</h1>
            <TransactionAdminSearchInput
              isSuccess={isSuccess}
              isError={isError}
              disabled={isRefetching}
            />
          </div>
          <div className="flex flex-col gap-4">
            <DataTable
              data={data?.resource.data ?? []}
              columns={column({ from: data?.resource.pagination.from ?? 0 })}
            />
            <Pagination
              atomPage={listStorePage}
              isPending={false}
              pagination={data?.resource.pagination}
            />
          </div>
        </div>
      )}
    </AtomValue>
  );
};

const TransactionAdminSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(listStoreSearch);
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
