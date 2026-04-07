import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Printer, ReceiptText, TicketX } from "lucide-react";

export const column = (): ColumnDef<{
  order_id: string;
  customer: string;
  price: number;
  status: boolean;
  date: Date;
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
    accessorKey: "order_id",
    header: "Order ID",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) =>
      format(row.original.date, "PP - HH:mm", {
        locale: id,
        in: tz("Asia/Jakarta"),
      }),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 border rounded-full w-fit px-2 py-0.5 border-gray-300">
          <span
            className={cn(
              "size-2 rounded-full",
              row.original.status ? "bg-green-500" : "bg-red-500",
            )}
          />
          {row.original.status ? "Selesai" : "Dibatalkan"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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
                disabled={!row.original.status}
                variant={"ghost"}
              >
                <Printer className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value="Detail Transaksi"
            render={
              <Button
                size={"icon-sm"}
                className={
                  "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                }
                variant={"ghost"}
              >
                <ReceiptText className="size-3.5" />
              </Button>
            }
          />
          <TooltipText
            value={"Batalkan Transaksi"}
            render={
              <Button
                disabled={!row.original.status}
                size={"icon-sm"}
                variant={"destructive"}
              >
                <TicketX className="size-3.5" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
