"use client";
import Layouts from "@/components/layouts";
import LogTable from "@/components/log.table";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function Home() {
  return (
    <Layouts>
      <div className="bg-black flex h-screen flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <LogTable />
        </div>
      </div>
    </Layouts>
  );
}
