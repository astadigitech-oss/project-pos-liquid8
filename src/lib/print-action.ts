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
