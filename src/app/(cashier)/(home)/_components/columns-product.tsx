import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export const columnProduct = (): ColumnDef<{
  name: string;
  qty: number;
  type: string;
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
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "type",
    header: "Tipe",
  },
  {
    accessorKey: "price",
    header: "Harga Satuan",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center">
          <TooltipText
            value={"Pilih Produk"}
            render={
              <Button
                size={"icon-xs"}
                className={"hover:bg-gray-200"}
                variant={"outline"}
              >
                <Plus />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
