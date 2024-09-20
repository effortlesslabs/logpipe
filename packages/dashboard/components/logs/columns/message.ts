import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@/types/log";

const message: ColumnDef<Log> = {
  accessorKey: "message",
  header: "Message",
};

export default message;
