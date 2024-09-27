"use client";

import { useRouter } from "next/navigation";
import Layouts from "@/components/layouts";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <Layouts>
      <div className="h-screen flex justify-center items-center flex-col p-4">
        <h1 className="font-semibold text-4xl md:text-6xl lg:text-[100px] text-center">
          Gen Log Pipe
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-center h-24 mt-4">
          Next-Generation Logger, Tracer, and Metrics Components for Rapid AI &
          Blockchain App Creation
        </p>
        <div className="flex flex-col md:flex-row w-full md:w-56 justify-between mt-8 space-y-4 md:space-y-0">
          <Button
            onClick={() => router.push("/docs/get-started")}
            className="w-full md:w-auto"
          >
            Get Started
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="w-full md:w-auto"
          >
            Access
          </Button>
        </div>
      </div>
    </Layouts>
  );
}
