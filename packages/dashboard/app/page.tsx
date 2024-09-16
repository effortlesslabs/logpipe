import Navbar from "@/components/navbar";
import Navbar2 from "@/components/navbar2";
import Content from "@/components/content";

export default function Home() {
  return (
    <div className="flex-col bg-[#0a0a0a]">
      <Navbar />
      <Navbar2 />
      <Content />
    </div>
  );
}
