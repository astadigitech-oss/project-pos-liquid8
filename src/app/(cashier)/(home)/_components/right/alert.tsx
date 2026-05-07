import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";

export const Alert = ({
  label,
  isError,
  isValid,
  className,
}: {
  label: string;
  isError?: boolean;
  isValid?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 h-10 p-4 rounded-lg bg-yellow-300",
        isError && "bg-red-300",
        isValid && "bg-green-200",
        className,
      )}
    >
      {isValid ? (
        <CheckCircle className="size-4" />
      ) : (
        <AlertTriangle className="size-4" />
      )}
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
