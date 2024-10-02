"use client";

import Link from "next/link";
import Layouts from "@/components/layouts";
import { Button } from "@/components/ui/button";

const title = "Gen LogPipe";
const description =
  "Next-Generation Logger, Tracer, and Metrics Components for Rapid AI & Blockchain App Creation";
const primaryButton = "Get Started";
const secondaryButton = "Access";

export default function Home() {
  return (
    <Layouts>
      <div className="h-screen flex justify-center items-center flex-col p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-6xl lg:text-[100px] text-center font-semibold">
            {title}
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-center h-24 mt-4 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link href="/docs/get-started">
            <Button className="w-full flex-1">{primaryButton}</Button>
          </Link>

          <Link href="/login">
            <Button variant="secondary" className="w-full flex-1">
              {secondaryButton}
            </Button>
          </Link>
        </div>
      </div>
    </Layouts>
  );
}
