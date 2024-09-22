import { Card } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <Card className="flex gap-2 w-44 py-4 justify-center items-center">
      <LoaderCircle className="text-6xl animate-spin" /> Please wait....
    </Card>
  );
}

export default Loader;
