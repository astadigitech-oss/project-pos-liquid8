"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Label({
  className,
  required = false,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-xs",
        className,
        required && "required",
      )}
      {...props}
    />
  );
}

export { Label };
