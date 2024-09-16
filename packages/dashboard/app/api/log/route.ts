import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export async function GET() {
  const logFilePath = path.join(process.cwd(), "app/config/logger.log");
  const logData = fs.readFileSync(logFilePath, "utf-8");
  const logs: LogEntry[] = logData
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      // Split the line by the first space to get the time
      const [timestamp, ...rest] = line.split(" ");

      // Join the rest into one string and split by the first ': ' to separate the level and message
      const restOfLine = rest.join(" ");
      const level = restOfLine.substring(0, restOfLine.indexOf(": "));
      const message = restOfLine.substring(restOfLine.indexOf(": ") + 2);

      return { timestamp, level, message };
    });

  return NextResponse.json(logs);
}
