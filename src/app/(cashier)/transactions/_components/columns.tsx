import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReceiptText, TicketX } from "lucide-react";
import {
  detailTransactionDialog,
  cancelTransactionDialog,
  selectedTransactionId,
} from "@/components/global/transactions/_api/atom";

export const column = (): ColumnDef<{
  id: number;
  invoice: string;
  total_item: number;
  total_quantity: number;
  kasir: string;
  store_name: string;
  subtotal: number;
  tax: number;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
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
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "kasir",
    header: "Kasir",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) =>
      format(row.original.created_at, "PP - HH:mm", {
        locale: id,
        in: tz("Asia/Jakarta"),
      }),
  },
  {
    accessorKey: "total_item",
    header: "Total Item",
    cell: ({ row }) => row.original.total_item.toLocaleString(),
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatRupiah(row.original.total_amount),
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
              row.original.status === "done" ? "bg-green-500" : "bg-red-500",
            )}
          />
          {row.original.status === "done" ? "Selesai" : "Dibatalkan"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SetAtom atom={selectedTransactionId}>
          {(setTransactionId) => (
            <div className="flex items-center gap-1">
              <SetAtom atom={detailTransactionDialog}>
                {(setOpen) => (
                  <TooltipText
                    value="Detail Transaksi"
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setOpen(true);
                          setTransactionId(row.original.id.toString());
                        }}
                      >
                        <ReceiptText className="size-3.5" />
                      </Button>
                    }
                  />
                )}
              </SetAtom>
              <SetAtom atom={cancelTransactionDialog}>
                {(setOpen) => (
                  <TooltipText
                    value={"Batalkan Transaksi"}
                    render={
                      <Button
                        disabled={row.original.status === "cancelled"}
                        size={"icon-sm"}
                        variant={"destructive"}
                        onClick={() => {
                          setOpen(true);
                          setTransactionId(row.original.id.toString());
                        }}
                      >
                        <TicketX className="size-3.5" />
                      </Button>
                    }
                  />
                )}
              </SetAtom>
            </div>
          )}
        </SetAtom>
      );
    },
  },
];
