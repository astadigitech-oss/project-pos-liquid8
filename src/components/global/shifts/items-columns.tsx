import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const columnItems: ColumnDef<ColumnItem>[] = [
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
    cell: ({ row }) => (
      <p className="lg:max-w-150 xl:max-w-175 max-w-90 truncate">
        {row.original.name ? row.original.name : "-"}
      </p>
    ),
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => (row.original.quantity ?? 0).toLocaleString(),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatRupiah(row.original.total),
  },
];
