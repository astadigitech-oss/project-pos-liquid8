import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { Suspense } from "@suspensive/react";
import React from "react";
import { activeShiftAtom } from "../_api/queries";
import { cashierDialog } from "../_api/atoms";
import { cn } from "@/lib/utils";
import { LucideIcon, PowerIcon, PowerOffIcon } from "lucide-react";

// Helper component untuk menjaga konsistensi UI
const ShiftButtonBase = ({
  label,
  icon: Icon = PowerIcon,
  variant = "loading",
  onClick,
  disabled,
}: {
  label: string;
  icon?: LucideIcon;
  variant?: "loading" | "active" | "inactive";
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    variant="outline"
    className="h-10 rounded-full px-1.5 border-white hover:border-gray-300 shadow hover:bg-white disabled:opacity-100"
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    <div
      className={cn(
        "size-7 flex items-center justify-center rounded-full",
        variant === "loading" && "bg-gray-100/60 text-gray-600",
        variant === "active" && "bg-emerald-100/60 text-emerald-600",
        variant === "inactive" && "bg-red-100/60 text-red-600",
      )}
    >
      {variant === "loading" ? (
        <Spinner className="size-3.5" />
      ) : (
        <Icon className="size-3.5" />
      )}
    </div>
    <p className="pr-2 tabular-nums">{label}</p>
  </Button>
);

export const ButtonShift = () => {
  return (
    <Suspense
      clientOnly
      fallback={<ShiftButtonBase label="Memuat..." disabled />}
    >
      <AtomValue atom={activeShiftAtom}>
        {({ isSuccess, isLoading }) => (
          <SetAtom atom={cashierDialog}>
            {(setOpen) => {
              // Menentukan state dalam variabel agar JSX lebih bersih
              const label = isLoading
                ? "Memuat..."
                : isSuccess
                  ? "Akhiri Shift"
                  : "Mulai Shift";
              const variant = isLoading
                ? "loading"
                : isSuccess
                  ? "active"
                  : "inactive";
              const Icon = isSuccess ? PowerIcon : PowerOffIcon;

              return (
                <ShiftButtonBase
                  label={label}
                  icon={Icon}
                  variant={variant}
                  disabled={isLoading}
                  onClick={() =>
                    setOpen(isSuccess ? "shift-end" : "shift-start")
                  }
                />
              );
            }}
          </SetAtom>
        )}
      </AtomValue>
    </Suspense>
  );
};
