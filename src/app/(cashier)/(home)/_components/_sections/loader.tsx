import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  return (
    <div className="size-full border border-red-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-red-500)]/5">
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <div className="size-10 rounded-full bg-red-200 flex items-center justify-center">
          <Spinner className="size-5 text-red-500" />
        </div>
        <p className="text-sm font-medium">Memuat data...</p>
      </div>
    </div>
  );
};
