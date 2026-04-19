import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowLeftRight, Printer } from "lucide-react";
import { detailShiftDialog, detailShiftId } from "../_api/atom";

export const column = (): ColumnDef<{
  id: number;
  cashier_open: string;
  cashier_closed: string;
  start_time: string;
  end_time: string;
  status: string;
  initial_cash: number;
  expected_cash: number;
  actual_cash: number;
  difference: number;
  store_name: string;
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
    accessorKey: "start_time",
    header: "Mulai",
    cell: ({ row }) => (
      <p>
        {format(row.original.start_time, "iii, dd MMM yyyy HH:mm", {
          locale: id,
          in: tz("Asia/Jakarta"),
        })}{" "}
        - {row.original.cashier_open}
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
          - {row.original.cashier_open}
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
              row.original.status === "open" ? "bg-green-500" : "bg-red-500",
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
                    value="Print Struk"
                    render={
                      <Button
                        size={"icon-sm"}
                        className={
                          "text-emerald-600 bg-emerald-100 hover:bg-emerald-200 hover:text-emerald-700"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          setOpen(true);
                          setShiftId(row.original.id.toString());
                        }}
                      >
                        <Printer className="size-3.5" />
                      </Button>
                    }
                  />
                )}
              </SetAtom>
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
          )}
        </SetAtom>
      );
    },
  },
];
