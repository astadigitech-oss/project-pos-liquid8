"use client";

import { formatRupiah } from "@/lib/utils";
import React from "react";
import { TransactionChart } from "./_section/transaction-chart";
import { StockChart } from "./_section/stock-chart";

export const DashboardAdminClient = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col gap-1">
          <p className="text-sm font-medium">Penjualan Perhari</p>
          <p className="text-xl font-light">{formatRupiah(3000000)}</p>
        </div>
        <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col gap-1">
          <p className="text-sm font-medium">Stok Produk Semua Toko</p>
          <p className="text-xl font-light">{formatRupiah(3000000)}</p>
        </div>
        <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col gap-1">
          <p className="text-sm font-medium">Total Harga Produk Semua Toko</p>
          <p className="text-xl font-light">{formatRupiah(3000000)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TransactionChart />
        <StockChart />
      </div>
    </div>
  );
};
