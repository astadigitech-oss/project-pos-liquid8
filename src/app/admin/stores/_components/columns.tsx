import { Button } from "@/components/ui/button";
import { formatPhoneNumber, formatRupiah } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { SetAtom } from "@suspensive/jotai";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardClock,
  Landmark,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { transactionListAdminStoreId } from "../../transactions/_api/atom";
import { shiftAdminStoreId } from "../../shifts/_api/atom";
import { inventoryAdminStoreId } from "../../inventories/_api/atom";
import { migrationAdminStoreId } from "../../migrations/_api/atom";

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
        <div className="flex items-center gap-1">
          <TooltipText
            value="Detail Toko"
            render={
              <Link href={`/admin/stores/${row.original.id}`}>
                <Button
                  size={"icon-sm"}
                  className={
                    "text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-600"
                  }
                  variant={"ghost"}
                >
                  <ReceiptText className="size-3.5" />
                </Button>
              </Link>
            }
          />
          <SetAtom atom={transactionListAdminStoreId}>
            {(setStoreId) => (
              <TooltipText
                value="Transaksi Toko"
                render={
                  <Link href={`/admin/transactions`}>
                    <Button
                      size={"icon-sm"}
                      className={
                        "text-yellow-500 bg-yellow-100 hover:bg-yellow-200 hover:text-yellow-600"
                      }
                      variant={"ghost"}
                      onClick={() => setStoreId(row.original.id.toString())}
                    >
                      <Landmark className="size-3.5" />
                    </Button>
                  </Link>
                }
              />
            )}
          </SetAtom>
          <SetAtom atom={shiftAdminStoreId}>
            {(setStoreId) => (
              <TooltipText
                value="Shift Toko"
                render={
                  <Link href={`/admin/shifts`}>
                    <Button
                      size={"icon-sm"}
                      className={
                        "text-emerald-500 bg-emerald-100 hover:bg-emerald-200 hover:text-emerald-600"
                      }
                      variant={"ghost"}
                      onClick={() => setStoreId(row.original.id.toString())}
                    >
                      <ClipboardClock className="size-3.5" />
                    </Button>
                  </Link>
                }
              />
            )}
          </SetAtom>
          <SetAtom atom={migrationAdminStoreId}>
            {(setStoreId) => (
              <TooltipText
                value="Migrasi Toko"
                render={
                  <Link href={`/admin/migrations`}>
                    <Button
                      size={"icon-sm"}
                      className={
                        "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                      }
                      variant={"ghost"}
                      onClick={() => setStoreId(row.original.id.toString())}
                    >
                      <Truck className="size-3.5" />
                    </Button>
                  </Link>
                }
              />
            )}
          </SetAtom>
          <SetAtom atom={inventoryAdminStoreId}>
            {(setStoreId) => (
              <TooltipText
                value="Produk Toko"
                render={
                  <Link href={`/admin/inventories`}>
                    <Button
                      size={"icon-sm"}
                      className={
                        "text-violet-500 bg-violet-100 hover:bg-violet-200 hover:text-violet-600"
                      }
                      variant={"ghost"}
                      onClick={() => setStoreId(row.original.id.toString())}
                    >
                      <Package className="size-3.5" />
                    </Button>
                  </Link>
                }
              />
            )}
          </SetAtom>
        </div>
      );
    },
  },
];
