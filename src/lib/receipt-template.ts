import { format } from "date-fns";
import ReceiptPrinterEncoder from "./receipt-encoder";
import { ShiftEndResponse } from "@/app/(cashier)/(home)/_api/types";
import { UserInfo } from "@/app/(cashier)/settings/_api/types";
type TransactionData = {
  change_amount: number;
  created_at: string;
  customer_name: string;
  id: number;
  invoice: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  kasir: string;
  paid_amount: number;
  pembulatan: number;
  payment_method: string;
  ppn: {
    amount: number;
    tax: number;
  };
  store: {
    address: string;
    name: string;
    phone: string;
  };
  subtotal: number;
  total_amount: number;
  total_item: number;
  total_quantity: number;
};
export const transactionReciept = (
  data?: TransactionData,
  paymentMethodLabel?: string,
) => {
  const rawEncoder = new ReceiptPrinterEncoder({ width: 32 });
  const bytes = rawEncoder
    .initialize()
    .codepage("cp437")
    .newline(2)
    .align("center")
    .font("A")
    .line(data?.store.name ?? "-")
    .font("B")
    .line(data?.store.address ?? "-")
    .line(data?.store.phone ?? "-")
    .font("B")
    .rule({ style: "double", width: 42 })
    .font("A")
    .line(`--${data?.invoice ?? "-"}--`)
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
          data?.created_at ? format(data?.created_at, "dd/MM/yyyy HH:mm") : "-",
        ],
        ["Kasir", data?.kasir ?? "-"],
        ["Pelanggan", data?.customer_name ?? "-"],
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
        { width: 42, align: "left" }, // Kolom Nama
        { width: 16, align: "left" }, // Kolom Harga
        { width: 5, align: "right" }, // Kolom Harga
        { width: 21, align: "right" }, // Kolom Harga
      ],
      data?.items.map((i) => [
        i.name,
        (i.price ?? 0).toLocaleString("id-ID"),
        `${(i.quantity ?? 0).toLocaleString("id-ID")}X`,
        (i.total ?? 0).toLocaleString("id-ID"),
      ]) ?? [],
    )
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 27, align: "right", marginRight: 2 },
        { width: 13, align: "right" },
      ],
      [
        ["Subtotal:", (data?.subtotal ?? 0).toLocaleString("id-ID")],
        [
          `PPN (${data?.ppn.tax}):`,
          (data?.ppn.amount ?? 0).toLocaleString("id-ID"),
        ],
        [`Pembulatan:`, (data?.pembulatan ?? 0).toLocaleString("id-ID")],
        ["Total:", (data?.total_amount ?? 0).toLocaleString("id-ID")],
        ["Bayar:", (data?.paid_amount ?? 0).toLocaleString("id-ID")],
        ["Kembalian:", (data?.change_amount ?? 0).toLocaleString("id-ID")],
      ],
    )
    .newline()
    .font("A")
    .align("center")
    .line("- Terima Kasih -")
    .newline(4)
    .cut()
    .encode();

  return bytes;
};

export const shiftReceipt = (data?: ShiftEndResponse, userInfo?: UserInfo) => {
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
        ["Dicetak Oleh", userInfo?.resource.name],
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
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 16, align: "left" }, // Kolom Nama
        { width: 26, align: "right" }, // Kolom Harga
      ],
      [["Total Resi", data?.resource.total_invoice.toLocaleString() ?? "-"]],
    )
    .newline()
    .table(
      [
        { width: 16, align: "left" }, // Kolom Nama
        { width: 26, align: "right" }, // Kolom Harga
      ],
      [
        ["Kas Awal (A)", data?.resource.initial_cash.toLocaleString() ?? "-"],
        ["Kas Akhir", data?.resource.expected_cash.toLocaleString() ?? "-"],
        ["Selisih Kas (B)", data?.resource.difference.toLocaleString() ?? "-"],
        ["Aktual Kas", data?.resource.actual_cash.toLocaleString() ?? "-"],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 16, align: "left" }, // Kolom Nama
        { width: 26, align: "right" }, // Kolom Harga
      ],
      [
        ["Tunai", data?.resource.total_cash.toLocaleString() ?? "-"],
        [
          "Pembatalan Tunai",
          data?.resource.total_cash_cancel.toLocaleString() ?? "-",
        ],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 16, align: "left" }, // Kolom Nama
        { width: 26, align: "right" }, // Kolom Harga
      ],
      [
        ["QRIS", data?.resource.total_qris.toLocaleString() ?? "-"],
        [
          "Pembatalan QRIS",
          data?.resource.total_qris_cancel.toLocaleString() ?? "-",
        ],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 23, align: "left" }, // Kolom Nama
        { width: 19, align: "right" }, // Kolom Harga
      ],
      [
        ["Transfer EDC", data?.resource.total_transfer.toLocaleString() ?? "-"],
        [
          "Pembatalan Transfer EDC",
          data?.resource.total_transfer_cancel.toLocaleString() ?? "-",
        ],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 20, align: "left" }, // Kolom Nama
        { width: 22, align: "right" }, // Kolom Harga
      ],
      [
        ["Total Pajak", data?.resource.total_tax.toLocaleString() ?? "-"],
        [
          "Total Subtotal",
          data?.resource.total_subtotal.toLocaleString() ?? "-",
        ],
        [
          "Total Penjualan (C)",
          data?.resource.total_penjualan.toLocaleString() ?? "-",
        ],
        ["Total Pembulatan", data?.resource.pembulatan.toLocaleString() ?? "-"],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .table(
      [
        { width: 25, align: "left" }, // Kolom Nama
        { width: 17, align: "right" }, // Kolom Harga
      ],
      [
        ["Ekspektasi Pendapatan (D)", ""],
        ["(A+C)", data?.resource.expected_amount.toLocaleString() ?? "-"],
      ],
    )
    .table(
      [
        { width: 20, align: "left" }, // Kolom Nama
        { width: 22, align: "right" }, // Kolom Harga
      ],
      [
        ["Aktual Pendapatan", ""],
        ["(D+B)", data?.resource.actual_amount.toLocaleString() ?? "-"],
      ],
    )
    .newline()
    .rule({ style: "single", width: 42 })
    .newline(4)
    .cut()
    .encode();

  return bytes;
};
