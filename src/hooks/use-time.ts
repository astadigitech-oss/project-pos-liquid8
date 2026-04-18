"use client";

import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

export const useTime = () => {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    // Memperbarui state setiap detik
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(time, "iii, dd MMM yyyy", {
    locale: id,
    in: tz("Asia/Jakarta"),
  });
  const formattedTime = format(time, "HH:mm", {
    locale: id,
    in: tz("Asia/Jakarta"),
  });

  return { formattedDate, formattedTime };
};
