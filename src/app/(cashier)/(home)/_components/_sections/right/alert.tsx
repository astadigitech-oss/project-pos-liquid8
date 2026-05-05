import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import React from "react";

export const Alert = ({
  label,
  isError,
}: {
  label: string;
  isError?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 h-10 p-4 rounded-lg",
        isError ? "bg-red-300" : "bg-yellow-300",
      )}
    >
      <AlertTriangle className="size-4" />
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
