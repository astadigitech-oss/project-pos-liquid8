import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PowerOffIcon, RefreshCw } from "lucide-react";

export const ErrorHandling = ({
  error,
  refetch,
  isRight,
}: {
  error: Error;
  refetch: () => void;
  isRight?: boolean;
}) => {
  return (
    <div
      className={cn(
        "size-full border border-red-300 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-red-500)]/5",
        isRight ? "rounded" : "rounded-lg",
      )}
    >
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <div className="size-10 rounded-full bg-red-200 flex items-center justify-center">
          <PowerOffIcon className="size-5 text-red-500" />
        </div>
        <p className="text-sm font-medium text-center px-5">{error.message}</p>
        <Button onClick={() => refetch()} className={"text-xs"}>
          <RefreshCw className="size-3.5" />
          Muat ulang
        </Button>
      </div>
    </div>
  );
};
