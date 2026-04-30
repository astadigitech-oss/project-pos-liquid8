import { Atom, AtomValue, SetAtom } from "@suspensive/jotai";
import { Delay, Suspense } from "@suspensive/react";
import React from "react";
import { currentCartAtom, detailSelectedMemberAtom } from "../../_api/queries";
import { Spinner } from "@/components/ui/spinner";
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
  AlertTriangle,
  Banknote,
  ClipboardClock,
  Clock,
  CreditCard,
  HandCoins,
  PowerOffIcon,
  QrCode,
  RefreshCw,
  ShoppingCart,
  Trash,
  User2Icon,
} from "lucide-react";
import { formatPhoneNumber, formatRupiah, paymentMethods } from "@/lib/utils";
import {
  checkoutTransactionDialog,
  customerDialog,
  customerSelectedId,
  draftAddDialog,
  draftListDialog,
  emptyTransactionDialog,
  isCustomer,
  paymentCustomer,
  paymentMethodSelected,
} from "../../_api/atoms";
import { DraftTransaction } from "../_dialog/draft-list";
import { CustomerDialog } from "../_dialog/customer";
import { AddToDraft } from "../_dialog/draf";
import { EmptyTransaction } from "../_dialog/empty";
import { CheckoutTransaction } from "../_dialog/checkout";

export const SummaryCart = () => {
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
              <Delay ms={500} fallback={<Loader />}>
                <div className="size-full flex flex-col justify-between">
                  <CustomerDialog />
                  <DraftTransaction />
                  <EmptyTransaction />
                  <AddToDraft />
                  <CheckoutTransaction />
                  <div>
                    <div className="flex items-center gap-2 px-3 h-20 justify-between border-b border-gray-300">
                      <SetAtom atom={draftListDialog}>
                        {(setOpen) => (
                          <TooltipText
                            value="Draf Transaksi"
                            sideOffset={10}
                            render={
                              <Button
                                onClick={() => setOpen(true)}
                                className={
                                  "rounded-full border-gray-300 size-10 text-red-500 hover:text-red-500"
                                }
                                variant={"outline"}
                                size={"icon"}
                              >
                                <ClipboardClock />
                              </Button>
                            }
                          />
                        )}
                      </SetAtom>
                      <AtomValue atom={detailSelectedMemberAtom}>
                        {({ data }) => (
                          <AtomValue atom={customerSelectedId}>
                            {(customerId) => (
                              <div className="flex flex-col items-center justify-center">
                                <p className="font-light leading-tight">
                                  {customerId && data?.resource.name
                                    ? data?.resource.name
                                    : "Pilih Customer"}
                                </p>
                                <p className="text-xs text-gray-500 text-center line-clamp-1">
                                  {customerId && data?.resource.phone
                                    ? formatPhoneNumber(data?.resource.phone)
                                    : "Pilihlah sebelum menyelesaikan/menunda transaksi"}
                                </p>
                              </div>
                            )}
                          </AtomValue>
                        )}
                      </AtomValue>
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
                                      "rounded-full border-gray-300 size-10 text-red-500 hover:text-red-500"
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
                    <div className="px-3 py-5 flex flex-col text-sm gap-6 border-b">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <p>Total Items:</p>
                          <p className="tabular-nums">
                            {(
                              data.resource.items?.length ?? 0
                            ).toLocaleString()}
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
                        <div className="flex justify-between items-center">
                          <p>Pembulatan:</p>
                          <p className="tabular-nums">
                            {formatRupiah(data.resource.pembulatan)}
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
                      <Atom atom={paymentMethodSelected}>
                        {([paymentMethod, setPaymentMethod]) => (
                          <Atom atom={paymentCustomer}>
                            {([payment, setPayment]) => (
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
                                      {paymentMethod === "transfer" && (
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
                                            onClick={() => {
                                              if (item.value === "cash") {
                                                setPayment(0);
                                              }
                                              if (
                                                item.value === "transfer" ||
                                                item.value === "qris"
                                              ) {
                                                setPayment(
                                                  data.resource.total_amount,
                                                );
                                              }
                                            }}
                                          >
                                            {item.value === "cash" && (
                                              <Banknote className="size-3.5" />
                                            )}
                                            {item.value === "transfer" && (
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
                                  className="h-16 sm:text-3xl disabled:opacity-100 disabled:bg-white"
                                  dir="rtl"
                                  disabled={paymentMethod !== "cash"}
                                  value={payment}
                                  onValueChange={(e) =>
                                    setPayment(Number.parseFloat(e ?? "0"))
                                  }
                                />
                                <div className="flex justify-between items-center text-base font-semibold">
                                  <p>Kembalian:</p>
                                  <p className="tabular-nums">
                                    {formatRupiah(
                                      payment - data.resource.total_amount,
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}
                          </Atom>
                        )}
                      </Atom>
                    </div>
                  </div>
                  <AtomValue atom={paymentCustomer}>
                    {(payment) => (
                      <AtomValue atom={paymentMethodSelected}>
                        {(paymentMethod) => (
                          <AtomValue atom={customerSelectedId}>
                            {(memberId) => (
                              <AtomValue atom={currentCartAtom}>
                                {({ data }) => (
                                  <div className="flex flex-col w-full">
                                    {(!data?.resource.items ||
                                      data?.resource.items?.length === 0) && (
                                      <div className="flex border-t items-center gap-2 h-10 px-4 bg-red-100">
                                        <AlertTriangle className="size-4" />
                                        <p className="text-xs font-semibold">
                                          Produk belum ditambahkan
                                        </p>
                                      </div>
                                    )}
                                    {!memberId && (
                                      <div className="flex border-t items-center gap-2 h-10 px-4 bg-yellow-100">
                                        <AlertTriangle className="size-4" />
                                        <p className="text-xs font-semibold">
                                          Customer belum dipilih
                                        </p>
                                      </div>
                                    )}
                                    {(data?.resource.items?.length ?? 0) > 0 &&
                                      !paymentMethod && (
                                        <div className="flex border-t items-center gap-2 h-10 px-4 bg-yellow-100">
                                          <AlertTriangle className="size-4" />
                                          <p className="text-xs font-semibold">
                                            Metode pembayaran belum dipilih
                                          </p>
                                        </div>
                                      )}
                                    {paymentMethod === "cash" &&
                                      (data?.resource.total_amount ?? 0) >
                                        payment && (
                                        <div className="flex border-t items-center gap-2 h-10 px-4 bg-yellow-100">
                                          <AlertTriangle className="size-4" />
                                          <p className="text-xs font-semibold">
                                            Pembayaran Customer Kurang
                                          </p>
                                        </div>
                                      )}
                                    <div className="border-t p-3 flex items-center gap-3">
                                      <SetAtom atom={emptyTransactionDialog}>
                                        {(setOpen) => (
                                          <TooltipText
                                            value={"Batalkan transaksi"}
                                            render={
                                              <Button
                                                variant={"destructive"}
                                                size={"icon"}
                                                className={"size-10"}
                                                onClick={() => setOpen(true)}
                                              >
                                                <Trash />
                                              </Button>
                                            }
                                          />
                                        )}
                                      </SetAtom>
                                      <div className="w-full grid grid-cols-3 gap-3">
                                        <SetAtom atom={draftAddDialog}>
                                          {(setOpen) => (
                                            <Button
                                              variant={"outline"}
                                              className={
                                                "col-span-1 flex-auto h-10 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:hover:bg-white"
                                              }
                                              onClick={() => setOpen(true)}
                                              disabled={
                                                !memberId ||
                                                !data?.resource.items ||
                                                data?.resource.items?.length ===
                                                  0
                                              }
                                            >
                                              <Clock />
                                              Draf
                                            </Button>
                                          )}
                                        </SetAtom>
                                        <SetAtom
                                          atom={checkoutTransactionDialog}
                                        >
                                          {(setOpen) => (
                                            <Button
                                              className={
                                                "col-span-2 flex-auto h-10 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:hover:bg-red-500"
                                              }
                                              variant={"diskonter"}
                                              disabled={
                                                !memberId ||
                                                !data?.resource.items ||
                                                data?.resource.items?.length ===
                                                  0 ||
                                                (paymentMethod === "cash" &&
                                                  (data?.resource
                                                    .total_amount ?? 0) >
                                                    payment) ||
                                                ((data?.resource.items
                                                  ?.length ?? 0) > 0 &&
                                                  !paymentMethod)
                                              }
                                              onClick={() => setOpen(true)}
                                            >
                                              <ShoppingCart />
                                              Checkout
                                            </Button>
                                          )}
                                        </SetAtom>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </AtomValue>
                            )}
                          </AtomValue>
                        )}
                      </AtomValue>
                    )}
                  </AtomValue>
                </div>
              </Delay>
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
      <div className="size-full border border-red-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-red-500)]/5">
        <div className="z-10 flex flex-col items-center justify-center gap-2">
          <div className="size-10 rounded-full bg-red-200 flex items-center justify-center">
            <Spinner className="size-5 text-red-500" />
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
      <div className="size-full border border-red-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-red-500)]/5">
        <div className="z-10 flex flex-col items-center justify-center gap-2">
          <div className="size-10 rounded-full bg-red-200 flex items-center justify-center">
            <PowerOffIcon className="size-5 text-red-500" />
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
