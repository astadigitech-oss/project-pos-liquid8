import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  barcode: string;
  name: string;
  price: number;
}>[] => [
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
    header: "Nama Produk",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
];
