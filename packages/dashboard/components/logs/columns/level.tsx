import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@/types/log";

const level: ColumnDef<Log> = {
  accessorKey: "level",
  header: "Level",
  cell: ({ row }) => {
    const level = (row.getValue("level") as string).toLowerCase();
    const getColor = (level: string) => {
      switch (level) {
        case "info":
          return "text-green-500";
        case "warning":
          return "text-yellow-500";
        case "error":
          return "text-red-500";
        default:
          return "text-black";
      }
    };

    return (
      <div
        className={`text-sm bg-foreground/5 py-1 px-2 rounded-lg capitalize ${getColor(
          level
        )}`}
      >
        {row.getValue("level")}
      </div>
    );
  },
};

export default level;
