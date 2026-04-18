import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columnSelected = (): ColumnDef<{
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
    cell: () => (
      <TooltipText
        value={"Hapus Produk"}
        render={
          <Button
            size={"icon-xs"}
            className={"text-red-500 hover:text-red-500 hover:bg-red-100"}
            variant={"ghost"}
          >
            <Trash />
          </Button>
        }
      />
    ),
  },
];
