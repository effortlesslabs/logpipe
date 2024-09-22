"use client";

import Layouts from "@/components/layouts";
import { Button } from "@/components/ui/button";
import Form from "./form";

export default function Home() {
  return (
    <Layouts>
      <div className="flex flex-col h-full">
        <div className="flex-grow flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-4xl font-bold">
              Let&apos;s build something new
            </h1>
            <p className=" text-foreground/40">
              No hassles, just quick and easy access to get started now!
            </p>
          </div>
          <Form />
        </div>
        <div className=" border-t p-8 flex justify-center items-center">
          <Button variant="link" className="text-base"></Button>
        </div>
      </div>
    </Layouts>
  );
}
