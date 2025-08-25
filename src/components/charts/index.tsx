import { AgeChart } from "@/components/charts/components/age-chart";
import { AlarmChart } from "@/components/charts/components/alarm-chart";
import { CardComponent } from "@/components/ui/components/card-component";
import type { Patient } from "@/modules/patient/types";
import { formatAge, formatDate } from "@/utils/date";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  EqualApproximately,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Separator } from "../ui/separator";

interface ChartsProps {
  patients: Patient[];
}

const mockPatientsAdded = [
  {
    id: 1,
    name: "Luca Bianchi",
    addedAt: "2025-08-20",
  },
  {
    id: 2,
    name: "Giulia Romano",
    addedAt: "2025-08-21",
  },
  {
    id: 3,
    name: "Marco Conti",
    addedAt: "2025-08-22",
  },
  {
    id: 4,
    name: "Sofia Greco",
    addedAt: "2025-08-23",
  },
  {
    id: 5,
    name: "Alessandro Esposito",
    addedAt: "2025-08-24",
  },
];

const mockAlarmsTriggered = [
  {
    id: 1,
    name: "Federica Cioni",
    triggeredAt: "2025-08-20",
  },
  {
    id: 2,
    name: "Claudio Bianchi",
    triggeredAt: "2025-08-21",
  },
  {
    id: 3,
    name: "Matteo Rinaldi",
    triggeredAt: "2025-08-22",
  },
  {
    id: 4,
    name: "Francesca De Luca",
    triggeredAt: "2025-08-23",
  },
  {
    id: 5,
    name: "Davide Ferraro",
    triggeredAt: "2025-08-24",
  },
];

const mockParameterUpdated = [
  {
    id: 1,
    name: "Chiara Moretti",
    updatedAt: "2025-08-20",
  },
  {
    id: 2,
    name: "Elena Ricci",
    updatedAt: "2025-08-21",
  },
  {
    id: 3,
    name: "Tommaso Gallo",
    updatedAt: "2025-08-22",
  },
  {
    id: 4,
    name: "Alessia Benedetti",
    updatedAt: "2025-08-23",
  },
  {
    id: 5,
    name: "Federico Barone",
    updatedAt: "2025-08-24",
  },
];

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

  const recentActivityCardContent = useMemo(() => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1 py-2">
          <div className="flex gap-2 lg:items-center">
            <h1 className="text-lg font-semibold">Recent Activity</h1>
            <Activity className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-muted-foreground text-start text-xs lg:text-center">
            Latest patient updates and alarms
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium lg:text-center">
              Patient Added
            </h2>
            <div className="space-y-2">
              {mockPatientsAdded.map((patient) => (
                <div
                  key={`patient-${patient.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-muted-foreground text-xs">
                    {patient.name} — {formatDate(patient.addedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator orientation="horizontal" className="lg:hidden" />
          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium lg:text-center">
              Alarm Triggered
            </h2>
            <div className="space-y-2">
              {mockAlarmsTriggered.map((alarm) => (
                <div
                  key={`alarm-${alarm.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <p className="text-muted-foreground text-xs">
                    {alarm.name} — {formatDate(alarm.triggeredAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator orientation="horizontal" className="lg:hidden" />
          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium lg:text-center">
              Parameter Updated
            </h2>
            <div className="space-y-2">
              {mockParameterUpdated.map((parameter) => (
                <div
                  key={`param-${parameter.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <p className="text-muted-foreground text-xs">
                    {parameter.name} — {formatDate(parameter.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="container p-4 pb-20 text-center md:py-10 lg:mx-auto lg:px-0">
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

      <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-4">
          <AlarmChart patients={patients} />

          <AgeChart patients={patients} />
        </div>

        <CardComponent cardContent={recentActivityCardContent} />
      </div>
    </div>
  );
}
