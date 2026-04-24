"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { tz } from "@date-fns/tz";
import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDays, Check, RefreshCw, Search, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { useTime } from "@/hooks/use-time";
import { Atom, AtomValue } from "@suspensive/jotai";
import { listShiftAtom } from "../_api/queries";
import { ShiftDetailDialog } from "./_dialog/detail";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";
import { useAtom } from "jotai";
import {
  shiftEndDate,
  shiftPage,
  shiftSearch,
  shiftStartDate,
} from "../_api/atom";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";

export const ShiftsClient = () => {
  const { formattedDate, formattedTime } = useTime();
  return (
    <div className="flex flex-col gap-4 h-full">
      <ShiftDetailDialog />
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Manajemen Shift</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <AtomValue atom={listShiftAtom}>
        {({ data, isSuccess, isPending, isRefetching, isError, refetch }) => (
          <div className="bg-white p-5 flex flex-col gap-4 rounded-xl shadow">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-2">
                <Atom atom={shiftStartDate}>
                  {([startDate, setStartDate]) => (
                    <Atom atom={shiftEndDate}>
                      {([endDate, setEndDate]) => (
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button
                                className={
                                  "text-xs bg-transparent hover:bg-white"
                                }
                                variant={"outline"}
                              >
                                <CalendarDays className="size-3.5" />
                                <p className="pr-2">
                                  {!startDate
                                    ? "Pilih Tanggal"
                                    : !endDate || isSameDay(startDate, endDate)
                                      ? format(startDate, "PP", {
                                          locale: id,
                                          in: tz("Asia/Jakarta"),
                                        })
                                      : `${format(startDate, "PP", { locale: id, in: tz("Asia/Jakarta") })} - ${format(endDate, "PP", { locale: id, in: tz("Asia/Jakarta") })}`}
                                </p>
                              </Button>
                            }
                          />
                          <PopoverContent
                            className={"w-auto"}
                            align="start"
                            sideOffset={10}
                          >
                            <PopoverHeader>
                              <PopoverTitle>Pilih Rentang Tanggal</PopoverTitle>
                              <PopoverDescription>
                                Pilih rentang tanggal yang ingin Anda lihat.
                              </PopoverDescription>
                            </PopoverHeader>
                            <div className="flex-none border rounded-md">
                              <Calendar
                                mode="range"
                                numberOfMonths={2}
                                defaultMonth={
                                  startDate ? new Date(startDate) : undefined
                                }
                                selected={{
                                  from: startDate
                                    ? new Date(startDate)
                                    : undefined,
                                  to: endDate ? new Date(endDate) : undefined,
                                }}
                                onSelect={(e) => {
                                  setStartDate(e?.from?.toString());
                                  setEndDate(e?.to?.toString());
                                }}
                              />
                            </div>
                            <div className="border-t pt-2 w-full flex items-center justify-end gap-2">
                              <Button
                                size={"sm"}
                                variant={"outline"}
                                className={""}
                              >
                                <RefreshCw className="size-3.5" />
                                Reset
                              </Button>
                              <PopoverClose
                                render={
                                  <Button size={"sm"} className={""}>
                                    <Check className="size-3.5" />
                                    Konfirmasi
                                  </Button>
                                }
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </Atom>
                  )}
                </Atom>
              </div>
              <div className="flex items-center gap-2">
                <ShiftSearchInput
                  disabled={isPending || isRefetching}
                  isSuccess={isSuccess}
                  isError={isError}
                />
                <Button
                  variant={"diskonter"}
                  size={"icon"}
                  onClick={() => refetch()}
                >
                  <RefreshCw
                    className={cn("size-3.5", isRefetching && "animate-spin")}
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <DataTable columns={column()} data={data?.resource.data ?? []} />
              <Pagination
                atomPage={shiftPage}
                pagination={data?.resource.pagination}
                isPending={isPending || isRefetching}
              />
            </div>
          </div>
        )}
      </AtomValue>
    </div>
  );
};

const ShiftSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(shiftSearch);
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
    if ((!disabled && isSuccess) || (!disabled && isError)) {
      inputRef.current?.focus();
    }
  }, [disabled, isSuccess, isError]);

  return (
    <InputGroup className="has-disabled:opacity-100 has-disabled:bg-transparent w-64">
      <InputGroupInput
        placeholder="Cari shift..."
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="disabled:opacity-100"
        disabled={disabled}
      />
      <InputGroupAddon>
        <Search className="size-3.5" />
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
