"use client";

import Layouts from "@/components/layouts";
import Logs from "@/components/logs";
import { useParams } from "next/navigation";

export default function Home() {
  const { space } = useParams();
  return (
    <Layouts>
      <Logs spaceId={space as string} />
    </Layouts>
  );
}
