"use client";

import { useEffect, useState } from "react";

interface LogTableData {
  timestamp: string;
  level: string;
  message: string;
}

const LogTable = () => {
  const [logs, setData] = useState<LogTableData[]>([]);

  useEffect(() => {
    // Fetch the log data from the server
    fetch("/api/log")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);
  return (
    <div className="p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{log.timestamp}</td>
              <td className="border px-4 py-2">{log.level}</td>
              <td className="border px-4 py-2">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
