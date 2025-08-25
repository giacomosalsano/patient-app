import type { ChartConfig } from "@/components/ui/chart";
import { CardComponent } from "@/components/ui/components/card-component";
import { ChartComponent } from "@/components/ui/components/chart-component";
import type { Patient } from "@/modules/patient/types";
import { PieChartIcon } from "lucide-react";
import { useMemo } from "react";

interface AlarmChartProps {
  patients: Patient[];
}

export function AlarmChart({ patients }: AlarmChartProps) {
  const numberOfPatientsWithAlarm = useMemo(() => {
    return patients.filter((patient) =>
      patient.parameters.some((parameter) => parameter.alarm),
    ).length;
  }, [patients]);

  const numberOfPatientsWithoutAlarm = useMemo(() => {
    return patients.length - numberOfPatientsWithAlarm;
  }, [patients, numberOfPatientsWithAlarm]);

  const chartData = [
    {
      name: "With Alarm",
      quantity: numberOfPatientsWithAlarm,
      fill: "var(--alarm)",
    },
    {
      name: "Without Alarm",
      quantity: numberOfPatientsWithoutAlarm,
      fill: "var(--no-alarm)",
    },
  ];

  const chartConfig = {
    name: {
      label: "Name",
    },
    quantity: {
      label: "Quantity",
    },
  } satisfies ChartConfig;

  const patientDistributionCardContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Patient with Alarms</h1>
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
    <div className="flex w-full flex-col gap-2 lg:w-3xl lg:gap-2">
      <CardComponent cardContent={patientDistributionCardContent} />
    </div>
  );
}
