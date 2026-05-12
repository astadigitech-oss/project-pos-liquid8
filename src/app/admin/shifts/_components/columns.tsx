import {
  detailShiftDialog,
  detailShiftId,
} from "@/components/global/shifts/_api/atom";
import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReceiptText } from "lucide-react";

export const column = (): ColumnDef<{
  id: number;
  store_id: number;
  open_by: number;
  closed_by: number;
  start_time: string;
  end_time: string;
  status: string;
  initial_cash: number;
  total_cash: number;
  total_transfer: number;
  total_qris: number;
  total_tax: number;
  subtotal: number;
  expected_amount: number;
  actual_cash: number;
  difference: number;
  note: string;
  created_at: string;
  updated_at: string;
  user_open: string;
  user_close: string;
  store_name: string;
  expected_cash: number;
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
    accessorKey: "start_time",
    header: "Mulai",
    cell: ({ row }) => (
      <p>
        {format(row.original.start_time, "iii, dd MMM yyyy HH:mm", {
          locale: id,
          in: tz("Asia/Jakarta"),
        })}{" "}
        - {row.original.user_open}
      </p>
    ),
  },
  {
    accessorKey: "end_time",
    header: "Selesai",
    cell: ({ row }) => {
      if (row.original.status === "open") {
        return "-";
      }
      return (
        <p>
          {format(row.original.end_time, "iii, dd MMM yyyy HH:mm", {
            locale: id,
            in: tz("Asia/Jakarta"),
          })}{" "}
          - {row.original.user_close}
        </p>
      );
    },
  },
  {
    accessorKey: "initial_cash",
    header: "Awal Kas",
    cell: ({ row }) => formatRupiah(row.original.initial_cash),
  },
  {
    accessorKey: "actual_cash",
    header: "Akhir Kas",
    cell: ({ row }) => {
      if (row.original.status === "open") {
        return "-";
      }
      return formatRupiah(row.original.actual_cash);
    },
  },
  {
    accessorKey: "different",
    header: "Selisih Kas",
    cell: ({ row }) => {
      if (row.original.status === "open") {
        return "-";
      }
      return (
        <p
          className={cn(
            "px-2 py-0.5 bg-green-200 w-fit rounded-md",
            row.original.difference < 0 && "bg-red-200",
            row.original.difference === 0 && "bg-gray-200",
          )}
        >
          {formatRupiah(row.original.difference)}
        </p>
      );
    },
  },
  {
    accessorKey: "expected_cash",
    header: "Ekspektasi Kas",
    cell: ({ row }) => {
      if (row.original.status === "open") {
        return "-";
      }
      return formatRupiah(row.original.expected_cash);
    },
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
              row.original.status === "open" ? "bg-yellow-500" : "bg-green-500",
            )}
          />
          {row.original.status === "open" ? "Berjalan" : "Selesai"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SetAtom atom={detailShiftId}>
          {(setShiftId) => (
            <div className="flex items-center gap-1">
              <SetAtom atom={detailShiftDialog}>
                {(setOpen) => (
                  <TooltipText
                    value="Detail Shift"
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-700"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setOpen(true);
                          setShiftId(row.original.id.toString());
                        }}
                      >
                        <ReceiptText className="size-3.5" />
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
