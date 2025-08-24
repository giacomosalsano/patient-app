import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ColumnFiltersState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { Filter, Search } from "lucide-react";

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
        <Select
          value={(table.getColumn("sex")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => {
            table
              .getColumn("sex")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="M">Male</SelectItem>
            <SelectItem value="F">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={(table.getColumn("alarm")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => {
            table
              .getColumn("alarm")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Alarm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">With Alarm</SelectItem>
            <SelectItem value="false">Without Alarm</SelectItem>
          </SelectContent>
        </Select>

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
