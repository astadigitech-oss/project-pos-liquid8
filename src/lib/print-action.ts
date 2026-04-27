import { printUrl } from "@/config";
import { toast } from "sonner";

export const printAction = async (data: Uint8Array<ArrayBufferLike>) => {
  // 3. Kirim ke Rust Bridge (Port 3001)
  try {
    const response = await fetch(`${printUrl}/print-raw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from(data),
    });

    const result = await response.json(); // { status: boolean, message: string }

    if (!response.ok || !result.status) {
      toast.error(result.message);
      return { status: false, message: result.message };
    }
    return { status: true, message: result.message };
  } catch (error) {
    const msg =
      (error as Error).message ??
      "Gagal: Pastikan aplikasi POS Bridge sudah aktif.";
    toast.error(msg);
    return { status: false, message: msg };
  }
};
export const printCheck = async () => {
  try {
    const response = await fetch(`${printUrl}/printer-ready`, {
      method: "GET",
      // Tambahkan timeout agar tidak menunggu terlalu lama jika URL mati
      signal: AbortSignal.timeout(3000),
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      toast.error(result.message);
      return { status: false, message: result.message };
    }

    return { status: true, message: result.message };
  } catch (error) {
    // CEK DISINI: Jika fetch gagal (server mati/url tidak aktif)
    let msg = "Terjadi kesalahan sistem.";

    if (error instanceof TypeError || (error as Error).name === "AbortError") {
      msg = "Printer tidak tersedia (Aplikasi Bridge tidak aktif)";
    } else {
      msg = (error as Error).message;
    }

    toast.error(msg);
    return { status: false, message: msg };
  }
};
