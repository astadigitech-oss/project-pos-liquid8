import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  store_id: number;
  barcode: string;
  name: string;
  price: number;
  tag_color: string;
  quantity: number;
  status: string;
  store_name: string;
  created_at: string;
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
    cell: ({ row }) => formatRupiah(row.original.price ?? 0),
  },
  {
    accessorKey: "store_name",
    header: "Toko",
    cell: ({ row }) => (
      <Link
        href={`/admin/stores/${row.original.store_id}`}
        className="hover:underline underline-offset-2"
      >
        {row.original.store_name}
      </Link>
    ),
  },
];
