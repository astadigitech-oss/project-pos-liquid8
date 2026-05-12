import { formatRupiah } from "@/lib/utils";
import { tz } from "@date-fns/tz";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  store_id: number;
  store_name: string;
  code: string;
  user: string;
  total_product: number;
  total_price: number;
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
    accessorKey: "code",
    header: "Kode",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) =>
      format(row.original.created_at, "iii, dd MMM yyyy HH:mm", {
        locale: id,
        in: tz("Asia/Jakarta"),
      }),
  },
  {
    accessorKey: "store_name",
    header: "Toko",
  },
  {
    accessorKey: "total_product",
    header: "Total Produk",
    cell: ({ row }) => (row.original.total_product ?? 0).toLocaleString(),
  },
  {
    accessorKey: "total_price",
    header: "Total Harga",
    cell: ({ row }) => formatRupiah(row.original.total_price ?? 0),
  },
];
