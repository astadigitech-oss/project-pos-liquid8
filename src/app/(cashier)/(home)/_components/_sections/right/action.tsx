import { useAtomValue } from "jotai";
import React from "react";
import { cashierDialog, customerSelectedId } from "../../../_api/atoms";
import { currentCartAtom } from "../../../_api/queries";
import { Alert } from "./alert";
import { SetAtom } from "@suspensive/jotai";
import { TooltipText } from "@/providers/tooltip-provider";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingCart, Trash } from "lucide-react";

export const Action = () => {
  const memberId = useAtomValue(customerSelectedId);
  const { data } = useAtomValue(currentCartAtom);

  return (
    <SetAtom atom={cashierDialog}>
      {(setOpen) => (
        <div className="flex flex-col w-full gap-4">
          {(!data?.resource.items ||
            data?.resource.items?.length === 0 ||
            !memberId) && (
            <div className="flex flex-col w-full gap-2">
              {(!data?.resource.items ||
                data?.resource.items?.length === 0) && (
                <Alert label="Produk belum ditambahkan" isError />
              )}
              {!memberId && <Alert label="Customer belum dipilih" />}
            </div>
          )}
          <div className="flex items-center gap-2">
            <TooltipText
              value={"Batalkan transaksi"}
              render={
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  className={"size-10"}
                  onClick={() => setOpen("empty")}
                >
                  <Trash />
                </Button>
              }
            />
            <div className="w-full grid grid-cols-3 gap-3">
              <Button
                variant={"outlineDestructive"}
                className={
                  "col-span-1 flex-auto h-10 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:hover:bg-white"
                }
                onClick={() => setOpen("draft-add")}
                disabled={
                  !memberId ||
                  !data?.resource.items ||
                  data?.resource.items?.length === 0
                }
              >
                <Clock />
                Draf
              </Button>
              <Button
                className={
                  "col-span-2 flex-auto h-10 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:hover:bg-red-500"
                }
                variant={"diskonter"}
                disabled={
                  !memberId ||
                  !data?.resource.items ||
                  data?.resource.items?.length === 0
                }
                onClick={() => setOpen("checkout")}
              >
                <ShoppingCart />
                Bayar
              </Button>
            </div>
          </div>
        </div>
      )}
    </SetAtom>
  );
};
