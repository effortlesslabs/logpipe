"use client";

import { Table as TanTable } from "@tanstack/react-table";
import { Table as ShTable } from "@/components/ui/table";
import { Header } from "./header";
import { Body } from "./body";
import { ApolloError } from "@apollo/client";

interface DataTableProps<T> {
  table: TanTable<T>;
  columnsCount: number;
  loading: boolean;
  error: ApolloError | undefined;
}

export function Table<T>({
  table,
  columnsCount,
  loading,
  error,
}: DataTableProps<T>) {
  return (
    <div className="rounded border">
      <ShTable>
        <Header groups={table.getHeaderGroups()} />
        <Body
          rows={table.getRowModel()?.rows}
          columnsCount={columnsCount}
          loading={loading}
          error={error}
        />
      </ShTable>
    </div>
  );
}
