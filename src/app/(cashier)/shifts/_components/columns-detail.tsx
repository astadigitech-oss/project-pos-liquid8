import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface ColumnItem {
  id: number;
  invoice: string;
  product_name: string;
  subtotal: number;
  created_at: string;
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
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => format(row.original.created_at, "dd/MM/yyyy HH:mm"),
  },
  {
    accessorKey: "product_name",
    header: "Nama Product",
    cell: ({ row }) => (
      <p className="lg:max-w-100 xl:max-w-120 max-w-50  truncate">
        {row.original.product_name ? row.original.product_name : "-"}
      </p>
    ),
  },
  {
    accessorKey: "subtotal",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.subtotal),
  },
];
