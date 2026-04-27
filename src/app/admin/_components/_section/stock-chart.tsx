import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Package } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-red-300)",
    icon: Package,
  },
} satisfies ChartConfig;

export const StockChart = () => {
  return (
    <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col gap-1">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
