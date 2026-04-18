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
import React from "react";
import { columnProduct } from "../columns-product";
import { Button } from "@/components/ui/button";
import { Atom, AtomValue } from "@suspensive/jotai";
import { productDialog, productPage, productSearch } from "../../_api/atoms";
import { listProductAtom } from "../../_api/queries";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";

export const ProductList = () => {
  return (
    <Atom atom={productDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-3xl"}>
            <DialogHeader>
              <DialogTitle>Daftar Produk</DialogTitle>
              <DialogDescription>Pilih produk secara manual</DialogDescription>
            </DialogHeader>
            <AtomValue atom={listProductAtom}>
              {({ data, refetch, isRefetching, isPending, isSuccess }) => (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Atom atom={productSearch}>
                      {([search, setSearch]) => {
                        const SearchInput = ({
                          isSuccess,
                        }: {
                          isSuccess: boolean;
                        }) => {
                          const [localValue, setLocalValue] =
                            React.useState(search);

                          const inputRef = React.useRef<HTMLInputElement>(null);

                          React.useEffect(() => {
                            const handler = setTimeout(() => {
                              setSearch(localValue);
                            }, 500);
                            return () => clearTimeout(handler);
                          }, [localValue]);

                          React.useEffect(() => {
                            if (isSuccess) {
                              inputRef.current?.focus();
                            }
                          }, [isSuccess]);

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
                        };

                        return (
                          <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent">
                            <SearchInput isSuccess={isSuccess} />
                            <InputGroupAddon>
                              <SearchIcon className="size-3.5" />
                            </InputGroupAddon>
                            {(isPending || isRefetching) && (
                              <InputGroupAddon align={"inline-end"}>
                                <Spinner className="size-3.5" />
                              </InputGroupAddon>
                            )}
                            {!isPending &&
                              !isRefetching &&
                              search.length > 0 && (
                                <InputGroupAddon align={"inline-end"}>
                                  <TooltipText
                                    value={"Bersihkan pencarian"}
                                    sideOffset={10}
                                    render={
                                      <InputGroupButton
                                        size={"icon-xs"}
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
                    <Button size={"icon"} onClick={() => refetch()}>
                      <RefreshCw
                        className={cn(
                          "size-3.5",
                          isRefetching && "animate-spin",
                        )}
                      />
                    </Button>
                  </div>
                  <DataTable
                    columns={columnProduct({
                      from: data?.resource.pagination.from ?? 0,
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
                  <Button variant={"outline"}>
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
