"use client";

import { useSyncExternalStore } from "react";

type OS = "Windows" | "MacOS" | "Other";

const detectOS = (): OS => {
  if (typeof window === "undefined") return "Other";

  const ua = window.navigator.userAgent;

  // Deteksi Windows
  if (/Win/i.test(ua)) return "Windows";

  // Deteksi MacOS
  // Kita pastikan bukan iOS (iPhone/iPad) dengan cek touchPoints
  if (/Mac/i.test(ua) && window.navigator.maxTouchPoints <= 1) return "MacOS";

  return "Other";
};

export const useOS = () => {
  const os = useSyncExternalStore(
    () => () => {},
    () => detectOS(),
    () => "Other" as OS,
  );

  return {
    os,
    isLoaded: os !== "Other",
  };
};
