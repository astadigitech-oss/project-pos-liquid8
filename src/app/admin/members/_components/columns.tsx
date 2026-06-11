import { ColumnDef } from "@tanstack/react-table";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  code: string;
  name: string;
  phone: string;
  store_id: number;
  store_name: string;
  monthly_transaction: number;
  monthly_point: number;
  total_shopping: number;
  total_point: number;
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
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "phone",
    header: "No. Hp.",
  },
  {
    accessorKey: "store_name",
    header: "Toko",
  },
  {
    accessorKey: "monthly_transaction",
    header: "Transaksi Bulanan",
  },
  {
    accessorKey: "monthly_point",
    header: "Poin Bulanan",
  },
  {
    accessorKey: "total_shopping",
    header: "Total Belanja",
  },
  {
    accessorKey: "total_point",
    header: "Total Poin",
  },
];
