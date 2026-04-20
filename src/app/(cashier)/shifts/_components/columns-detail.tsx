import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnItem {
  id: number;
  status: string;
  transaction_id: number;
  invoice: string;
  product_name: string;
  quantity: number;
  price: number;
  discount_price: number;
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
    accessorKey: "product_name",
    header: "Nama Product",
  },
  {
    accessorKey: "subtotal",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.subtotal),
  },
];
