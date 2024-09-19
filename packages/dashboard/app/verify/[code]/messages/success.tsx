import { Mail } from "lucide-react";

import { Card, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

function Success() {
  return (
    <Card className="p-5 w-1/3 gap-5 flex flex-col">
      <div className="flex justify-center">
        <div className="flex bg-foreground/10 p-4 rounded-full">
          <Mail size={30} className="text-6xl text-primary" />
        </div>
      </div>
      <CardDescription className="text-center">
        To complete your login, please check your email for a message from us.
        Inside, you&apos;ll find a verification link—simply click it to verify
        your account and log in. This ensures a secure login experience. If you
        don&apos;t see the email, check your spam folder or request a new one.
      </CardDescription>
    </Card>
  );
}

export default Success;
