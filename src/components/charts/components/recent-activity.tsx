import { CardComponent } from "@/components/ui/components/card-component";
import { formatDateWithTime } from "@/utils/date";
import { Separator } from "@radix-ui/react-separator";
import { Activity } from "lucide-react";
import { useMemo } from "react";

const mockPatientsAdded = [
  {
    id: 1,
    name: "Luca Bianchi",
    addedAt: "2025-08-20T08:30:00",
  },
  {
    id: 2,
    name: "Giulia Romano",
    addedAt: "2025-08-21T14:15:00",
  },
  {
    id: 3,
    name: "Marco Conti",
    addedAt: "2025-08-22T10:45:00",
  },
  {
    id: 4,
    name: "Sofia Greco",
    addedAt: "2025-08-23T16:20:00",
  },
  {
    id: 5,
    name: "Bianca Luigini",
    addedAt: "2025-08-24T09:10:00",
  },
];

const mockAlarmsTriggered = [
  {
    id: 1,
    name: "Federica Cioni",
    triggeredAt: "2025-08-20T12:45:00",
  },
  {
    id: 2,
    name: "Claudio Bianchi",
    triggeredAt: "2025-08-21T18:30:00",
  },
  {
    id: 3,
    name: "Matteo Rinaldi",
    triggeredAt: "2025-08-22T07:15:00",
  },
  {
    id: 4,
    name: "Matteo Rinaldi",
    triggeredAt: "2025-08-23T13:50:00",
  },
  {
    id: 5,
    name: "Davide Ferraro",
    triggeredAt: "2025-08-24T11:25:00",
  },
];

const mockParameterUpdated = [
  {
    id: 1,
    name: "Chiara Moretti",
    updatedAt: "2025-08-20T15:20:00",
  },
  {
    id: 2,
    name: "Elena Ricci",
    updatedAt: "2025-08-21T09:40:00",
  },
  {
    id: 3,
    name: "Tommaso Gallo",
    updatedAt: "2025-08-22T17:05:00",
  },
  {
    id: 4,
    name: "Davide Ferraro",
    updatedAt: "2025-08-23T08:35:00",
  },
  {
    id: 5,
    name: "Bianca Barone",
    updatedAt: "2025-08-24T14:55:00",
  },
];

export const RecentActivity = () => {
  const recentActivityCardContent = useMemo(() => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1 py-2">
          <div className="flex gap-2 items-center justify-between">
            <h1 className="text-lg font-semibold">Recent Activity</h1>
            <Activity className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-muted-foreground text-start text-xs">
            Latest patient updates and alarms
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium">
              Patient Added
            </h2>
            <div className="space-y-2">
              {mockPatientsAdded.map((patient) => (
                <div
                  key={`patient-${patient.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <p className="text-muted-foreground text-xs ">
                    {patient.name} - {formatDateWithTime(patient.addedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator orientation="horizontal" className="md:hidden" />
          <Separator orientation="vertical" className="hidden md:block" />

          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium">
              Alarm Triggered
            </h2>
            <div className="space-y-2">
              {mockAlarmsTriggered.map((alarm) => (
                <div
                  key={`alarm-${alarm.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-alarm" />
                  <p className="text-muted-foreground text-xs ">
                    {alarm.name} - {formatDateWithTime(alarm.triggeredAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator orientation="horizontal" className="md:hidden" />
          <Separator orientation="vertical" className="hidden md:block" />

          <div className="flex-1">
            <h2 className="mb-2 text-start text-sm font-medium">
              Parameter Updated
            </h2>
            <div className="space-y-2">
              {mockParameterUpdated.map((parameter) => (
                <div
                  key={`param-${parameter.id}`}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-info" />
                  <p className="text-muted-foreground text-xs ">
                    {parameter.name} - {formatDateWithTime(parameter.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return <CardComponent cardContent={recentActivityCardContent} />;
};
