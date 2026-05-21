import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AtomValue } from "@suspensive/jotai";
import { Package } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardIndexAtom } from "../../_api/queries";

const chartConfig = {
  stock: {
    label: "Stok",
    color: "var(--color-red-300)",
    icon: Package,
  },
} satisfies ChartConfig;

export const StockChart = () => {
  return (
    <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between h-8">
        <p className="text-sm font-semibold">Stock Barang Pertoko</p>
      </div>
      <AtomValue atom={dashboardIndexAtom}>
        {({ data }) => (
          <ChartContainer
            config={chartConfig}
            style={{
              height: 4 * ((data?.resource.stock_per_store.length ?? 0) * 10),
            }}
          >
            <BarChart
              accessibilityLayer
              data={data?.resource.stock_per_store}
              layout="vertical"
              margin={{
                left: 12,
                right: 40,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="store_name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="stock" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="stock" fill="var(--color-stock)" radius={8}>
                <LabelList
                  dataKey="store_name"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label) font-semibold"
                  fontSize={12}
                  formatter={(value: any) => {
                    // Paksa menjadi string dan berikan fallback string kosong jika null/undefined
                    const str = String(value ?? "");

                    return str
                      .toLowerCase()
                      .replace("diskonter ", "")
                      .replace(/\b\w/g, (char) => char.toUpperCase());
                  }}
                />
                <LabelList
                  dataKey="stock"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </AtomValue>
    </div>
  );
};
