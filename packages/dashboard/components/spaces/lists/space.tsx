import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Space as ISpace } from "@/types/space";

export default function Space({ space }: { space: ISpace }) {
  return (
    <Card className="p-4 hover:ring-1 ring-border cursor-pointer hover:border-foreground/20 hover:ease-in-out hover:transition-all">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-md font-semibold">{space.name}</h1>
          {/* <Button size="sm" variant="outline" className="text-foreground/60">
            Edit
          </Button> */}
        </div>
        <p className="text-foreground/40 text-sm">{space.description}</p>
        <div className="pt-2 flex justify-between">
          <p className="text-sm text-foreground/80">Logs Count</p>
          <p className="text-sm">0</p>
        </div>
      </div>
    </Card>
  );
}
