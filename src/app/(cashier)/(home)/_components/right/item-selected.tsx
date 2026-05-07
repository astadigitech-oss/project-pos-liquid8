import React from "react";
import { TooltipText } from "@/providers/tooltip-provider";
import {
  Minus,
  Plus,
  RotateCw,
  Send,
  ShoppingBag,
  ShoppingBasket,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRupiah, invalidate } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AtomValue } from "@suspensive/jotai";
import { removeItemCartAtom } from "../../_api/mutation";
import { Spinner } from "@/components/ui/spinner";

export const ItemSelected = ({
  item,
  isPackaging = false,
}: {
  item: {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
  };
  isPackaging?: boolean;
}) => {
  const queryClient = useQueryClient();
  return (
    <div className="flex p-1 rounded-md items-center h-14 w-full cursor-default overflow-hidden bg-red-200 group">
      <div className="h-full aspect-square  flex items-center justify-center  ">
        {isPackaging ? (
          <ShoppingBag
            className="size-5 stroke-[1.5] text-red-700"
            absoluteStrokeWidth
          />
        ) : (
          <ShoppingBasket
            className="size-5 stroke-[1.5] text-red-700"
            absoluteStrokeWidth
          />
        )}
      </div>
      <div className="grid grid-cols-3 items-center w-full h-full bg-white px-2 rounded relative">
        {isPackaging && (
          <div className="bg-white absolute top-0 left-0 rounded size-full flex items-center justify-between overflow-hidden opacity-0 group-hover:opacity-100 transition-all">
            <div className="flex items-center h-full">
              <TooltipText
                value={"Reset"}
                render={
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className={
                      "h-full w-8 border-0 rounded-none  bg-yellow-200 hover:bg-yellow-300 text-yellow-700 hover:text-yellow-700"
                    }
                  >
                    <RotateCw />
                  </Button>
                }
              />
              <TooltipText
                value={"Kurang Qty"}
                render={
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className={"h-full w-8 border-0 rounded-none"}
                  >
                    <Minus />
                  </Button>
                }
              />
              <div className="h-full w-8 flex items-center justify-center font-medium">
                <p>4</p>
              </div>
              <TooltipText
                value={"Tambah Qty"}
                render={
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className={"h-full w-8 border-0 rounded-none"}
                  >
                    <Plus />
                  </Button>
                }
              />
              <TooltipText
                value={"Update"}
                render={
                  <Button
                    size={"icon"}
                    className={
                      "h-full w-8 border-0 rounded-none bg-green-200 hover:bg-green-300 text-green-700 hover:text-green-700"
                    }
                  >
                    <Send />
                  </Button>
                }
              />
            </div>
            <p className="text-sm font-semibold pl-3">Edit</p>
            <div className="flex items-center h-full">
              <AtomValue atom={removeItemCartAtom}>
                {({ mutate, isPending }) => (
                  <TooltipText
                    value={"Hapus"}
                    render={
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        className={"h-full w-8 border-0 rounded-none"}
                        disabled={isPending}
                        onClick={() => {
                          mutate((item.id ?? 0).toString(), {
                            onSuccess: async () => {
                              await invalidate(queryClient, ["current-cart"]);
                            },
                          });
                        }}
                      >
                        {isPending ? <Spinner /> : <Trash />}
                      </Button>
                    }
                  />
                )}
              </AtomValue>
            </div>
          </div>
        )}
        <div className="flex flex-col col-span-2">
          <p className="font-medium">{item.name}</p>
          <div className="flex items-center gap-2  text-black/80 text-xs">
            <p className="tabular-nums">{formatRupiah(item.price)}</p>
            <p className="tabular-nums">x{item.quantity.toString()}</p>
          </div>
        </div>
        <p className="tabular-nums ml-auto">{formatRupiah(item.total)}</p>
      </div>
    </div>
  );
};
