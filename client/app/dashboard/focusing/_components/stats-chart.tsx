"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useThemeColors from "@/hooks/use-theme-colors";

const chartData = [
  { day: "Pzt", hours: 2.0 },
  { day: "Sal", hours: 3.0 },
  { day: "Çar", hours: 1.5 },
  { day: "Per", hours: 3.5 },
  { day: "Cum", hours: 2.0 },
  { day: "Cmt", hours: 2.5 },
  { day: "Paz", hours: 4.0 },
];

const chartConfig = {
  hours: {
    label: "hours",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function FocusingStatsChart() {
  const themeColors = useThemeColors();

  return (
    <ChartContainer config={chartConfig} className="min-h-[180px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} stroke={themeColors.border} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: any) => value.slice(0, 6)}
          tick={{
            fill: themeColors["base-content"],
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="hours"
          type="linear"
          stroke={themeColors.primary}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
