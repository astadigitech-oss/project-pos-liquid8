import { printUrl } from "@/config";
import { toast } from "sonner";

export const printAction = async (data: Uint8Array<ArrayBufferLike>) => {
  // 3. Kirim ke Rust Bridge (Port 3001)
  try {
    const response = await fetch(printUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from(data),
    });

    const result = await response.json(); // { status: boolean, message: string }

    if (!response.ok) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(
      (error as Error).message ??
        "Gagal: Pastikan aplikasi POS Bridge sudah aktif.",
    );
  }
};
