import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowLeftRight, Printer } from "lucide-react";

export const column = (): ColumnDef<{
  date: Date;
  cashier: string;
  initial_petty_cash: number;
  final_petty_cash: number;
  total_transaction: number;
  total_order: number;
}>[] => [
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
    accessorKey: "date",
    header: "Shift",
    cell: ({ row }) =>
      format(row.original.date, "dd MMM yyyy", {
        locale: id,
        in: tz("Asia/Jakarta"),
      }),
  },
  {
    accessorKey: "cashier",
    header: "Kasir",
  },
  {
    accessorKey: "initial_petty_cash",
    header: "Uang Kas (Awal)",
    cell: ({ row }) => formatRupiah(row.original.initial_petty_cash),
  },
  {
    accessorKey: "final_petty_cash",
    header: "Uang Kas (Akhir)",
    cell: ({ row }) => formatRupiah(row.original.final_petty_cash),
  },
  {
    accessorKey: "total_order",
    header: "Total Pesanan",
    cell: ({ row }) => row.original.total_order.toLocaleString(),
  },
  {
    accessorKey: "total_transaction",
    header: "Total Transaction",
    cell: ({ row }) => formatRupiah(row.original.total_transaction),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <TooltipText
            value="Print Struk"
            render={
              <Button
                size={"icon-sm"}
                className={
                  "text-emerald-600 bg-emerald-100 hover:bg-emerald-200 hover:text-emerald-700"
                }
                variant={"ghost"}
              >
                <Printer className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value="List Transaksi"
            render={
              <Button
                size={"icon-sm"}
                className={
                  "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                }
                variant={"ghost"}
              >
                <ArrowLeftRight className="size-3.5" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
