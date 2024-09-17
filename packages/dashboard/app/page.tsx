import LogTable from "@/components/log.table";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="bg-black flex h-screen flex-col">
      <div className="h-16 text-white flex justify-center items-center">
        Header
      </div>
      <div className="flex flex-grow">
        <Sidebar />
        <LogTable />
      </div>
    </div>
  );
}
