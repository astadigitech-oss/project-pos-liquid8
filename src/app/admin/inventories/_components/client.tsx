"use client";

import { DataTable } from "@/components/data-table";
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
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue } from "@suspensive/jotai";
import { useAtom, useAtomValue } from "jotai";
import {
  CircleDashed,
  RefreshCw,
  Search,
  Store,
  X,
  XCircle,
} from "lucide-react";
import React from "react";
import { listStoreSelectAtom } from "../../stores/_api/queries";
import {
  inventoryAdminPage,
  inventoryAdminSearch,
  inventoryAdminStoreId,
} from "../_api/atom";
import { listInventoryAtom } from "../_api/queries";
import { column } from "./columns";

export const InventoriesClient = () => {
  const { data: storeSelect, isLoading: isStoreSelectLoading } =
    useAtomValue(listStoreSelectAtom);
  const [storeId, setStoreId] = useAtom(inventoryAdminStoreId);
  return (
    <AtomValue atom={listInventoryAtom}>
      {({ data, isSuccess, isPending, isRefetching, isError, refetch }) => (
        <div className="bg-white p-5 flex flex-col gap-4 rounded-xl shadow">
          <h1 className="font-semibold relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
            Inventori
          </h1>
          <div className="flex items-center justify-between w-full gap-4">
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
              {!!storeId && (
                <Button
                  variant={"outlineDestructive"}
                  className={
                    "aria-expanded:bg-red-50 aria-expanded:text-red-600 border-dashed overflow-hidden hover:bg-red-50"
                  }
                  size={"sm"}
                  onClick={() => {
                    setStoreId("");
                  }}
                >
                  <X className="size-3.5" />
                  Reset
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <InventorySearchInput
                disabled={isPending || isRefetching}
                isSuccess={isSuccess}
                isError={isError}
              />
              <Button
                variant={"diskonter"}
                size={"icon"}
                onClick={() => refetch()}
              >
                <RefreshCw
                  className={cn("size-3.5", isRefetching && "animate-spin")}
                />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DataTable
              columns={column({ from: data?.resource.pagination.from ?? 0 })}
              data={data?.resource.data ?? []}
            />
            <Pagination
              atomPage={inventoryAdminPage}
              pagination={data?.resource.pagination}
              isPending={isPending || isRefetching}
            />
          </div>
        </div>
      )}
    </AtomValue>
  );
};

const InventorySearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(inventoryAdminSearch);
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
        placeholder="Cari inventori..."
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
