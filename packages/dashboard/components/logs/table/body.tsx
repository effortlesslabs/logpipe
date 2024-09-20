"use client";
import React from "react";

import { flexRender, Row } from "@tanstack/react-table";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ApolloError } from "@apollo/client";
import { times } from "lodash";

interface BodyProps<T> {
  rows: Row<T>[];
  columnsCount: number;
  loading: boolean;
  error: ApolloError | undefined;
}

export function Body<T>({ rows, columnsCount, loading, error }: BodyProps<T>) {
  const logs = rows || [];
  return (
    <TableBody>
      {!loading &&
        logs.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={
                  cell.column.columnDef.header == "info" ? "text-red-500" : ""
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}

      {loading && (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-96 text-center">
            Loading...
          </TableCell>
        </TableRow>
      )}

      {error && (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-96 text-center">
            {error.message}
          </TableCell>
        </TableRow>
      )}

      {!loading && logs.length === 0 && (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-96 text-center">
            No logs found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
