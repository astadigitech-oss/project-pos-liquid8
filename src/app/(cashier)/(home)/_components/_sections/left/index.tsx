import React from "react";
import { Content } from "./content";
import { ProductDialog } from "./_dialog/product";
import { BarcodeSearch } from "./search";
import { Button } from "@/components/ui/button";
import { RefreshCw, ScanSearch } from "lucide-react";
import { TooltipText } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { cashierDialog } from "../../../_api/atoms";
import { AtomValue } from "@suspensive/jotai";
import { currentCartAtom } from "../../../_api/queries";

export const LeftSection = () => {
  const setProductDialogOpen = useSetAtom(cashierDialog);
  return (
    <div className="flex flex-col gap-4 h-full">
      <ProductDialog />
      {/* Header Action */}
      <AtomValue atom={currentCartAtom}>
        {({ refetch, isRefetching }) => (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex-1">
              <BarcodeSearch isRefetching={isRefetching} />
            </div>

            <Button
              type="button"
              onClick={() => setProductDialogOpen("product")}
            >
              <ScanSearch className="size-3.5" />
              Produk
            </Button>

            <TooltipText
              value="Muat ulang"
              side="right"
              sideOffset={10}
              render={
                <Button
                  size="icon"
                  variant="outlineDestructive"
                  className={"hover:bg-white group"}
                  onClick={() => refetch()}
                >
                  <RefreshCw
                    className={cn(
                      "size-3.5 group-hover:rotate-22 transition-all",
                      isRefetching && "animate-spin",
                    )}
                  />
                </Button>
              }
            />
          </div>
        )}
      </AtomValue>
      <Content />
    </div>
  );
};
