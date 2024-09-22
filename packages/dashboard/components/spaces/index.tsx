"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import RecentLogs from "./logs";
import SpaceList from "./lists";

export default function Spaces() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateSpace = async () => {
    setLoading(true);
    router.push("/createspace");
  };

  return (
    <div className="flex flex-col gap-5 h-full p-5">
      <div className="flex justify-between items-center">
        <div className="flex-col gap-2">
          <h1 className="text-2xl font-bold">Hello there</h1>
          <p className="text-foreground/40">
            No hassles, just quick and easy access to get started now!
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleCreateSpace}
          disabled={loading}
        >
          {loading ? <Loader /> : "Create Space"}
        </Button>
      </div>

      <div className="flex flex-grow gap-10">
        <RecentLogs />
        <SpaceList />
      </div>
    </div>
  );
}
