import { Table } from "@tanstack/react-table";
import { Filter, RotateCw, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LevelFilter } from "./level";

interface FiltersProps<T> {
  loading: boolean;
  table: Table<T>;
  toggleFilters: boolean;
  setToggleFilters: (value: boolean) => void;
  refetch: () => void;
}

export function Filters<T>(props: FiltersProps<T>) {
  return (
    <div className="flex items-center gap-3 justify-between sticky z-20 px-5 pt-5 top-16 bg-background">
      <div className="flex gap-3 w-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => props.setToggleFilters(!props.toggleFilters)}
        >
          <Filter size={16} />
        </Button>
        <LevelFilter
          value={
            (props.table.getColumn("level")?.getFilterValue() as string) ?? ""
          }
          onChange={(value) =>
            props.table.getColumn("level")?.setFilterValue(value)
          }
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className={props.loading ? "animate-pulse" : ""}
          onClick={props.refetch}
        >
          <RotateCw size={16} className={props.loading ? "animate-spin" : ""} />
        </Button>

        <Button variant="outline" className="flex gap-2">
          <Play size={16} /> Live
        </Button>
      </div>
    </div>
  );
}
