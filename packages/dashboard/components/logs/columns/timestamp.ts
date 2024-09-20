import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@/types/log";

const timestamp: ColumnDef<Log> = {
  accessorKey: "createdAt",
  header: "Timestamp",
  cell: ({ row }) => {
    const date = new Date(row.getValue("createdAt"));
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const milliseconds = Math.floor(date.getMilliseconds() / 10)
      .toString()
      .padStart(2, "0");
    return `${formattedDate.toUpperCase()}.${milliseconds}`;
  },
};

export default timestamp;
