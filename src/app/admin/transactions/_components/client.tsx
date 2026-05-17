"use client";

import { DataTable } from "@/components/data-table";
import { DialogCancelTransaction } from "@/components/global/transactions/cancel";
import { DetailTransaction } from "@/components/global/transactions/detail";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue } from "@suspensive/jotai";
import { useAtom, useAtomValue } from "jotai";
import {
  ChevronDown,
  CircleDashed,
  CloudDownload,
  Download,
  RefreshCw,
  Search,
  Store,
  X,
  XCircle,
} from "lucide-react";
import React from "react";
import { listStoreSelectAtom } from "../../stores/_api/queries";
import {
  transactionListAdminPage,
  transactionListAdminSearch,
  transactionListAdminStatus,
  transactionListAdminStoreId,
} from "../_api/atom";
import { transactionListAdminAtom } from "../_api/queries";
import { AlertDialog } from "./_dialog/alert";
import { column } from "./columns";
import { Field, FieldLabel } from "@/components/ui/field";
import { exportTransactionAdminAtom } from "../_api/mutation";

export const TransactionAdminClient = () => {
  const [exportId, setExportId] = React.useState("");
  const [exportStore, setExportStore] = React.useState(false);
  const [exportDialog, setExportDialog] = React.useState(false);
  const { data: storeSelect, isLoading: isStoreSelectLoading } =
    useAtomValue(listStoreSelectAtom);
  const [storeId, setStoreId] = useAtom(transactionListAdminStoreId);
  const [status, setStatus] = useAtom(transactionListAdminStatus);
  return (
    <AtomValue atom={transactionListAdminAtom}>
      {({ data, isSuccess, isError, isRefetching, refetch }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-4">
          <AlertDialog />
          <DialogCancelTransaction />
          <DetailTransaction />
          <h1 className="font-semibold relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
            Transactions
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      disabled={isStoreSelectLoading}
                      variant={"outlineDestructive"}
                      className={cn(
                        "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50",
                        storeId ? "pr-0" : "pr-2.5",
                      )}
                      size={"sm"}
                    >
                      <CircleDashed className="size-3.5" />
                      <span className="text-xs">Toko</span>
                      {storeId && (
                        <div className="h-7 flex items-center px-2 text-xs bg-red-50 border-dashed border-l border-red-400 ml-1">
                          {
                            storeSelect?.find(
                              (i) => i.id === Number.parseFloat(storeId),
                            )?.store_name
                          }
                        </div>
                      )}
                    </Button>
                  }
                />
                <PopoverContent
                  className={"p-0 w-auto overflow-hidden relative"}
                  align="start"
                >
                  <Command className="p-0">
                    <CommandInput
                      className="placeholder:text-xs text-xs [&_svg]:size-3.5! h-7"
                      placeholder="Cari toko..."
                    />
                    <CommandList>
                      <CommandEmpty className="text-xs">
                        No results found.
                      </CommandEmpty>
                      <CommandGroup className="pb-10">
                        {storeSelect?.map((item) => (
                          <CommandItem
                            key={item.id}
                            data-checked={storeId === item.id.toString()}
                            onSelect={() =>
                              setStoreId(
                                storeId === item.id.toString()
                                  ? ""
                                  : item.id.toString(),
                              )
                            }
                            className="text-xs h-8"
                          >
                            <Store className="size-3.5" />
                            {item.store_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup className="absolute bottom-0 bg-white w-full border-t">
                        <CommandItem
                          className="text-xs h-8"
                          onSelect={() => setStoreId("")}
                        >
                          <X className="size-3.5" />
                          Reset
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outlineDestructive"}
                      className={cn(
                        "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50",
                        status ? "pr-0" : "pr-2.5",
                      )}
                      size={"sm"}
                    >
                      <CircleDashed className="size-3.5" />
                      <span className="text-xs">Status</span>
                      {status && (
                        <div className="h-7 flex items-center px-2 text-xs bg-red-50 border-dashed border-l border-red-400 ml-1">
                          {status === "done" && "Selesai"}
                          {status === "pending_cancel" && "Membatalkan"}
                          {status === "cancelled" && "Dibatalkan"}
                        </div>
                      )}
                    </Button>
                  }
                />
                <PopoverContent
                  className={"p-0 w-auto overflow-hidden relative"}
                  align="start"
                >
                  <Command className="p-0">
                    <CommandInput
                      className="placeholder:text-xs text-xs [&_svg]:size-3.5! h-7"
                      placeholder="Cari status..."
                    />
                    <CommandList>
                      <CommandEmpty className="text-xs">
                        No results found.
                      </CommandEmpty>
                      <CommandGroup className="pb-10">
                        <CommandItem
                          data-checked={status === "done"}
                          onSelect={() =>
                            setStatus(status === "done" ? "" : "done")
                          }
                          className="text-xs h-8"
                        >
                          <div className="size-2 rounded-full bg-green-500" />
                          Selesai
                        </CommandItem>
                        <CommandItem
                          data-checked={status === "pending_cancel"}
                          onSelect={() =>
                            setStatus(
                              status === "pending_cancel"
                                ? ""
                                : "pending_cancel",
                            )
                          }
                          className="text-xs h-8"
                        >
                          <div className="size-2 rounded-full bg-yellow-500" />
                          Membatalkan
                        </CommandItem>
                        <CommandItem
                          data-checked={status === "cancelled"}
                          onSelect={() =>
                            setStatus(status === "cancelled" ? "" : "cancelled")
                          }
                          className="text-xs h-8"
                        >
                          <div className="size-2 rounded-full bg-red-500" />
                          Dibatalkan
                        </CommandItem>
                      </CommandGroup>
                      <CommandGroup className="absolute bottom-0 bg-white w-full border-t">
                        <CommandItem
                          className="text-xs h-8"
                          onSelect={() => setStatus("")}
                        >
                          <X className="size-3.5" />
                          Reset
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {(!!storeId || !!status) && (
                <Button
                  variant={"outlineDestructive"}
                  className={
                    "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50"
                  }
                  size={"sm"}
                  onClick={() => {
                    setStoreId("");
                    setStatus("");
                  }}
                >
                  <X className="size-3.5" />
                  Reset
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <TransactionAdminSearchInput
                isSuccess={isSuccess}
                isError={isError}
                disabled={isRefetching}
              />
              <TooltipText
                render={
                  <Button
                    onClick={() => refetch()}
                    size={"icon"}
                    variant={"outline"}
                    className={"border-gray-300"}
                  >
                    <RefreshCw
                      className={cn("size-3.5", isRefetching && "animate-spin")}
                    />
                  </Button>
                }
                value="Muat Ulang"
              />
              <Popover
                open={exportDialog}
                onOpenChange={(e) => {
                  setExportDialog(e);
                  if (!e) setExportId("");
                }}
              >
                <TooltipText
                  value="Export Transaksi"
                  render={
                    <PopoverTrigger
                      render={
                        <Button
                          size={"icon"}
                          variant={"outlineDestructive"}
                          className={
                            "aria-expanded:bg-red-100 aria-expanded:text-red-600"
                          }
                        >
                          <CloudDownload
                            className={cn(
                              "size-3.5",
                              isRefetching && "animate-spin",
                            )}
                          />
                        </Button>
                      }
                    />
                  }
                />
                <PopoverContent align="end" className={"min-w-60 w-fit"}>
                  <PopoverHeader>
                    <PopoverTitle>Export Data Transaksi</PopoverTitle>
                  </PopoverHeader>
                  <div className="flex flex-col gap-4">
                    <Field className="gap-1">
                      <FieldLabel>Target Toko</FieldLabel>
                      <Popover
                        modal={false}
                        open={exportStore}
                        onOpenChange={setExportStore}
                      >
                        <PopoverTrigger
                          render={
                            <Button
                              variant={"outline"}
                              className={"text-xs justify-between"}
                            >
                              <div className="flex items-center gap-2">
                                <Store className="size-3.5" />
                                {storeSelect?.find(
                                  (i) => i.id.toString() === exportId,
                                )
                                  ? storeSelect?.find(
                                      (i) => i.id.toString() === exportId,
                                    )?.store_name
                                  : "Semua Toko"}
                              </div>
                              <ChevronDown className="size-3.5" />
                            </Button>
                          }
                        />
                        <PopoverContent
                          className={"p-0 w-fit relative overflow-hidden"}
                        >
                          <Command className="p-0">
                            <CommandInput
                              className="text-xs placeholder:text-xs"
                              placeholder="Cari toko..."
                            />
                            <CommandList>
                              <CommandEmpty>No found</CommandEmpty>
                              <CommandGroup className="pb-10">
                                {storeSelect?.map((item) => (
                                  <CommandItem
                                    className="text-xs h-8"
                                    data-checked={
                                      exportId === item.id.toString()
                                    }
                                    key={item.id}
                                    onSelect={() => {
                                      setExportId((prev) =>
                                        prev === item.id.toString()
                                          ? ""
                                          : item.id.toString(),
                                      );
                                      setExportStore(false);
                                    }}
                                  >
                                    <Store className="size-3.5" />
                                    {item.store_name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup className="absolute bottom-0 bg-white w-full border-t">
                                <CommandItem
                                  data-checked={!exportId}
                                  className="text-xs h-8"
                                  onSelect={() => {
                                    setExportId("");
                                    setExportStore(false);
                                  }}
                                >
                                  <Store className="size-3.5" />
                                  Semua Toko
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </Field>
                    <AtomValue atom={exportTransactionAdminAtom}>
                      {({ mutate, isPending }) => (
                        <Button
                          onClick={() =>
                            mutate(
                              { id: exportId },
                              {
                                onSuccess: (data) => {
                                  if (data?.success && data?.url) {
                                    // 1. Buat elemen link samaran
                                    const link = document.createElement("a");
                                    link.href = data.url;

                                    // 2. Opsional: Berikan nama file saat diunduh
                                    link.setAttribute(
                                      "download",
                                      "transactions.xlsx",
                                    );

                                    // 3. Masukkan ke dokumen, klik, lalu hapus kembali
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                  }
                                  setExportDialog(false);
                                  setExportId("");
                                },
                              },
                            )
                          }
                          className={"text-xs"}
                        >
                          {isPending ? (
                            <Spinner className="size-3.5" />
                          ) : (
                            <Download className="size-3.5" />
                          )}
                          {isPending ? "Exporting..." : "Export"}
                        </Button>
                      )}
                    </AtomValue>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DataTable
              data={data?.resource.data ?? []}
              columns={column({ from: data?.resource.pagination.from ?? 0 })}
            />
            <Pagination
              atomPage={transactionListAdminPage}
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
  const [search, setSearch] = useAtom(transactionListAdminSearch);
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
