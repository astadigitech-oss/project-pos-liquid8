"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import React from "react";
import {
  storeIdPage,
  storeIdSearch,
  storePeriod,
  storeSelectedId,
} from "../_api/atom";
import { storeChartAtom, storeDetailAtom } from "../_api/queries";
import {
  ArrowLeft,
  ChevronDown,
  DollarSign,
  MapPinned,
  Phone,
  StoreIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn, formatRupiah } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { format, isSameMonth, isSameYear } from "date-fns";
import { Atom } from "@suspensive/jotai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DataTable } from "@/components/data-table";
import { column } from "./columns";
import { Pagination } from "@/components/pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RefreshCw, Search, XCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { TooltipText } from "@/providers/tooltip-provider";

const chartConfig = {
  total_sales: {
    label: "Penjualan",
    color: "var(--color-red-400)",
    icon: DollarSign,
  },
} satisfies ChartConfig;

export const StoreIdClient = () => {
  const params = useParams();
  const setSelectedId = useSetAtom(storeSelectedId);
  const { data, isPending, isRefetching, isError, isSuccess, refetch } =
    useAtomValue(storeDetailAtom);
  const { data: storeChart } = useAtomValue(storeChartAtom);

  function formatPeriodeIndonesia(resource?: {
    period?: string;
    start?: string;
    end?: string;
  }) {
    if (!resource?.start || !resource?.end) return null;
    const start = new Date(resource.start);
    const end = new Date(resource.end);
    if (resource.period === "week") {
      if (isSameYear(start, end)) {
        if (isSameMonth(start, end)) {
          // Example: 01 - 07 Apr 2024
          return `${format(start, "dd")} - ${format(end, "dd MMM yyyy")}`;
        }
        // Example: 28 Mar - 03 Apr 2024
        return `${format(start, "dd MMM")} - ${format(end, "dd MMM yyyy")}`;
      }
      // Example: 28 Des 2023 - 03 Jan 2024
      return `${format(start, "dd MMM yyyy")} - ${format(end, "dd MMM yyyy")}`;
    }
    if (resource.period === "month") {
      if (isSameYear(start, end)) {
        // Example: 2024
        return `${format(start, "yyyy")}`;
      }
      // Example: 2023 - 2024
      return `${format(start, "yyyy")} - ${format(end, "yyyy")}`;
    }
    return null;
  }

  React.useEffect(() => {
    if (params.storeId) {
      setSelectedId(params.storeId as string);
    }
  }, [params.storeId, setSelectedId]);
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="bg-white border shadow rounded-xl p-4 flex items-center gap-4">
        <div className="size-16 flex items-center justify-center border rounded-lg border-gray-500 flex-none">
          <StoreIcon absoluteStrokeWidth className="size-10 stroke-1" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between gap-4 pr-3">
            <div className="flex items-center">
              <Link href={"/admin/stores"}>
                <Button
                  variant={"ghost"}
                  className={"hover:bg-transparent group"}
                  size={"icon"}
                >
                  <div className="size-6 group-hover:bg-red-100 rounded-md flex items-center justify-center transition-all group-hover:-translate-x-0.5 translate-x-0.5">
                    <ArrowLeft />
                  </div>
                </Button>
              </Link>
              <h1 className="font-semibold text-lg">
                {data?.resource.store.store_name}
              </h1>
            </div>
            <TooltipText
              render={
                <Button
                  onClick={() => refetch()}
                  size={"icon"}
                  variant={"outline"}
                  className={"border-gray-300"}
                >
                  <RefreshCw
                    className={cn("size-3.5", isRefetching && "animate-spin")}
                  />
                </Button>
              }
              value="Muat Ulang"
            />
          </div>
          <Separator className={"bg-gray-400"} />
          <div className="flex items-center justify-between gap-4 px-3">
            <div className="text-sm flex items-center gap-2 text-black/70">
              <MapPinned absoluteStrokeWidth className="size-4" />
              <p>{data?.resource.store.address}</p>
            </div>
            <div className="text-xs border px-2 py-0.5 border-gray-400 rounded-lg bg-gray-100 flex items-center gap-1.5">
              <Phone className="size-2.5 fill-black" />
              {data?.resource.store.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col">
          <p className="text-sm">Penjualan Hari ini</p>
          <p className="font-semibold text-lg">
            {formatRupiah(data?.resource.store.total_sales_today ?? 0)}
          </p>
        </div>
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col">
          <p className="text-sm">Total Stok Produk</p>
          <p className="font-semibold text-lg">
            {(data?.resource.store.total_stock ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col">
          <p className="text-sm">Total Harga Produk</p>
          <p className="font-semibold text-lg">
            {formatRupiah(data?.resource.store.total_price_product ?? 0)}
          </p>
        </div>
      </div>
      <Accordion multiple defaultValue={["chart"]} className={"gap-4"}>
        <AccordionItem value={"chart"} className={"bg-white rounded-xl shadow"}>
          <AccordionTrigger
            className={"px-4 h-14 items-center font-semibold text-base"}
          >
            Chart Penjualan
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 pt-0 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Separator
                  className={
                    "flex-auto bg-linear-to-r to-red-500 via-red-500 from-black/50"
                  }
                />
                <Atom atom={storePeriod}>
                  {([period, setPeriod]) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button className={"w-fit"} size={"sm"}>
                            {period === "week" ? "Mingguan" : "Bulanan"}
                            <span className="text-xs">
                              ({formatPeriodeIndonesia(storeChart?.resource)})
                            </span>
                            <ChevronDown />
                          </Button>
                        }
                      />
                      <PopoverContent className={"p-0 w-auto"}>
                        <Command className="p-0">
                          <CommandGroup>
                            <CommandList>
                              <CommandItem
                                data-checked={period === "week"}
                                value="week"
                                onSelect={() => setPeriod("week")}
                              >
                                Mingguan
                              </CommandItem>
                              <CommandItem
                                data-checked={period === "month"}
                                value="month"
                                onSelect={() => setPeriod("month")}
                              >
                                Bulanan
                              </CommandItem>
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </Atom>
                <Separator
                  className={
                    "flex-auto bg-linear-to-r from-red-500 via-red-500 to-black/50"
                  }
                />
              </div>
              <ChartContainer config={chartConfig} className="w-full h-56">
                <AreaChart
                  accessibilityLayer
                  data={storeChart?.resource.sales}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label, payload) => {
                          const key = payload?.[0]?.name as
                            | keyof typeof chartConfig
                            | undefined;
                          return (
                            <div className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground">
                              {key &&
                                chartConfig[key]?.icon &&
                                React.createElement(chartConfig[key].icon)}
                              <span>{label}</span>
                            </div>
                          );
                        }}
                        formatter={(value, name) => {
                          const key =
                            typeof name === "string" && name in chartConfig
                              ? (name as keyof typeof chartConfig)
                              : undefined;
                          return (
                            <div className="flex items-center text-xs text-muted-foreground gap-2 ml-5">
                              <p className="mb-0!">
                                {(key && chartConfig[key]?.label) || name}
                              </p>
                              <p className="ml-auto flex gap-0.5 font-mono font-medium text-foreground tabular-nums">
                                {formatRupiah(
                                  typeof value === "number" ? value : 0,
                                )}
                              </p>
                            </div>
                          );
                        }}
                      />
                    }
                  />
                  <Area
                    dataKey="total_sales"
                    type="natural"
                    fill="var(--color-total_sales)"
                    fillOpacity={0.4}
                    stroke="var(--color-total_sales)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value={"product"}
          className={"bg-white rounded-xl shadow"}
        >
          <AccordionTrigger
            className={"px-4 h-14 items-center font-semibold text-base"}
          >
            List Produk
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 p-4 pt-0 [&_p:not(:last-child)]:mb-0!">
              <StoreIdSearchInput
                disabled={isPending || isRefetching}
                isError={isError}
                isSuccess={isSuccess}
              />
              <DataTable
                data={data?.resource.products.data ?? []}
                columns={column({
                  from: data?.resource.products.pagination.from ?? 0,
                })}
              />
              <Pagination
                atomPage={storeIdPage}
                pagination={data?.resource.products.pagination}
                isPending={isPending || isRefetching}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const StoreIdSearchInput = ({
  disabled,
  isSuccess,
  isError,
}: {
  disabled: boolean;
  isSuccess: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useAtom(storeIdSearch);
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
        placeholder="Cari produk..."
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
