"use client";

import { Button } from "@/components/ui/button";
import Layouts from "@/components/layouts";
import Messages from "./messages";
import { useParams } from "next/navigation";

export default function Verification() {
  const { code } = useParams();
  return (
    <Layouts>
      <div className="flex flex-col h-full">
        <div className="flex-grow flex flex-col items-center justify-center gap-5">
          <Messages code={code as string} />
        </div>
        <div className=" border-t p-8 flex justify-center items-center">
          <Button variant="link" className="text-base"></Button>
        </div>
      </div>
    </Layouts>
  );
}
