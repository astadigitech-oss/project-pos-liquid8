import { AtomValue, SetAtom } from "@suspensive/jotai";
import { Delay, Suspense } from "@suspensive/react";
import React, { useState } from "react";
import { currentCartAtom } from "../../_api/queries";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { TooltipText } from "@/providers/tooltip-provider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RupiahInput } from "@/components/ui/rupiah-input";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  ClipboardClock,
  Clock,
  CreditCard,
  HandCoins,
  PowerOffIcon,
  Printer,
  QrCode,
  RefreshCw,
  Send,
  ShoppingCart,
  Trash,
  User2Icon,
  XIcon,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { customerDialog, draftDialog, isCustomer } from "../../_api/atoms";
import { DraftTransaction } from "../_dialog/draft";
import { CustomerDialog } from "../_dialog/customer";

const paymentMethods = [
  { value: "cash", label: "Tunai" },
  { value: "card", label: "Kartu" },
  { value: "qris", label: "QRIS" },
];

export const SummaryCart = () => {
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "qris" | null
  >(null);
  return (
    <Suspense fallback={<Loader />}>
      <AtomValue atom={currentCartAtom}>
        {({ data, refetch, isError, error, isSuccess, isRefetching }) => {
          if (isError && isRefetching) return <Loader />;

          if (isError) {
            return (
              <Delay ms={500} fallback={<Loader />}>
                <ErrorHandling error={error} refetch={refetch} />
              </Delay>
            );
          }
          if (isSuccess) {
            return (
              <div className="size-full flex flex-col justify-between">
                <CustomerDialog />
                <DraftTransaction />
                <div className="flex items-center gap-2 p-3 justify-between border-b border-gray-300">
                  <SetAtom atom={draftDialog}>
                    {(setOpen) => (
                      <TooltipText
                        value="Draf Transaksi"
                        sideOffset={10}
                        render={
                          <Button
                            onClick={() => setOpen(true)}
                            className={"rounded-full border-gray-300 size-10"}
                            variant={"outline"}
                            size={"icon"}
                          >
                            <ClipboardClock />
                          </Button>
                        }
                      />
                    )}
                  </SetAtom>
                  <div className="flex flex-col items-center justify-center">
                    {/*<p className="font-light leading-tight">
                      Customer&apos;s Name
                    </p>
                    <p className="text-xs text-gray-500">0888-8888-8888</p>*/}
                    <p className="font-light leading-tight">Pilih Customer</p>
                    <p className="text-xs text-gray-500 text-center">
                      Pilihlah sebelum menyelesaikan/menunda transaksi
                    </p>
                  </div>
                  <SetAtom atom={customerDialog}>
                    {(setIsOpen) => (
                      <SetAtom atom={isCustomer}>
                        {(setIsAdd) => (
                          <TooltipText
                            value={"Pilih Customer"}
                            sideOffset={10}
                            render={
                              <Button
                                className={
                                  "rounded-full border-gray-300 size-10"
                                }
                                variant={"outline"}
                                size={"icon"}
                                type="button"
                                onClick={() => {
                                  setIsOpen(true);
                                  setIsAdd("");
                                }}
                              >
                                <User2Icon />
                              </Button>
                            }
                          />
                        )}
                      </SetAtom>
                    )}
                  </SetAtom>
                </div>
                <div className="p-3 flex flex-col text-sm gap-6 border-y">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <p>Total Items:</p>
                      <p className="tabular-nums">
                        {data.resource.items.length.toLocaleString()}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <p>Subtotal:</p>
                      <p className="tabular-nums">
                        {formatRupiah(data.resource.subtotal)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>PPN ({data.resource.ppn.tax}%):</p>
                      <p className="tabular-nums">
                        {formatRupiah(data.resource.ppn.amount)}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-base font-medium">
                      <p>Total:</p>
                      <p className="tabular-nums">
                        {formatRupiah(data.resource.total_amount)}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-4">
                    <Field>
                      <FieldLabel className="text-sm">
                        Metode Pembayaran
                      </FieldLabel>
                      <Select
                        items={paymentMethods}
                        value={paymentMethod}
                        onValueChange={(e) => setPaymentMethod(e)}
                      >
                        <SelectTrigger className={"relative"}>
                          {paymentMethod === null && (
                            <HandCoins className="size-3.5 absolute left-3 text-gray-400" />
                          )}
                          {paymentMethod === "cash" && (
                            <Banknote className="size-3.5 absolute left-3" />
                          )}
                          {paymentMethod === "card" && (
                            <CreditCard className="size-3.5 absolute left-3" />
                          )}
                          {paymentMethod === "qris" && (
                            <QrCode className="size-3.5 absolute left-3" />
                          )}
                          <SelectValue
                            className={"text-xs pl-6"}
                            placeholder="Pilih metode pembayaran"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {paymentMethods.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className={"text-xs h-7"}
                              >
                                {item.value === "cash" && (
                                  <Banknote className="size-3.5" />
                                )}
                                {item.value === "card" && (
                                  <CreditCard className="size-3.5" />
                                )}
                                {item.value === "qris" && (
                                  <QrCode className="size-3.5" />
                                )}
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                    <RupiahInput
                      className="h-16 sm:text-3xl"
                      dir="rtl"
                      defaultValue={3000000}
                    />
                    <div className="flex justify-between items-center">
                      <p>Kembalian:</p>
                      <p className="tabular-nums">{formatRupiah(880000)}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t flex items-center gap-3">
                  <Dialog>
                    <TooltipText
                      value={"Batalkan transaksi"}
                      render={
                        <DialogTrigger
                          render={
                            <Button
                              variant={"destructive"}
                              size={"icon"}
                              className={"size-10"}
                            >
                              <Trash />
                            </Button>
                          }
                        />
                      }
                    />
                    <DialogContent
                      showCloseButton={false}
                      className={"min-w-md"}
                    >
                      <DialogHeader>
                        <DialogTitle>Batalkan Transaksi</DialogTitle>
                        <DialogDescription>
                          Apakah anda yakin ingin membatalkan transaksi ini?
                          tindakan bersifat permanen.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          render={
                            <Button variant={"outline"}>
                              <XIcon className="size-3.5" />
                              Tutup
                            </Button>
                          }
                        />
                        <Button variant={"destructive"}>
                          <Trash className="size-3.5" />
                          Batalkan Peesanan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div className="w-full grid grid-cols-3 gap-3">
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant={"outline"}
                            className={"col-span-1 flex-auto h-10"}
                          >
                            <Clock />
                            Draf
                          </Button>
                        }
                      />
                      <DialogContent
                        showCloseButton={false}
                        className={"min-w-md"}
                      >
                        <DialogHeader>
                          <DialogTitle>Masukan Transaksi ke Draf</DialogTitle>
                          <DialogDescription>
                            Apakah anda yakin ingin menyimpan transaksi ini ke
                            draf?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose
                            render={
                              <Button variant={"outline"}>
                                <XIcon className="size-3.5" />
                                Tutup
                              </Button>
                            }
                          />
                          <Button>
                            <Send className="size-3.5" />
                            Masukan ke Draf
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button className={"col-span-2 flex-auto h-10"}>
                            <ShoppingCart />
                            Checkout
                          </Button>
                        }
                      />
                      <DialogContent
                        showCloseButton={false}
                        className={"min-w-md"}
                      >
                        <DialogHeader>
                          <DialogTitle>Apakah Pembayaran Berhasil?</DialogTitle>
                          <DialogDescription>
                            Sebelum mencetak struk pastikan pembayaran customer
                            berhasil terlebih dahulu.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="border rounded-md overflow-hidden">
                          <div className="px-3 h-10 flex items-center bg-gray-100 font-medium">
                            <p>Rangkuman Transaksi</p>
                          </div>
                          <div className="flex flex-col text-sm">
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Total barang:</p>
                              <p>50</p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Total harga:</p>
                              <p>{formatRupiah(2200000)}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Metode Pembayaran:</p>
                              <div className="flex items-center gap-1">
                                <Banknote className="size-3.5" />
                                <p>Tunai</p>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Nominal Pembayaran:</p>
                              <p>{formatRupiah(3000000)}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between px-3 h-10">
                              <p>Kembalian:</p>
                              <p>{formatRupiah(800000)}</p>
                            </div>
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
                          <Button>
                            <Printer className="size-3.5" />
                            Selesaikan dan Cetak Struk
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            );
          }
          return <Loader />;
        }}
      </AtomValue>
    </Suspense>
  );
};

const Loader = () => {
  return (
    <div className="size-full p-4">
      <div className="size-full border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5">
        <div className="z-10 flex flex-col items-center justify-center gap-2">
          <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Spinner className="size-5" />
          </div>
          <p className="text-sm font-medium">Memuat data...</p>
        </div>
      </div>
    </div>
  );
};

const ErrorHandling = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => {
  return (
    <div className="size-full p-4">
      <div className="size-full border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5">
        <div className="z-10 flex flex-col items-center justify-center gap-2">
          <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
            <PowerOffIcon className="size-5" />
          </div>
          <p className="text-sm font-medium">{error.message}</p>
          <Button onClick={() => refetch()} className={"text-xs"}>
            <RefreshCw className="size-3.5" />
            Muat ulang
          </Button>
        </div>
      </div>
    </div>
  );
};
