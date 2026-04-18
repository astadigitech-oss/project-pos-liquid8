import { Button } from "@/components/ui/button";
import { formatRupiah, invalidate } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { addToCartAtom } from "../_api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { productDialog } from "../_api/atoms";

interface ColumnProduct {
  name: string;
  quantity: number;
  barcode: string;
  price: number;
}

export const columnProduct = ({
  from,
}: {
  from: number;
}): ColumnDef<ColumnProduct>[] => [
  {
    header: () => <div className="text-center">No</div>,
    id: "id",
    cell: ({ row }) => (
      <div className="text-center tabular-nums">
        {(from + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "price",
    header: "Harga Satuan",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <SetAtom atom={productDialog}>
            {(setOpen) => (
              <AtomValue atom={addToCartAtom}>
                {({ mutate }) => {
                  const queryClient = useQueryClient();
                  const handleAddToCart = () => {
                    mutate(
                      { product_barcode: row.original.barcode },
                      {
                        onSuccess: async () => {
                          await invalidate(queryClient, ["current-cart"]);
                          await invalidate(queryClient, ["list-product"]);
                          setOpen(false);
                        },
                      },
                    );
                  };
                  return (
                    <TooltipText
                      value={"Pilih Produk"}
                      render={
                        <Button
                          size={"icon-xs"}
                          className={"hover:bg-gray-200"}
                          variant={"outline"}
                          onClick={handleAddToCart}
                        >
                          <Plus />
                        </Button>
                      }
                    />
                  );
                }}
              </AtomValue>
            )}
          </SetAtom>
        </div>
      );
    },
  },
];
