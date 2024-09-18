"use client";

import Layouts from "@/components/layouts";
import Logs from "@/components/logs";
import Sidebar from "@/components/logs/sidebar";

export default function Home() {
  return (
    <Layouts>
      <div className="flex bg-background flex-grow">
        <Sidebar />
        <Logs />
      </div>
    </Layouts>
  );
}
