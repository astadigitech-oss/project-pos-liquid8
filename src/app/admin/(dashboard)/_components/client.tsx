"use client";

import { cn, formatRupiah } from "@/lib/utils";
import React from "react";
import { TransactionChart } from "./_section/transaction-chart";
import { StockChart } from "./_section/stock-chart";
import { AtomValue } from "@suspensive/jotai";
import { dashboardIndexAtom } from "../_api/queries";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { ShoppingBag, StoreIcon } from "lucide-react";

export const DashboardAdminClient = () => {
  return (
    <AtomValue atom={dashboardIndexAtom}>
      {({ data }) => (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-1">
              <p className="text-sm">Penjualan Perhari</p>
              <p className="text-2xl text-gray-700 font-medium">
                {formatRupiah(data?.resource.total_sales ?? 0)}
              </p>
            </div>
            <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-1">
              <p className="text-sm">Stok Produk Semua Toko</p>
              <p className="text-2xl text-gray-700 font-medium">
                {formatRupiah(data?.resource.total_price ?? 0)}
              </p>
            </div>
            <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-1">
              <p className="text-sm">Total Harga Produk Semua Toko</p>
              <p className="text-2xl text-gray-700 font-medium">
                {(data?.resource.total_stock ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 gap-4 flex flex-col">
              <TransactionChart />
              <StockChart />
            </div>
            <div className="col-span-2 bg-white border shadow rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center h-8">
                <p className="text-sm font-semibold">Riwayat Transaksi</p>
              </div>
              <div className="flex flex-col gap-2">
                {data?.resource.recent_transactions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border p-2.5 rounded-lg justify-between text-sm h-16"
                  >
                    <div className="flex items-center gap-2.5 h-full">
                      <div className="h-full aspect-square flex items-center justify-center flex-none bg-red-200 rounded-md">
                        <ShoppingBag className="size-5 stroke-[1.5]" />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium">{item.invoice}</p>
                          <div
                            className={cn(
                              "size-1.5 rounded-full",
                              item.status === "done"
                                ? "bg-green-500"
                                : "bg-red-500",
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <StoreIcon className="size-3" />
                          <p className="text-xs capitalize">
                            {item.store_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
                      <p className="text-xs">
                        {format(item.created_at, "dd/MM/yyyy - HH:mm", {
                          locale: id,
                          in: tz("Asia/Jakarta"),
                        })}
                      </p>
                      <p className="font-medium">
                        {formatRupiah(item.total_amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AtomValue>
  );
};
