"use client";
import { ShieldAlert } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";

function Error({ message }: { message: string }) {
  return (
    <Card className="p-5 w-1/3 gap-5 flex flex-col">
      <div className="flex justify-center">
        <div className="flex bg-foreground/10 p-4 rounded-full">
          <ShieldAlert size={30} className="text-6xl text-red-500" />
        </div>
      </div>
      <CardDescription className="text-center">{message}</CardDescription>
    </Card>
  );
}

export default Error;
