import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@/types/log";
import level from "./level";
import message from "./message";
import timestamp from "./timestamp";

export const columns: ColumnDef<Log>[] = [timestamp, level, message];
