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
import { detailTransactionDialog } from "./_api/atom";
import { detailtransactionAtom } from "./_api/queries";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CircleQuestionMark,
  CloudAlert,
  CreditCard,
  MessageCircleQuestion,
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
import { columnProducts } from "./products-columns";
import { Delay, Suspense } from "@suspensive/react";
import { Spinner } from "@/components/ui/spinner";
import { printAction, printCheck } from "@/lib/print-action";
import { toast } from "sonner";
import { transactionReciept } from "@/lib/receipt-template";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { columnItems } from "./items-columns";
import { TooltipText } from "@/providers/tooltip-provider";

export const DetailTransaction = () => {
  const [isPrinting, setIsPrinting] = React.useState(false);

  return (
    <Atom atom={detailTransactionDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={false}
            className={
              "lg:min-w-[calc(var(--container-5xl)-32px)] xl:min-w-5xl min-w-[calc(var(--container-3xl)-32px)]"
            }
          >
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
                    const check = await printCheck();
                    if (!check.status) return;
                    const bytes = transactionReciept(
                      data?.resource,
                      paymentMethodLabel,
                    );

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
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center gap-2 border rounded-full w-fit px-2 py-px border-gray-300 text-xs">
                                        <span
                                          className={cn(
                                            "size-2 rounded-full",
                                            data?.resource.status === "done"
                                              ? "bg-green-500"
                                              : data.resource.status ===
                                                  "pending_cancel"
                                                ? "bg-yellow-500"
                                                : "bg-red-500",
                                          )}
                                        />
                                        {data?.resource.status === "done"
                                          ? "Selesai"
                                          : data.resource.status ===
                                              "pending_cancel"
                                            ? "Membatalkan"
                                            : "Dibatalkan"}
                                      </div>
                                      {data?.resource.status !== "done" && (
                                        <TooltipText
                                          sideOffset={10}
                                          value={
                                            <div className="flex items-center gap-2 text-xs">
                                              <MessageCircleQuestion className="size-3.5" />
                                              <p>{data.resource.note}</p>
                                            </div>
                                          }
                                          render={
                                            <div className="size-5 rounded-full transition-all hover:bg-red-100 flex items-center justify-center">
                                              <CircleQuestionMark
                                                className="size-3 text-black/70"
                                                absoluteStrokeWidth
                                              />
                                            </div>
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Accordion
                              defaultValue={["items"]}
                              className={
                                "border rounded-lg border-gray-300 divide-gray-300"
                              }
                            >
                              <AccordionItem className={"px-4"} value={"items"}>
                                <AccordionTrigger className={"font-semibold"}>
                                  List Item Terjual
                                </AccordionTrigger>
                                <AccordionContent>
                                  <DataTable
                                    isLoading={isRefetching}
                                    columns={columnItems}
                                    data={data?.resource.items ?? []}
                                  />
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem
                                className={"px-4"}
                                value={"products"}
                              >
                                <AccordionTrigger className={"font-semibold"}>
                                  List Produk Terjual
                                </AccordionTrigger>
                                <AccordionContent>
                                  <DataTable
                                    isLoading={isRefetching}
                                    columns={columnProducts}
                                    data={data?.resource.products ?? []}
                                  />
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
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
