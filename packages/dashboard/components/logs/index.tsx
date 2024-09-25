import { useCallback, useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import {
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Log } from "@/types/log";
import { getLogsApi } from "@/graphql/log";

import { columns } from "./columns";
import { Table } from "./table";
import Sidebar from "./sidebar/sidebar";
import { Filters } from "./filters";
import { Pagination } from "./pagination";

export default function Logs({ spaceId }: { spaceId: string }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | undefined>();
  const [toggleFilters, setToggleFilters] = useState(false);

  const table = useReactTable({
    data: logs,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
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

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const logs = await getLogsApi(spaceId);
      setLogs(logs);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="flex bg-background flex-grow">
      {!toggleFilters && <Sidebar />}
      <div className="flex flex-col gap-5 w-full">
        <Filters
          loading={loading}
          table={table}
          toggleFilters={toggleFilters}
          setToggleFilters={setToggleFilters}
          refetch={fetchLogs}
        />
        <Table
          table={table}
          columnsCount={columns.length}
          loading={loading}
          error={error}
        />
        <Pagination
          getCanPreviousPage={table.getCanPreviousPage}
          handleNextPage={table.previousPage}
          handlePreviousPage={table.nextPage}
        />
      </div>
    </div>
  );
}
