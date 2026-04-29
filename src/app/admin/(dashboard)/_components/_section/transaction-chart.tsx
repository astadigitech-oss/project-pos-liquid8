import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Atom, AtomValue } from "@suspensive/jotai";
import { ChevronDown, DollarSign } from "lucide-react";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { periodSalesAtom } from "../../_api/atom";
import { formatRupiah } from "@/lib/utils";
import { dashboardSalesAtom } from "../../_api/queries";
import { format, isSameMonth, isSameYear } from "date-fns";

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

const chartConfig = {
  total_sales: {
    label: "Penjualan",
    color: "var(--color-red-400)",
    icon: DollarSign,
  },
} satisfies ChartConfig;

export const TransactionChart = () => {
  return (
    <AtomValue atom={dashboardSalesAtom}>
      {({ data }) => (
        <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Total Penjualan</p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium px-3 py-1 border rounded-lg border-gray-300 bg-gray-100">
                {formatPeriodeIndonesia(data?.resource)}
              </p>
              <Atom atom={periodSalesAtom}>
                {([period, setPeriod]) => (
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button className={"capitalize w-24 justify-between"}>
                          {period === "week" ? "Minggu" : "Bulan"}
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
                              Minggu
                            </CommandItem>
                            <CommandItem
                              data-checked={period === "month"}
                              value="month"
                              onSelect={() => setPeriod("month")}
                            >
                              Bulan
                            </CommandItem>
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              </Atom>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-64">
            <AreaChart
              accessibilityLayer
              data={data?.resource.sales}
              margin={{
                left: 12,
                right: 12,
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
                          <p>{(key && chartConfig[key]?.label) || name}</p>
                          <p className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
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
      )}
    </AtomValue>
  );
};
