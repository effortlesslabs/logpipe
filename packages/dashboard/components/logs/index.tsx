import {
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Log } from "@/types/log";

import { columns } from "./columns";
import { Table } from "./table";
import Sidebar from "./sidebar";
import { Filters } from "./filters";
import { Pagination } from "./pagination";
import client from "@/graphql/apollo";

import { GET_LOGS } from "@/graphql/log";

async function fetchLogs(spaceId: string, filter: {}): Promise<Log[]> {
  console.log("fetchLogs"), spaceId;
  return new Promise((resolve) => {
    client
      .query({ query: GET_LOGS, variables: { spaceId } })
      .then((result) => {
        resolve(result.data.logs);
      })
      .catch((error) => {});
  });
}

export default async function Logs({ spaceId }: { spaceId: string }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const logs: Log[] = [];

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="flex bg-background flex-grow">
      <Sidebar />
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-2">
          <Filters table={table} />
          <Table
            table={table}
            columnsCount={columns.length}
            loading={false}
            error={undefined}
          />
          <Pagination
            getCanPreviousPage={table.getCanPreviousPage}
            handleNextPage={table.previousPage}
            handlePreviousPage={table.nextPage}
          />
        </div>
      </div>
    </div>
  );
}
