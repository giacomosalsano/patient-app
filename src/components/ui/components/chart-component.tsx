import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ChartComponentProps {
  chartConfig: ChartConfig;
  chartData: any[];
  dataKey: string;
  nameKey: string;
}

export function ChartComponent({
  chartConfig,
  chartData,
  dataKey,
  nameKey,
}: ChartComponentProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey={dataKey} label nameKey={nameKey} />
      </PieChart>
    </ChartContainer>
  );
}
