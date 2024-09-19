"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Logs = {
  id: string;
  spaceId: string;
  level: string;
  message: string;
  profileId: string;
  createdAt: string;
};

export const columns: ColumnDef<Logs>[] = [
  {
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
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = (row.getValue("level") as string).toLowerCase(); // convert to lowercase to make it case-insensitive

      const getColor = (level: string) => {
        switch (level) {
          case "info":
            return "text-green-500";
          case "warning":
            return "text-yellow-500";
          case "error":
            return "text-red-500";
          default:
            return "text-black"; // fallback color
        }
      };

      return <div className={`uppercase ${getColor(level)}`}>{row.getValue("level")}</div>;
    },
  },

  {
    accessorKey: "message",
    header: "Message",
  },
];
