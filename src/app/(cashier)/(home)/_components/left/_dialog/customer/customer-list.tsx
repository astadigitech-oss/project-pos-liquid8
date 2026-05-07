import React from "react";
import {
  DialogClose,
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
import { RefreshCw, UserPlus2, UserSearch, XCircle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cashierDialog,
  customerPage,
  customerSearch,
} from "../../../../_api/atoms";
import { DataTable } from "@/components/data-table";
import { column } from "../../columns/customer-columns";
import { listMemberAtom } from "../../../../_api/queries";
import { Pagination } from "@/components/pagination";
import { cn } from "@/lib/utils";
import { TooltipText } from "@/providers/tooltip-provider";
import { Spinner } from "@/components/ui/spinner";

import { useAtom, useAtomValue } from "jotai";
import { SetAtom } from "@suspensive/jotai";

export const CustomerList = () => {
  const { data, isRefetching, isPending, refetch, isSuccess } =
    useAtomValue(listMemberAtom);

  const isLoading = isPending || isRefetching;
  const pagination = data?.resource.pagination;

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Pilih Customer</DialogTitle>
        <DialogDescription>Pastikan data customer sesuai</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <CustomerSearchInput disabled={isLoading} isSuccess={isSuccess} />
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw
              className={cn("size-3.5", isRefetching && "animate-spin")}
            />
          </Button>

          <SetAtom atom={cashierDialog}>
            {(setDialog) => (
              <Button
                size="icon"
                type="button"
                onClick={() => setDialog("customer-add")}
                variant={"diskonter"}
              >
                <UserPlus2 className="size-3.5" />
              </Button>
            )}
          </SetAtom>
        </div>

        <DataTable
          columns={column({ from: pagination?.from ?? 0 })}
          data={data?.resource.data ?? []}
        />

        <Pagination
          atomPage={customerPage}
          pagination={pagination}
          isPending={isLoading}
        />
      </div>

      <DialogFooter>
        <DialogClose
          render={
            <Button variant="outline">
              <XIcon className="size-3.5 mr-2" />
              Tutup
            </Button>
          }
        />
      </DialogFooter>
    </div>
  );
};

const CustomerSearchInput = ({
  disabled,
  isSuccess,
}: {
  disabled: boolean;
  isSuccess: boolean;
}) => {
  const [search, setSearch] = useAtom(customerSearch);
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
        <UserSearch className="size-3.5" />
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
