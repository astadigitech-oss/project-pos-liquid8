import { cn } from "@/lib/utils";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export const RupiahInput = ({
  prefix = "Rp",
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CurrencyInput>) => {
  return (
    <CurrencyInput
      {...props}
      prefix={prefix}
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  focus-visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 text-base dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 border-gray-300 focus-visible:border-gray-400 sm:text-xs placeholder:text-xs",
        className,
      )}
    />
  );
};
