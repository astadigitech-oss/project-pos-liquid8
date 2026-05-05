import {
  detailTransactionDialog,
  selectedTransactionId,
} from "@/components/global/transactions/_api/atom";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import { ReceiptText } from "lucide-react";

export const column = ({
  from,
}: {
  from: number;
}): ColumnDef<{
  id: number;
  store_name: string;
  phone: string;
  address: string;
  total_product: number;
  total_sales: number;
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
    accessorKey: "store_name",
    header: "Nama Toko",
  },
  {
    accessorKey: "total_product",
    header: "Total Produk",
    cell: ({ row }) => row.original.total_product.toLocaleString(),
  },
  {
    accessorKey: "total_sales",
    header: "Total Penjualan",
    cell: ({ row }) => formatRupiah(row.original.total_sales),
  },
  {
    accessorKey: "phone",
    header: "Nomor Telepon",
    cell: ({ row }) => formatPhoneNumber(row.original.phone),
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => row.original.address,
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
            </div>
          )}
        </SetAtom>
      );
    },
  },
];
