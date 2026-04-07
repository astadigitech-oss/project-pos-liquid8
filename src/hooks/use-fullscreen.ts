"use client";

import { useEffect, useCallback, useState } from "react";

export const useFullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error("Gagal mengubah mode fullscreen:", error);
    }
  }, []);

  useEffect(() => {
    // Fungsi untuk mensinkronkan state dengan keadaan asli browser
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable;

      if (event.key.toLowerCase() === "f" && !isTyping) {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    // Listener untuk perubahan mode fullscreen (baik via tombol F maupun tombol ESC bawaan browser)
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleFullscreen]);

  return { toggleFullscreen, isFullscreen };
};
