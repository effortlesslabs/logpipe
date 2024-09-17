import { GET_LOGS } from "@/graphql/log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { useQuery } from "@apollo/client";
import { Log } from "@/types/log";

function LogTable() {
  const { data, loading, error } = useQuery(GET_LOGS, {
    variables: { spaceId: "66e9656d7d998ff29c479bc4" },
    fetchPolicy: "cache-and-network",
  });

  console.log(data, error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-white">Error: {error.message}</div>;
  return (
    <Table>
      <TableHeader className="text-sm">
        <TableRow className="border-[#333]">
          <TableHead className="w-52">Timestamp</TableHead>
          <TableHead className="w-36">Level</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm text-white">
        {data.logs.map((log: Log) => (
          <TableRow key={log.id} className="border-[#333]">
            <TableCell>{log.createdAt}</TableCell>
            <TableCell className="uppercase">{log.level}</TableCell>
            <TableCell>{log.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LogTable;
