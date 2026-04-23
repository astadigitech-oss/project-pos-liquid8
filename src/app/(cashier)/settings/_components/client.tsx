"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTime } from "@/hooks/use-time";
import React from "react";
// import ReceiptPrinterEncoder from "@point-of-sale/receipt-printer-encoder";
import { ProfileSetting } from "./_section/profile";
import { PasswordSetting } from "./_section/password";

export const SettingsClient = () => {
  const { formattedDate, formattedTime } = useTime();
  // const handlePrint = async () => {
  //   // 1. Inisialisasi Encoder (tentukan lebar kertas, misal 58mm)
  //   const encoder = new ReceiptPrinterEncoder({
  //     width: 32, // Jumlah karakter per baris (biasanya 32 untuk thermal 58mm)
  //   });

  //   // 2. Susun desain struk
  //   const result = encoder
  //     .initialize()
  //     .codepage("cp437") // Standar untuk printer thermal
  //     .align("center")
  //     .bold(true)
  //     .line("KOPI JODOH")
  //     .bold(false)
  //     .line("Jl. Kenangan No. 5, Jakarta")
  //     .line("--------------------------------")
  //     .align("left")
  //     .table(
  //       [
  //         { width: 20, align: "left" },
  //         { width: 12, align: "right" },
  //       ],
  //       [
  //         ["Kopi Susu x1", "15.000"],
  //         ["Roti Bakar x2", "20.000"],
  //       ],
  //     )
  //     .line("--------------------------------")
  //     .align("right")
  //     .bold(true)
  //     .line("TOTAL: 35.000")
  //     .bold(false)
  //     .align("center")
  //     .newline()
  //     .line("Terima Kasih!")
  //     .newline()
  //     .newline()
  //     .cut()
  //     .encode(); // Menghasilkan Uint8Array

  //   // 3. Kirim ke Rust Bridge (Port 3001)
  //   try {
  //     const response = await fetch("http://localhost:3001/print-raw", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/octet-stream",
  //       },
  //       body: Buffer.from(result),
  //     });

  //     if (response.ok) {
  //       console.log("✅ Cetak berhasil");
  //     } else {
  //       alert("Gagal: Printer tidak siap!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Gagal: Pastikan aplikasi POS Bridge sudah aktif.");
  //   }
  // };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Pengaturan</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 flex flex-col w-full rounded-xl gap-4">
        <ProfileSetting />
        <Separator />
        <PasswordSetting />
      </div>
    </div>
  );
};
