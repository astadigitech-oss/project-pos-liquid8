import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TextSearchIcon, XCircle, XIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columnDraf } from "../columns-draf";
import { Button } from "@/components/ui/button";
import { Atom, AtomValue } from "@suspensive/jotai";
import { listPendingAtom } from "../../_api/queries";
import { draftListDialog, draftPage, draftSearch } from "../../_api/atoms";
import { Pagination } from "@/components/pagination";
import { useAtom } from "jotai";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";

export const DraftTransaction = () => {
  return (
    <Atom atom={draftListDialog}>
      {([open, setOpen]) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false} className={"min-w-3xl"}>
            <DialogHeader>
              <DialogTitle>Draf Transaksi</DialogTitle>
              <DialogDescription>
                List transaksi customer yang tertunda
              </DialogDescription>
            </DialogHeader>
            <AtomValue atom={listPendingAtom}>
              {({ data, isPending, isSuccess, isRefetching }) => (
                <div className="flex flex-col gap-4">
                  <DraftSearchInput
                    isSuccess={isSuccess}
                    disabled={isPending || isRefetching}
                  />
                  <DataTable
                    columns={columnDraf({
                      from: data?.resource.pagination.from ?? 0,
                    })}
                    data={data?.resource.data ?? []}
                  />
                  <Pagination
                    pagination={data?.resource.pagination}
                    isPending={isPending}
                    atomPage={draftPage}
                  />
                </div>
              )}
            </AtomValue>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant={"outline"}>
                    <XIcon className="size-3.5" />
                    Tutup
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Atom>
  );
};

const DraftSearchInput = ({
  disabled,
  isSuccess,
}: {
  disabled: boolean;
  isSuccess: boolean;
}) => {
  const [search, setSearch] = useAtom(draftSearch);
  const [localValue, setLocalValue] = React.useState(search);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = setTimeout(() => setSearch(localValue), 500);
    return () => clearTimeout(handler);
  }, [localValue, setSearch]);

  React.useEffect(() => {
    setLocalValue(search);
  }, [search]);

  React.useEffect(() => {
    if (!disabled && isSuccess) {
      inputRef.current?.focus();
    }
  }, [disabled, isSuccess]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent">
      <InputGroupInput
        placeholder="Cari customer..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={disabled}
      />
      <InputGroupAddon>
        <TextSearchIcon className="size-3.5" />
      </InputGroupAddon>
      {disabled && (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-3.5" />
        </InputGroupAddon>
      )}
      {!disabled && search.length > 0 && (
        <InputGroupAddon align="inline-end">
          <TooltipText
            value="Bersihkan pencarian"
            render={
              <InputGroupButton size="icon-xs" onClick={() => setSearch("")}>
                <XCircle className="size-3.5" />
              </InputGroupButton>
            }
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};
