"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentLogs from "./logs";
import SpaceList from "./lists";
import { Input } from "../ui/input";

export default function Spaces() {
  return (
    <div className="container flex flex-col gap-5 h-full p-5">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-col gap-2 flex-grow">
          <Input placeholder="Search Spaces" />
        </div>
        <Link href="/create-space">
          <Button>Create Space</Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row flex-grow gap-10">
        <RecentLogs />
        <SpaceList />
      </div>
    </div>
  );
}
