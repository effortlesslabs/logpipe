import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { LevelFilter } from "./level";

export function Filters<T>({ table }: { table: Table<T> }) {
  return (
    <div className="flex items-center">
      <LevelFilter
        value={(table.getColumn("level")?.getFilterValue() as string) ?? ""}
        onChange={(value) => table.getColumn("level")?.setFilterValue(value)}
      />

      <DropdownMenu>
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
      </DropdownMenu>
    </div>
  );
}
