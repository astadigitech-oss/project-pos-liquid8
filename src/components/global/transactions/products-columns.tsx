import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnItem {
  id: number;
  product_name: string;
  price: number;
  barcode: string;
}

export const columnProducts: ColumnDef<ColumnItem>[] = [
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
    cell: ({ row }) => (
      <p className="lg:max-w-150 xl:max-w-175 max-w-90 truncate">
        {row.original.product_name ? row.original.product_name : "-"}
      </p>
    ),
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
];
