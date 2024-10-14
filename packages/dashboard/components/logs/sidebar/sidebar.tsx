import { Button } from "@/components/ui/button";
import SideBarOptions from "./sidebar-options";

function Sidebar() {
  return (
    <div className="border-r h-full w-64">
      <div className="p-5 sticky top-16">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Filters</h2>
          <Button size="sm" variant="outline">
            Reset
          </Button>
        </div>
        <SideBarOptions />
      </div>
    </div>
  );
}

export default Sidebar;
