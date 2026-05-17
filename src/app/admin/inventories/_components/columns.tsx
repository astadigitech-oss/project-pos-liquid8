import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
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
    cell: ({ row }) => (
      <TooltipText
        value={row.original.name}
        delay={500}
        render={
          <p className="max-w-60 lg:max-w-100 xl:max-w-160 truncate">
            {row.original.name}
          </p>
        }
      />
    ),
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
