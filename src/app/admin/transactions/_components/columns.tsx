import {
  detailTransactionDialog,
  selectedTransactionId,
} from "@/components/global/transactions/_api/atom";
import { Button } from "@/components/ui/button";
import { cn, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { tz } from "@date-fns/tz";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReceiptText, Scale, TicketX } from "lucide-react";
import { userInfoAtom } from "../../settings/(profil)/_api/queries";
import {
  approvedTransactionAdminDialog,
  approvedTransactionAdminSelectedId,
} from "../_api/atom";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  invoice: string;
  total_item: number;
  total_quantity: number;
  customer_name: string;
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
        {(from + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "store_name",
    header: "Toko",
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
        <div className="flex items-center gap-2 border rounded-full w-fit px-2 py-px border-gray-300 text-xs">
          <span
            className={cn(
              "size-2 rounded-full",
              row.original.status === "done"
                ? "bg-green-500"
                : row.original.status === "pending_cancel"
                  ? "bg-yellow-500"
                  : "bg-red-500",
            )}
          />
          {row.original.status === "done"
            ? "Selesai"
            : row.original.status === "pending_cancel"
              ? "Membatalkan"
              : "Dibatalkan"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <AtomValue atom={userInfoAtom}>
          {({ data: user }) => (
            <div className="flex items-center gap-1">
              <SetAtom atom={selectedTransactionId}>
                {(setTransactionId) => (
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
                )}
              </SetAtom>
              {user?.resource.role === "superadmin" &&
              row.original.status !== "pending_cancel" ? (
                <SetAtom atom={approvedTransactionAdminSelectedId}>
                  {(setApprovedId) => (
                    <SetAtom atom={approvedTransactionAdminDialog}>
                      {(setOpen) => (
                        <TooltipText
                          value={"Batalkan Transaksi"}
                          render={
                            <Button
                              disabled={row.original.status !== "done"}
                              size={"icon-sm"}
                              variant={"destructive"}
                              onClick={() => {
                                setOpen("cancel");
                                setApprovedId(row.original.id.toString());
                              }}
                            >
                              <TicketX className="size-3.5" />
                            </Button>
                          }
                        />
                      )}
                    </SetAtom>
                  )}
                </SetAtom>
              ) : (
                <SetAtom atom={approvedTransactionAdminSelectedId}>
                  {(setApprovedId) => (
                    <SetAtom atom={approvedTransactionAdminDialog}>
                      {(setOpen) => (
                        <TooltipText
                          value={"Konfirmasi Pembatalan"}
                          render={
                            <Button
                              disabled={
                                row.original.status !== "pending_cancel"
                              }
                              size={"icon-sm"}
                              variant={"destructive"}
                              className={
                                "bg-orange-100 text-orange-600 hover:bg-orange-200"
                              }
                              onClick={() => {
                                setOpen("confirm");
                                setApprovedId(row.original.id.toString());
                              }}
                            >
                              <Scale className="size-3.5" />
                            </Button>
                          }
                        />
                      )}
                    </SetAtom>
                  )}
                </SetAtom>
              )}
            </div>
          )}
        </AtomValue>
      );
    },
  },
];
