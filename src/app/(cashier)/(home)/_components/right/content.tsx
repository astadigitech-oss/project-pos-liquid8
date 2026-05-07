import { Delay } from "@suspensive/react";
import React from "react";
import { ErrorHandling } from "../error-handling";
import { Loader } from "../loader";
import { useAtomValue } from "jotai";
import { currentCartAtom } from "../../_api/queries";

import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { AlertTriangle, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackagingDialog } from "./_dialog/packaging";
import { SetAtom } from "@suspensive/jotai";
import { cashierDialog } from "../../_api/atoms";
import { ItemSelected } from "./item-selected";

export const Content = () => {
  const { data, refetch, isError, error, isSuccess, isRefetching } =
    useAtomValue(currentCartAtom);

  if (isError && isRefetching) return <RightLoader />;

  if (isError) {
    return (
      <Delay ms={500} fallback={<RightLoader />}>
        <div className="p-4 bg-white rounded-md h-full">
          <ErrorHandling error={error as Error} refetch={refetch} />
        </div>
      </Delay>
    );
  }

  if (isSuccess) {
    return (
      <Delay ms={500} fallback={<RightLoader />}>
        <div className="flex flex-col gap-4 text-sm">
          <PackagingDialog />
          <div className="px-4 bg-white rounded-md flex flex-col gap-4 shadow overflow-hidden">
            <div className="flex justify-between items-center bg-red-300 rounded-b-md px-3 font-semibold h-8 text-xs">
              <p>Total Items:</p>
              <div className="size-6 rounded-full flex items-center justify-center bg-red-50 border border-red-200">
                <p className="tabular-nums">
                  {(data.resource.products?.length ?? 0).toLocaleString()}
                </p>
              </div>
            </div>
            {data.resource.items && data.resource.items?.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {data.resource.items?.map((item) => (
                    <ItemSelected key={item.name} item={item} />
                  ))}
                  {data.resource.items_packaging?.map((item) => (
                    <ItemSelected key={item.name} item={item} isPackaging />
                  ))}
                </div>
                <SetAtom atom={cashierDialog}>
                  {(setOpen) => (
                    <Button
                      className={
                        "rounded-b-none justify-between h-8 border-none"
                      }
                      onClick={() => setOpen("packaging")}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag />
                        Plastik
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        Tambah
                        <ChevronRight />
                      </div>
                    </Button>
                  )}
                </SetAtom>
              </div>
            ) : (
              <div className="text-xs font-medium flex items-center gap-1.5 px-3 bg-gray-300 h-8 rounded-t-md">
                <AlertTriangle className="size-3" />
                Produk belum ditambahkan
              </div>
            )}
          </div>
          <div className="p-4 bg-white rounded-md flex flex-col gap-2 shadow">
            <div className="flex justify-between items-center">
              <p>Subtotal:</p>
              <p className="tabular-nums">
                {formatRupiah(data.resource.subtotal)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>PPN ({data.resource.ppn.tax}%):</p>
              <p className="tabular-nums">
                {formatRupiah(data.resource.ppn.amount)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>Pembulatan:</p>
              <p className="tabular-nums">
                {formatRupiah(data.resource.pembulatan)}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-base font-medium">
              <p>Total:</p>
              <p className="tabular-nums">
                {formatRupiah(data.resource.total_amount)}
              </p>
            </div>
          </div>
        </div>
      </Delay>
    );
  }
  return <RightLoader />;
};

const RightLoader = () => {
  return (
    <div className="p-4 bg-white rounded-md h-full">
      <Loader />
    </div>
  );
};
