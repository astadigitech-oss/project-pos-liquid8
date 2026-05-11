import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RefreshCw, SearchIcon, XCircle, XIcon } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Atom, AtomValue } from "@suspensive/jotai";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";
import {
  cashierDialog,
  productPage,
  productSearch,
} from "@/app/(cashier)/(home)/_api/atoms";
import { listProductAtom } from "@/app/(cashier)/(home)/_api/queries";
import { columnProduct } from "../columns/product-columns";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// --- Search Input terpisah ---
function SearchInput({
  search,
  setSearch,
  isPending,
  isRefetching,
  isSuccess,
}: {
  search: string;
  setSearch: (v: string) => void;
  isPending: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
}) {
  const [localValue, setLocalValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [localValue, setSearch]);

  useEffect(() => {
    if (!isRefetching && isSuccess) {
      inputRef.current?.focus();
    }
  }, [isSuccess, isRefetching]);

  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  return (
    <InputGroupInput
      placeholder="Cari produk..."
      ref={inputRef}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="disabled:opacity-100"
      disabled={isPending || isRefetching}
    />
  );
}

export const ProductDialog = () => {
  const [autoClose, setAutoClose] = useState(true);
  return (
    <Atom atom={cashierDialog}>
      {([open, setOpen]) => (
        <Dialog
          open={!!open && open === "product"}
          onOpenChange={(e) => {
            if (!e) setOpen("");
          }}
        >
          <DialogContent
            showCloseButton={false}
            className="lg:min-w-[calc(var(--container-5xl)-32px)] xl:min-w-5xl min-w-[calc(var(--container-3xl)-32px)]"
          >
            <DialogHeader>
              <DialogTitle>Daftar Produk</DialogTitle>
              <DialogDescription>Pilih produk secara manual</DialogDescription>
            </DialogHeader>
            <AtomValue atom={listProductAtom}>
              {({ data, refetch, isRefetching, isPending, isSuccess }) => (
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Atom atom={productSearch}>
                      {([search, setSearch]) => {
                        return (
                          <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent">
                            <SearchInput
                              search={search}
                              setSearch={setSearch}
                              isPending={isPending}
                              isRefetching={isRefetching}
                              isSuccess={isSuccess}
                            />
                            <InputGroupAddon>
                              <SearchIcon className="size-3.5" />
                            </InputGroupAddon>
                            {(isPending || isRefetching) && (
                              <InputGroupAddon align="inline-end">
                                <Spinner className="size-3.5" />
                              </InputGroupAddon>
                            )}
                            {!isPending &&
                              !isRefetching &&
                              search.length > 0 && (
                                <InputGroupAddon align="inline-end">
                                  <TooltipText
                                    value="Bersihkan pencarian"
                                    sideOffset={10}
                                    render={
                                      <InputGroupButton
                                        size="icon-xs"
                                        type="button"
                                        onClick={() => setSearch("")}
                                      >
                                        <XCircle className="size-3.5" />
                                      </InputGroupButton>
                                    }
                                  />
                                </InputGroupAddon>
                              )}
                          </InputGroup>
                        );
                      }}
                    </Atom>
                    <Button size="icon" onClick={() => refetch()}>
                      <RefreshCw
                        className={cn(
                          "size-3.5",
                          isRefetching && "animate-spin",
                        )}
                      />
                    </Button>
                    <Label className="h-8 border rounded-md px-2 border-gray-300 hover:border-gray-400">
                      <Switch
                        size="sm"
                        checked={autoClose}
                        onCheckedChange={setAutoClose}
                      />
                      <p className="whitespace-nowrap">Tutup Otomatis</p>
                    </Label>
                  </div>
                  <DataTable
                    columns={columnProduct({
                      from: data?.resource.pagination.from ?? 0,
                      autoClose,
                    })}
                    data={data?.resource.data ?? []}
                  />
                  <Pagination
                    atomPage={productPage}
                    pagination={data?.resource.pagination}
                    isPending={isPending || isRefetching}
                  />
                </div>
              )}
            </AtomValue>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="outline">
                    <XIcon />
                    Tutup
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
