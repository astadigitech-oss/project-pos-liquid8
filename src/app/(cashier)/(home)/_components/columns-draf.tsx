import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Play, Trash } from "lucide-react";

export const columnDraf = (): ColumnDef<{
  customer_name: string;
  keep_code: string;
  item_count: number;
  total: number;
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
    accessorKey: "keep_code",
    header: "Kode",
  },
  {
    accessorKey: "customer_name",
    header: "Nama",
  },
  {
    accessorKey: "item_count",
    header: "Item",
    cell: ({ row }) => row.original.item_count.toLocaleString(),
  },
  {
    accessorKey: "price",
    header: "Total Harga",
    cell: ({ row }) => formatRupiah(row.original.total),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <TooltipText
            value="Lanjutkan Transaksi"
            render={
              <Button
                size={"icon-sm"}
                variant={"secondary"}
                className={"hover:bg-gray-200"}
              >
                <Play className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value="Hapus Transaksi"
            render={
              <Button size={"icon-sm"} variant={"destructive"}>
                <Trash className="size-3.5" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
