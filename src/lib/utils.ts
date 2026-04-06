import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numericString = (e: string) => {
  if (Number.isNaN(e) || e === "" || Number.parseFloat(e) === 0) return "0";
  return e.startsWith("0") ? e.replace(/^0+/, "") : e;
};

export function formatRupiah(rupiah: string | number): string {
  const value =
    typeof rupiah === "string"
      ? parseFloat(rupiah.replace(/[^\d.-]/g, ""))
      : rupiah;

  if (!value || isNaN(value)) return "Rp0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(Math.ceil(value))
    .replace(/\s/g, "");
}

export const formatPhoneNumber = (value: string) => {
  // Ambil hanya angka, batasi 13 digit, lalu bagi per 4 digit dengan "-"
  return (
    value
      .replace(/\D/g, "")
      .slice(0, 13)
      .match(/.{1,4}/g)
      ?.join("-") || ""
  );
};
