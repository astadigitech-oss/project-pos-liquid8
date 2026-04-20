import React, { useState, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { Delay, Suspense } from "@suspensive/react";
import {
  PowerOffIcon,
  RefreshCw,
  ScanBarcode,
  ScanSearch,
  XCircle,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DataTable } from "@/components/data-table";
import { TooltipText } from "@/providers/tooltip-provider";

import { currentCartAtom } from "../../_api/queries";
import { productDialog } from "../../_api/atoms";
import { addToCartAtom } from "../../_api/mutation";
import { columnSelected } from "../columns-selected";
import { cn, invalidate } from "@/lib/utils";
import { ProductList } from "../_dialog/products";

// --- Komponen Terpisah untuk Input Barcode ---
const BarcodeSearch = ({ isRefetching }: { isRefetching: boolean }) => {
  const queryClient = useQueryClient();
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: addToCart, isPending: isAdding } =
    useAtomValue(addToCartAtom);

  useEffect(() => {
    if (!localValue) return;

    const handler = setTimeout(() => {
      addToCart(
        { product_barcode: localValue },
        {
          onSuccess: async () => {
            setLocalValue("");
            inputRef.current?.focus();
            await Promise.all([
              invalidate(queryClient, ["current-cart"]),
              invalidate(queryClient, ["list-product"]),
            ]);
          },
        },
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [localValue, addToCart, queryClient]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent">
      <InputGroupInput
        placeholder="Cari atau scan barcode..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={isRefetching || isAdding}
      />
      <InputGroupAddon>
        <ScanBarcode className="size-3.5" />
      </InputGroupAddon>

      {isRefetching || isAdding ? (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-3.5" />
        </InputGroupAddon>
      ) : localValue.length > 0 ? (
        <InputGroupAddon align="inline-end">
          <TooltipText
            value="Bersihkan"
            render={
              <InputGroupButton
                size="icon-xs"
                onClick={() => setLocalValue("")}
              >
                <XCircle className="size-3.5" />
              </InputGroupButton>
            }
          />
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
};

// --- Komponen Utama ---
export const CurrentCart = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CartContent />
    </Suspense>
  );
};

const CartContent = () => {
  const setProductDialogOpen = useSetAtom(productDialog);
  const { data, refetch, isError, error, isSuccess, isRefetching } =
    useAtomValue(currentCartAtom);

  if (isError && isRefetching) return <Loader />;

  if (isError) {
    return (
      <Delay ms={500} fallback={<Loader />}>
        <ErrorHandling error={error as Error} refetch={refetch} />
      </Delay>
    );
  }

  if (isSuccess) {
    return (
      <Delay ms={500} fallback={<Loader />}>
        <ProductList />
        <div className="w-full rounded-lg h-full shadow flex flex-col bg-white">
          {/* Header Action */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-300">
            <div className="flex-1">
              <BarcodeSearch isRefetching={isRefetching} />
            </div>

            <Button type="button" onClick={() => setProductDialogOpen(true)}>
              <ScanSearch className="size-3.5 mr-2" />
              Produk
            </Button>

            <TooltipText
              value="Muat ulang"
              side="right"
              render={
                <Button size="icon" variant="outline" onClick={() => refetch()}>
                  <RefreshCw
                    className={cn("size-3.5", isRefetching && "animate-spin")}
                  />
                </Button>
              }
            />
          </div>

          {/* Table Area */}
          <div className="p-4 flex-1 overflow-auto">
            <DataTable
              columns={columnSelected()}
              data={data?.resource?.items ?? []}
            />
          </div>
        </div>
      </Delay>
    );
  }

  return <Loader />;
};

// --- UI Sub-components (Loader & Error) ---
const Loader = () => (
  <div className="size-full p-4">
    <div className="size-full border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5">
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Spinner className="size-5" />
        </div>
        <p className="text-sm font-medium">Memuat data...</p>
      </div>
    </div>
  </div>
);

const ErrorHandling = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => (
  <div className="size-full p-4">
    <div className="size-full border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5">
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
          <PowerOffIcon className="size-5" />
        </div>
        <p className="text-sm font-medium">{error.message}</p>
        <Button onClick={() => refetch()} className={"text-xs"}>
          <RefreshCw className="size-3.5" />
          Muat ulang
        </Button>
      </div>
    </div>
  </div>
);
