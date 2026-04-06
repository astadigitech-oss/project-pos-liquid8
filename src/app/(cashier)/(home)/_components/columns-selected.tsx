import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

export const columnSelected = (): ColumnDef<{
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
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <Button size={"icon-sm"}>
          <Plus className="size-3.5" />
        </Button>
      );
    },
  },
];
