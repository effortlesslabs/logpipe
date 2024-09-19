import { Card } from "@/components/ui/card";
import { times } from "lodash";

function Loader() {
  const data = times(5, () => ({ id: Math.random() }));
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      {data.map((space) => (
        <Card key={space.id} className="p-4 h-44 animate-pulse bg-border/20" />
      ))}
    </div>
  );
}

export default Loader;
