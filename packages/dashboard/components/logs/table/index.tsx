"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Log } from "@/types/log";
import { ApolloError } from "@apollo/client";
import Loader from "./loader";

interface LogsTableProps {
  loading: boolean;
  error: ApolloError | undefined;
  logs: Log[];
}

function LogsTable({ loading, error, logs }: LogsTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="text-sm">
          <TableRow>
            <TableHead className="w-52">Timestamp</TableHead>
            <TableHead className="w-36">Level</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <div className="p-2" />

        {error && <div>{error.message}</div>}
        {!loading && logs.length === 0 && <div>No logs found</div>}
        {!loading && logs.length > 0 && (
          <TableBody className="text-sm">
            {logs.map((log: Log) => (
              <TableRow key={log.id} className="rounded-xl">
                <TableCell>{log.createdAt}</TableCell>
                <TableCell className="uppercase">{log.level}</TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {loading && <Loader />}
    </div>
  );
}

export default LogsTable;
