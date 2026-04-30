import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Atom, AtomValue } from "@suspensive/jotai";
import React from "react";
import { detailTransactionDialog } from "../../_api/atom";
import { detailtransactionAtom } from "../../_api/queries";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CloudAlert,
  CreditCard,
  Printer,
  QrCode,
  RefreshCw,
  XIcon,
} from "lucide-react";
import { cn, formatRupiah, paymentMethods } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { id } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { columnDetail } from "../columns-detail";
import { Delay, Suspense } from "@suspensive/react";
import { Spinner } from "@/components/ui/spinner";
import { printAction } from "@/lib/print-action";
import ReceiptPrinterEncoder from "@/lib/receipt-encoder";
import { toast } from "sonner";

export const DetailTransaction = () => {
  const [isPrinting, setIsPrinting] = React.useState(false);

  return (
    <Atom atom={detailTransactionDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-5xl"}>
            <Suspense fallback={<Loader />} clientOnly>
              <AtomValue atom={detailtransactionAtom}>
                {({
                  data,
                  isRefetching,
                  refetch,
                  error,
                  isError,
                  isSuccess,
                }) => {
                  const paymentMethod = data?.resource.payment_method;
                  const paymentMethodLabel = paymentMethods.find(
                    (i) => i.value === paymentMethod,
                  )?.label;

                  const handlePrint = async () => {
                    setIsPrinting(true);
                    const rawEncoder = new ReceiptPrinterEncoder({ width: 32 });
                    const bytes = rawEncoder
                      .initialize()
                      .codepage("cp437")
                      .newline(2)
                      .align("center")
                      .font("A")
                      .line(data?.resource.store.name ?? "-")
                      .font("B")
                      .line(data?.resource.store.address ?? "-")
                      .line(data?.resource.store.phone ?? "-")
                      .font("B")
                      .rule({ style: "double", width: 42 })
                      .font("A")
                      .line(`--${data?.resource.invoice ?? "-"}--`)
                      .font("B")
                      .rule({ style: "double", width: 42 })
                      .table(
                        [
                          { width: 10, align: "left", marginRight: 2 }, // Kolom Nama
                          { width: 30, align: "right" }, // Kolom Harga
                        ],
                        [
                          [
                            "Tanggal",
                            data?.resource.created_at
                              ? format(
                                  data?.resource.created_at,
                                  "dd/MM/yyyy HH:mm",
                                )
                              : "-",
                          ],
                          ["Kasir", data?.resource.kasir ?? "-"],
                          ["Pelanggan", data?.resource.customer_name ?? "-"],
                        ],
                      )
                      .rule({ style: "single", width: 42 })
                      .table(
                        [
                          { width: 20, align: "left", marginRight: 2 }, // Kolom Nama
                          { width: 20, align: "right" }, // Kolom Harga
                        ],
                        [["Pembayaran", paymentMethodLabel ?? "-"]],
                      )
                      .rule({ style: "single", width: 42 })
                      .table(
                        [
                          { width: 2, align: "left" }, // Kolom Nama
                          { width: 28, align: "left" }, // Kolom Nama
                          { width: 12, align: "right" }, // Kolom Harga
                        ],
                        data?.resource.items.map((i) => [
                          "-",
                          i.product_name,
                          (i.price ?? 0).toLocaleString("id-ID"),
                        ]) ?? [],
                      )
                      .rule({ style: "single", width: 42 })
                      .table(
                        [
                          { width: 27, align: "right", marginRight: 2 },
                          { width: 13, align: "right" },
                        ],
                        [
                          [
                            "Subtotal:",
                            (data?.resource.subtotal ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],
                          [
                            `PPN (${data?.resource.ppn.tax}):`,
                            (data?.resource.ppn.amount ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],

                          [
                            `Pembulatan:`,
                            (data?.resource.pembulatan ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],

                          [
                            "Total:",
                            (data?.resource.total_amount ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],
                          [
                            "Bayar:",
                            (data?.resource.paid_amount ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],
                          [
                            "Kembalian:",
                            (data?.resource.change_amount ?? 0).toLocaleString(
                              "id-ID",
                            ),
                          ],
                        ],
                      )
                      .newline()
                      .font("A")
                      .align("center")
                      .line("- Terima Kasih -")
                      .newline(4)
                      .cut()
                      .encode();

                    const res = await printAction(bytes);
                    toast.success(res.message);
                    setIsPrinting(false);
                  };

                  if (isError && isRefetching) return <Loader />;

                  if (isError) {
                    return (
                      <div className="flex flex-col h-[90svh] w-full justify-between gap-4">
                        <DialogHeader>
                          <DialogTitle>Detail Transaksi</DialogTitle>
                          <DialogDescription>
                            Seluruh detail transaksi dari item sampai rangkuman
                          </DialogDescription>
                        </DialogHeader>
                        <div className="size-full flex items-center justify-center flex-col border rounded-lg gap-3 text-sm font-semibold">
                          <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full">
                            <CloudAlert className="size-6 stroke-[1.5]" />
                          </div>
                          {error.message ?? "Oops, Something went wrong!"}
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
                        </DialogFooter>
                      </div>
                    );
                  }

                  if (isSuccess) {
                    return (
                      <Delay ms={500} fallback={<Loader />}>
                        <div className="flex flex-col max-h-[90svh] w-full justify-between gap-4">
                          <DialogHeader className="flex-row items-center justify-between">
                            <div className="flex flex-col gap-0.5">
                              <DialogTitle>Detail Transaksi</DialogTitle>
                              <DialogDescription>
                                Seluruh detail transaksi dari item sampai
                                rangkuman
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
                              <p className="font-semibold">
                                - Rangkuman Transaksi
                              </p>
                              <div className="flex flex-col gap-4 py-4 rounded-lg border-gray-300 border">
                                <div className="grid grid-cols-3 gap-4 px-4">
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Invoice:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {data?.resource.invoice ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Nama Customer:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {data?.resource.customer_name ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Kasir:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {data?.resource.kasir ?? "-"}
                                    </p>
                                  </div>
                                </div>
                                <Separator className={"bg-gray-300"} />
                                <div className="grid grid-cols-4 gap-4 px-4">
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Total Item:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {(
                                        data?.resource.total_item ?? 0
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Subtotal:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.subtotal ?? 0,
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      PPN ({data?.resource.ppn.tax ?? 0}%):
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.ppn.amount ?? 0,
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Pembulatan:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.pembulatan ?? 0,
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <Separator className={"bg-gray-300"} />
                                <div className="grid grid-cols-3 gap-4 px-4">
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Total Harga:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.total_amount ?? 0,
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Total Dibayar:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.paid_amount ?? 0,
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Kembalian:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatRupiah(
                                        data?.resource.change_amount ?? 0,
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <Separator className={"bg-gray-300"} />
                                <div className="grid grid-cols-3 gap-4 px-4">
                                  <div className="flex flex-col">
                                    <p className="text-xs font-semibold">
                                      Tanggal:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {data?.resource.created_at
                                        ? format(
                                            data?.resource.created_at,
                                            "iii, dd MMM yyyy HH:mm",
                                            {
                                              locale: id,
                                              in: tz("Asia/Jakarta"),
                                            },
                                          )
                                        : "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold">
                                      Metode Pembayaran:
                                    </p>
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                      <div className="size-6 rounded bg-gray-200 flex items-center justify-center">
                                        {paymentMethod === "qris" && (
                                          <QrCode className="size-4" />
                                        )}
                                        {paymentMethod === "transfer" && (
                                          <CreditCard className="size-3.5" />
                                        )}
                                        {paymentMethod === "cash" && (
                                          <Banknote className="size-3.5" />
                                        )}
                                      </div>
                                      {paymentMethodLabel}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    <p className="text-xs font-semibold">
                                      Status:
                                    </p>
                                    <div className="flex items-center gap-2 border rounded-full w-fit px-2 py-px border-gray-300 text-xs">
                                      <span
                                        className={cn(
                                          "size-2 rounded-full",
                                          data?.resource.status === "done"
                                            ? "bg-green-500"
                                            : "bg-red-500",
                                        )}
                                      />
                                      {data?.resource.status === "done"
                                        ? "Selesai"
                                        : "Dibatalkan"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="font-semibold">
                                - List Product Terjual
                              </p>
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
                            <Button
                              disabled={isRefetching || isPrinting}
                              onClick={handlePrint}
                              variant={"diskonter"}
                            >
                              {isPrinting ? (
                                <Spinner className="size-3.5" />
                              ) : (
                                <Printer className="size-3.5" />
                              )}
                              {isPrinting ? "Mencetak..." : "Cetak"}
                            </Button>
                          </DialogFooter>
                        </div>
                      </Delay>
                    );
                  }

                  return <Loader />;
                }}
              </AtomValue>
            </Suspense>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col h-[90svh] w-full justify-between gap-4">
      <DialogHeader>
        <DialogTitle>Detail Transaksi</DialogTitle>
        <DialogDescription>
          Seluruh detail transaksi dari item sampai rangkuman
        </DialogDescription>
      </DialogHeader>
      <div className="size-full flex items-center justify-center flex-col border rounded-lg gap-3 text-sm font-semibold">
        <div className="size-12 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
          <Spinner className="size-6 stroke-[1.5]" />
        </div>
        Memuat data transaksi...
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
      </DialogFooter>
    </div>
  );
};
