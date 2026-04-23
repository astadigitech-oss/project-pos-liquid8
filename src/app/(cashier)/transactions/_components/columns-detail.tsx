import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnItem {
  id: number;
  product_name: string;
  price: number;
  barcode: string;
}

export const columnDetail: ColumnDef<ColumnItem>[] = [
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
    header: "Nama Product",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
];
