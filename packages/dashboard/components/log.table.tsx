import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function LogTable() {
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
        <TableRow className=" border-[#333]">
          <TableCell>2021-10-01 12:00:00</TableCell>
          <TableCell>INFO</TableCell>
          <TableCell>Server started</TableCell>
        </TableRow>
        <TableRow className="">
          <TableCell>2021-10-01 1:00:00</TableCell>
          <TableCell>INFO</TableCell>
          <TableCell>Server ended</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default LogTable;
