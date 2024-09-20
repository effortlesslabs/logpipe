import { Table } from "@tanstack/react-table";
import { Filter, RotateCw, Play } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { LevelFilter } from "./level";

interface FiltersProps<T> {
  table: Table<T>;
  toggleFilters: boolean;
  setToggleFilters: (value: boolean) => void;
}

export function Filters<T>(props: FiltersProps<T>) {
  return (
    <div className="flex items-center gap-3 justify-between">
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
        <Button variant="outline" size="icon">
          <RotateCw size={16} />
        </Button>

        <Button variant="outline" className="flex gap-2">
          <Play size={16} /> Live
        </Button>
      </div>

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column, index, columns) => {
              const visibleColumns = columns.filter((col) =>
                col.getIsVisible()
              ).length;
              const isLastVisible =
                visibleColumns === 1 && column.getIsVisible();

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  disabled={isLastVisible} // Disable if it's the last visible column
                  onCheckedChange={(value: unknown) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id === "createdAt" ? "Timestamp" : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
