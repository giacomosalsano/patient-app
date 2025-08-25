import { AgeChart } from "@/components/charts/components/age-chart";
import { AlarmChart } from "@/components/charts/components/alarm-chart";
import { CardComponent } from "@/components/ui/components/card-component";
import type { Patient } from "@/modules/patient/types";
import { formatAge } from "@/utils/date";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  EqualApproximately,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { RecentActivity } from "./components/recent-activity";

interface ChartsProps {
  patients: Patient[];
}

export function Charts({ patients }: ChartsProps) {
  const totalPatientsCardContent = useMemo(() => {
    return (
      <div>
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Total Patients</h1>
          <Users className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-2xl font-bold">{patients.length}</div>
          <p className="text-muted-foreground text-xs">
            +20.1% from last month
          </p>
        </div>
      </div>
    );
  }, [patients]);

  const totalParametersCardContent = useMemo(() => {
    return (
      <div>
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Parameters</h1>
          <Activity className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-2xl font-bold">
            {patients.reduce(
              (acc, patient) => acc + patient.parameters.length,
              0,
            )}
          </div>
          <p className="text-muted-foreground text-xs">+10% from last month</p>
        </div>
      </div>
    );
  }, [patients]);

  const alarmsCardContent = useMemo(() => {
    return (
      <div>
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Alarms</h1>
          <AlertTriangle className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-2xl font-bold">
            {patients.reduce(
              (acc, patient) =>
                acc +
                patient.parameters.filter((parameter) => parameter.alarm)
                  .length,
              0,
            )}
          </div>
          <p className="text-muted-foreground text-xs">-5.2% from last month</p>
        </div>
      </div>
    );
  }, [patients]);

  const averageAgeCardContent = useMemo(() => {
    return (
      <div>
        <div className="flex flex-row items-center justify-between py-2">
          <h1 className="text-lg font-bold">Average Age</h1>
          <BarChart3 className="text-muted-foreground h-4 w-4" />
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row items-center gap-2 text-2xl font-bold">
            <EqualApproximately className="text-muted-foreground h-4 w-4" />
            {Math.round(
              patients.reduce(
                (acc, patient) => acc + formatAge(patient.birthDate),
                0,
              ) / patients.length,
            )}
          </div>
          <p className="text-muted-foreground text-xs">Rounded average age</p>
        </div>
      </div>
    );
  }, [patients]);

  return (
    <div className="p-4 pb-20 text-center md:w-full lg:mx-auto lg:px-8 lg:pt-10">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight lg:text-3xl">
          Charts
        </h2>
        <p className="text-muted-foreground">
          Visualize patient data and analytics
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <CardComponent cardContent={totalPatientsCardContent} />

        <CardComponent cardContent={totalParametersCardContent} />

        <CardComponent cardContent={alarmsCardContent} />

        <CardComponent cardContent={averageAgeCardContent} />
      </div>

      <div className="mt-4 lg:mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="flex w-full flex-col gap-4 md:flex-row md:gap-4">
          <AlarmChart patients={patients} />

          <AgeChart patients={patients} />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
}
