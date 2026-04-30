import { Button } from "@/components/ui/button";
import { formatRupiah, invalidate } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { removeItemCartAtom } from "../_api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { paymentCustomer, paymentMethodSelected } from "../_api/atoms";

export const columnSelected = (): ColumnDef<{
  id: number;
  barcode: string;
  product_name: string;
  price: number;
}>[] => [
  {
    header: () => <div className="text-center">No</div>,
    id: "id",
    cell: ({ row }) => (
      <div className="text-center tabular-nums">
        {(1 + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "product_name",
    header: "Nama",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <SetAtom atom={paymentCustomer}>
        {(setPayment) => (
          <SetAtom atom={paymentMethodSelected}>
            {(setPaymentMethod) => (
              <AtomValue atom={removeItemCartAtom}>
                {({ mutate: deleteItem, isPending: isDeleting }) => {
                  const queryClient = useQueryClient();
                  const handleRemove = (id: string) => {
                    deleteItem(id, {
                      onSuccess: async () => {
                        setPayment(0);
                        setPaymentMethod(null);
                        await Promise.all([
                          invalidate(queryClient, ["current-cart"]),
                          invalidate(queryClient, ["list-product"]),
                        ]);
                      },
                    });
                  };
                  return (
                    <TooltipText
                      value={"Hapus Produk"}
                      render={
                        <Button
                          size={"icon-xs"}
                          className={
                            "text-red-500 hover:text-red-500 hover:bg-red-100"
                          }
                          variant={"ghost"}
                          type="button"
                          onClick={() =>
                            handleRemove(row.original.id.toString())
                          }
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <Spinner className="size-3.5" />
                          ) : (
                            <Trash className="size-3.5" />
                          )}
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
    ),
  },
];
