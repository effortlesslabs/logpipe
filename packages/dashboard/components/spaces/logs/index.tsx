import { useQuery, useLazyQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { RECENT_LOGS } from "@/graphql/log";
import { GET_SPACE } from "@/graphql/space";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Log } from "@/types/log";
import { truncate } from "lodash";

export default function RecentLogs() {
  const { data } = useQuery(RECENT_LOGS, {
    fetchPolicy: "network-only",
    pollInterval: 10000,
  });

  return (
    <div className="text-md w-full lg:w-1/3 h-full flex flex-col gap-5">
      <p className="text-sm ml-2">Recent Logs</p>
      <Card className="w-full p-2 flex-grow flex justify-center items-start font-mono">
        {data?.recentLogs?.length > 0 ? (
          <Table>
            <TableBody className="p-0">
              {data.recentLogs.map((log: Log, index: number) => (
                <TableRow key={index}>
                  {/* Fixed width and responsive adjustments for each column */}
                  <TableCell className="w-10 lg:w-10 text-nano font-semibold">
                    <SpaceName spaceId={log.spaceId} />
                  </TableCell>
                  <TableCell className="w-20 lg:w-28 text-nano">
                    {formatDistanceToNowCustom(
                      new Date(parseInt(log.createdAt))
                    )}
                  </TableCell>
                  <TableCell className="w-16 lg:w-24 text-nano">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-light ${getLevelColor(
                        log.level
                      )}`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </TableCell>
                  {/* Truncate long messages, apply nowrap and ellipsis */}
                  <TableCell className="w-full lg:w-32 text-nano truncate overflow-hidden whitespace-nowrap">
                    {truncate(log.message, { length: 25 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p className=" text-muted-foreground text-sm">No logs found</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function SpaceName({ spaceId }: { spaceId: string }) {
  const [getSpace, { data, loading, error }] = useLazyQuery(GET_SPACE, {
    variables: { spaceId: spaceId },
  });

  useEffect(() => {
    if (spaceId) {
      getSpace();
    }
  }, [spaceId, getSpace]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <>{data?.space?.name || "Unknown Space"}</>;
}

function getLevelColor(level: string) {
  switch (level) {
    case "info":
      return "bg-blue-100 text-blue-700";
    case "error":
      return "bg-red-100 text-red-700";
    case "warn":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDistanceToNowCustom(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true })
    .replace("minutes", "mins")
    .replace("minute", "min")
    .replace("less than a min ago", "just now");
}
