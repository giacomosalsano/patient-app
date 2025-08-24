import { Button } from "@/components/ui/button";
import { SelectComponent } from "@/components/ui/components/select-component";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ColumnFiltersState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { Filter, Search } from "lucide-react";
import { useMemo } from "react";

interface FiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  table: Table<any>;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setSorting: (value: SortingState) => void;
  loading?: boolean;
}

export function Filters({
  globalFilter,
  setGlobalFilter,
  table,
  setColumnFilters,
  setSorting,
  loading = false,
}: FiltersProps) {
  const sexSelectItems = useMemo(() => {
    return [
      { value: "all", label: "All" },
      { value: "M", label: "Male" },
      { value: "F", label: "Female" },
    ];
  }, []);

  const alarmSelectItems = useMemo(() => {
    return [
      { value: "all", label: "All" },
      { value: "true", label: "With Alarm" },
      { value: "false", label: "Without Alarm" },
    ];
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative max-w-sm flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Filter by name..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Filter className="text-muted-foreground h-4 w-4" />
        <SelectComponent
          value={(table.getColumn("sex")?.getFilterValue() as string) || ""}
          onValueChange={(value) => {
            table
              .getColumn("sex")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
          defaultValue="all"
          placeholder="Sex"
          triggerClassName="w-[120px]"
          items={sexSelectItems}
        />

        <SelectComponent
          value={(table.getColumn("alarm")?.getFilterValue() as string) || ""}
          onValueChange={(value) => {
            table
              .getColumn("alarm")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
          defaultValue="all"
          placeholder="Alarm"
          triggerClassName="w-[120px]"
          items={alarmSelectItems}
        />

        <Button
          variant="outline"
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters([]);
            setSorting([]);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
