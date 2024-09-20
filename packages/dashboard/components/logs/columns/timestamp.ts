import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Log } from "@/types/log";

const timestamp: ColumnDef<Log> = {
  accessorKey: "createdAt",
  header: "Timestamp",
  cell: ({ row }) => {
    const timestamp = parseInt(row.getValue("createdAt"));
    const formattedDate = dayjs
      .unix(timestamp / 1000)
      .format("MMM DD HH:mm:ss.SS");

    return formattedDate;
  },
};

export default timestamp;
