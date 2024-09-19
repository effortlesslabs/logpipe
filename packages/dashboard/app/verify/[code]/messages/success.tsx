import { UserRoundCheck } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Success() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/spaces");
    }, 2000);
  }, [router]);

  return (
    <Card className="p-5 w-1/3 gap-5 flex flex-col">
      <div className="flex justify-center">
        <div className="flex bg-foreground/10 p-4 rounded-full">
          <UserRoundCheck size={30} className="text-6xl text-primary" />
        </div>
      </div>
      <CardDescription className="text-center">
        Success! You&apos;ve successfully signed in. Your account is now linked
        and ready to use. Enjoy seamless access and get started right away.
        Welcome aboard!
      </CardDescription>
    </Card>
  );
}

export default Success;
