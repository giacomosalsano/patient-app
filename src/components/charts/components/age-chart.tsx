import type { ChartConfig } from "@/components/ui/chart";
import { CardComponent } from "@/components/ui/components/card-component";
import { ChartComponent } from "@/components/ui/components/chart-component";
import type { Patient } from "@/modules/patient/types";
import { formatAge } from "@/utils/date";
import { PieChartIcon } from "lucide-react";
import { useMemo } from "react";

interface AgeChartProps {
  patients: Patient[];
}

export function AgeChart({ patients }: AgeChartProps) {
  const ageDistribution = useMemo(() => {
    return patients.map((patient) => formatAge(patient.birthDate));
  }, [patients]);

  const chartData = [
    {
      name: "0-10",
      quantity: ageDistribution.filter((age) => age >= 0 && age <= 10).length,
      fill: "var(--chart-1)",
    },
    {
      name: "11-20",
      quantity: ageDistribution.filter((age) => age >= 11 && age <= 20).length,
      fill: "var(--chart-2)",
    },
    {
      name: "21-30",
      quantity: ageDistribution.filter((age) => age >= 21 && age <= 30).length,
      fill: "var(--chart-3)",
    },
    {
      name: "31-40",
      quantity: ageDistribution.filter((age) => age >= 31 && age <= 40).length,
      fill: "var(--chart-4)",
    },
    {
      name: "41-50",
      quantity: ageDistribution.filter((age) => age >= 41 && age <= 50).length,
      fill: "var(--chart-5)",
    },
    {
      name: "51-60",
      quantity: ageDistribution.filter((age) => age >= 51 && age <= 60).length,
      fill: "var(--chart-6)",
    },
    {
      name: "61-70",
      quantity: ageDistribution.filter((age) => age >= 61 && age <= 70).length,
      fill: "var(--chart-7)",
    },
    {
      name: "71-80",
      quantity: ageDistribution.filter((age) => age >= 71 && age <= 80).length,
      fill: "var(--chart-8)",
    },
    {
      name: "81-90",
      quantity: ageDistribution.filter((age) => age >= 81 && age <= 90).length,
      fill: "var(--chart-9)",
    },

    {
      name: "91-100",
      quantity: ageDistribution.filter((age) => age >= 91 && age <= 100).length,
      fill: "var(--chart-10)",
    },
    {
      name: "101-110",
      quantity: ageDistribution.filter((age) => age >= 101 && age <= 110)
        .length,
      fill: "var(--chart-11)",
    },
  ];

  const chartConfig = {
    name: {
      label: "Age",
    },
    quantity: {
      label: "Number of Patients",
    },
  } satisfies ChartConfig;

  const ageDistributionCardContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Age Distribution</h1>
          <PieChartIcon className="text-muted-foreground h-4 w-4" />
        </div>
        <div>
          <ChartComponent
            chartConfig={chartConfig}
            chartData={chartData}
            dataKey="quantity"
            nameKey="name"
          />
        </div>
      </div>
    );
  }, []);
  return (
    <div className="flex w-3xl flex-col gap-2 lg:w-3xl lg:gap-2">
      <CardComponent cardContent={ageDistributionCardContent} />
    </div>
  );
}
