import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Printer,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  XIcon,
} from "lucide-react";
import { Atom, AtomValue } from "@suspensive/jotai";
import { detailShiftDialog } from "../../_api/atom";
import { detailShiftAtom } from "../../_api/queries";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { cn, formatRupiah } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { columnDetail } from "../columns-detail";
import { toast } from "sonner";
import { printAction } from "@/lib/print-action";
import ReceiptPrinterEncoder from "@/lib/receipt-encoder";

export const ShiftDetailDialog = () => {
  return (
    <Atom atom={detailShiftDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-5xl"}>
            <AtomValue atom={detailShiftAtom}>
              {({ data, refetch, isRefetching }) => {
                const handlePrint = async () => {
                  const rawEncoder = new ReceiptPrinterEncoder({ width: 32 });
                  const bytes = rawEncoder
                    .initialize()
                    .codepage("cp437")
                    .newline(2)
                    .align("center")
                    .font("A")
                    .line(data?.resource.store.name ?? "-")
                    .line("--Penutupan Penjualan--")
                    .font("B")
                    .rule({ style: "double", width: 42 })
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        ["Tanggal", format(new Date(), "dd/MM/yyyy HH:mm")],
                        ["Dicetak Oleh", "-"],
                      ],
                    )
                    .newline(1)
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        ["Kasir Mulai", data?.resource.user_open ?? "-"],
                        ["Kasir Akhir", data?.resource.user_closed ?? "-"],
                        [
                          "Shift Mulai",
                          data?.resource.start
                            ? format(data?.resource.start, "dd/MM/yyyy HH:mm")
                            : "-",
                        ],
                        [
                          "Shift Akhir",
                          data?.resource.end
                            ? format(data?.resource.end, "dd/MM/yyyy HH:mm")
                            : "-",
                        ],
                      ],
                    )
                    .newline()
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "Total Resi",
                          data?.resource.total_invoice.toLocaleString() ?? "-",
                        ],
                      ],
                    )
                    .rule({ style: "single", width: 42 })
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "Kas Awal",
                          data?.resource.initial_cash.toLocaleString() ?? "-",
                        ],
                        [
                          "Kas Akhir",
                          data?.resource.expected_cash.toLocaleString() ?? "-",
                        ],
                        [
                          "Aktual Kas",
                          data?.resource.actual_cash.toLocaleString() ?? "-",
                        ],
                        [
                          "Selisih Kas",
                          data?.resource.difference.toLocaleString() ?? "-",
                        ],
                      ],
                    )
                    .rule({ style: "single", width: 42 })
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "Tunai",
                          data?.resource.total_cash.toLocaleString() ?? "-",
                        ],
                        [
                          "Pembatalan Tunai",
                          data?.resource.total_cash_cancel.toLocaleString() ??
                            "-",
                        ],
                      ],
                    )
                    .newline()
                    .table(
                      [
                        { width: 16, align: "left" }, // Kolom Nama
                        { width: 26, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "QRIS",
                          data?.resource.total_qris.toLocaleString() ?? "-",
                        ],
                        [
                          "Pembatalan QRIS",
                          data?.resource.total_qris_cancel.toLocaleString() ??
                            "-",
                        ],
                      ],
                    )
                    .newline()
                    .table(
                      [
                        { width: 23, align: "left" }, // Kolom Nama
                        { width: 19, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "Transfer EDC",
                          data?.resource.total_transfer.toLocaleString() ?? "-",
                        ],
                        [
                          "Pembatalan Transfer EDC",
                          data?.resource.total_transfer_cancel.toLocaleString() ??
                            "-",
                        ],
                      ],
                    )
                    .rule({ style: "single", width: 42 })
                    .table(
                      [
                        { width: 20, align: "left" }, // Kolom Nama
                        { width: 22, align: "right" }, // Kolom Harga
                      ],
                      [
                        [
                          "Total Pajak",
                          data?.resource.total_tax.toLocaleString() ?? "-",
                        ],
                        [
                          "Total Subtotal",
                          data?.resource.total_subtotal.toLocaleString() ?? "-",
                        ],
                        [
                          "Total Penjualan",
                          data?.resource.total_penjualan.toLocaleString() ??
                            "-",
                        ],
                        [
                          "Ekspektasi Penjualan",
                          data?.resource.expected_amount.toLocaleString() ??
                            "-",
                        ],
                        [
                          "Aktual Penjualan",
                          data?.resource.actual_amount.toLocaleString() ?? "-",
                        ],
                      ],
                    )
                    .rule({ style: "single", width: 42 })
                    .newline(4)
                    .cut()
                    .encode();

                  const res = await printAction(bytes);
                  if (!res.status) return;
                  toast.success(res.message);
                };
                return (
                  <div className="flex flex-col max-h-[90svh] w-full justify-between gap-4">
                    <DialogHeader className="flex-row items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <DialogTitle>Detail Shift</DialogTitle>
                        <DialogDescription>
                          Seluruh detail shift dari item sampai rangkuman
                        </DialogDescription>
                      </div>
                      <Button
                        size={"sm"}
                        variant={"secondary"}
                        disabled={isRefetching}
                        onClick={() => refetch()}
                      >
                        <RefreshCw
                          className={cn(isRefetching && "animate-spin")}
                        />
                        Muat Ulang
                      </Button>
                    </DialogHeader>
                    <div className="flex flex-col h-full gap-6 custom-scrollbar overflow-y-auto overflow-x-hidden pr-2">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold">- Rangkuman Shift</p>
                        <div className="flex flex-col gap-4 py-4 rounded-lg border-gray-300 border">
                          <div className="grid grid-cols-4 gap-4 px-4">
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Waktu Mulai:
                              </p>
                              <p className="text-sm text-gray-600">
                                {data?.resource.start
                                  ? format(
                                      data?.resource.start,
                                      "iii, dd MMM yyyy HH:mm",
                                      { locale: id, in: tz("Asia/Jakarta") },
                                    )
                                  : "-"}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Waktu Selesai:
                              </p>
                              <p className="text-sm text-gray-600">
                                {data?.resource.end
                                  ? format(
                                      data?.resource.end,
                                      "iii, dd MMM yyyy HH:mm",
                                      { locale: id, in: tz("Asia/Jakarta") },
                                    )
                                  : "-"}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Kasir Mulai:
                              </p>
                              <p className="text-sm text-gray-600">
                                {data?.resource.user_open ?? "-"}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Kasir Selesai:
                              </p>
                              <p className="text-sm text-gray-600">
                                {data?.resource.user_closed ?? "-"}
                              </p>
                            </div>
                          </div>
                          <Separator className={"bg-gray-300"} />
                          <div className="grid grid-cols-4 gap-4 px-4">
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">Kas Awal:</p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(
                                  data?.resource.initial_cash ?? "0",
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Kas Akhir:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(
                                  data?.resource.actual_cash ?? "0",
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">Selisih:</p>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                {formatRupiah(data?.resource.difference ?? "0")}
                                {(data?.resource.difference ?? 0) < 0 && (
                                  <TrendingDown className="size-4 text-red-500" />
                                )}
                                {(data?.resource.difference ?? 0) > 0 && (
                                  <TrendingUp className="size-4 text-green-500" />
                                )}
                                {(data?.resource.difference ?? 0) === 0 && (
                                  <div className="size-2.5 rounded-full bg-gray-400" />
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Ekspektasi Kas:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(
                                  data?.resource.expected_cash ?? "0",
                                )}
                              </p>
                            </div>
                          </div>
                          <Separator className={"bg-gray-300"} />
                          <div className="grid grid-cols-4 gap-4 px-4">
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Total Invoice:
                              </p>
                              <p className="text-sm text-gray-600">
                                {(
                                  data?.resource.total_invoice ?? 0
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Total Subtotal:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(
                                  data?.resource.total_subtotal ?? "0",
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Total Pajak:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(data?.resource.total_tax ?? "0")}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">
                                Total Penjualan:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatRupiah(
                                  data?.resource.total_penjualan ?? "0",
                                )}
                              </p>
                            </div>
                          </div>
                          <Separator className={"bg-gray-300"} />
                          <div className="grid px-4">
                            <div className="flex flex-col">
                              <p className="text-xs font-semibold">Catatan:</p>
                              <p className="text-sm text-gray-600">
                                {data?.resource.note ?? "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold">- List Product Terjual</p>
                        <DataTable
                          isLoading={isRefetching}
                          columns={columnDetail}
                          data={data?.resource.items ?? []}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose
                        render={
                          <Button variant={"outline"}>
                            <XIcon className="size-3.5" />
                            Tutup
                          </Button>
                        }
                      />
                      <Button disabled={isRefetching} onClick={handlePrint}>
                        <Printer className="size-3.5" />
                        Cetak
                      </Button>
                    </DialogFooter>
                  </div>
                );
              }}
            </AtomValue>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};
