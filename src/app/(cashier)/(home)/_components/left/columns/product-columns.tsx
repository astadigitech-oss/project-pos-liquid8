import { Button } from "@/components/ui/button";
import { formatRupiah, invalidate } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  cashierDialog,
  paymentCustomer,
  paymentMethodSelected,
} from "@/app/(cashier)/(home)/_api/atoms";
import { addToCartAtom } from "@/app/(cashier)/(home)/_api/mutation";

interface ColumnProduct {
  name: string;
  quantity: number;
  barcode: string;
  old_barcode: string;
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
    accessorKey: "old_barcode",
    header: "Old Barcode",
    cell: ({ row }) =>
      row.original.old_barcode ? row.original.old_barcode : "-",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <p className="max-w-50 lg:max-w-80 xl:max-w-90 truncate">
        {row.original.name ? row.original.name : "-"}
      </p>
    ),
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
          <SetAtom atom={cashierDialog}>
            {(setOpen) => (
              <SetAtom atom={paymentCustomer}>
                {(setPayment) => (
                  <SetAtom atom={paymentMethodSelected}>
                    {(setPaymentMethod) => (
                      <AtomValue atom={addToCartAtom}>
                        {({ mutate }) => {
                          const queryClient = useQueryClient();
                          const handleAddToCart = () => {
                            mutate(
                              {
                                reference_id: row.original.barcode,
                                type: "product",
                              },
                              {
                                onSuccess: async () => {
                                  setOpen("");
                                  setPayment(0);
                                  setPaymentMethod(null);
                                  await Promise.all([
                                    invalidate(queryClient, ["current-cart"]),
                                    invalidate(queryClient, ["list-product"]),
                                  ]);
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
                )}
              </SetAtom>
            )}
          </SetAtom>
        </div>
      );
    },
  },
];
