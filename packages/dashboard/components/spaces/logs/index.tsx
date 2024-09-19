import { Card } from "@/components/ui/card";

export default function RecentLogs() {
  return (
    <div className="text-md w-1/3 h-full flex flex-col gap-5">
      <p className="font-semibold">Recent Logs</p>
      <Card className="w-full p-5 flex-grow flex justify-center items-center">
        <p className="font-thin text-foreground/60 text-sm">No logs found</p>
      </Card>
    </div>
  );
}
