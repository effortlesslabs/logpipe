import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { ChevronDown } from "lucide-react";

function ProjectsButton() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-neutral-50 hover:bg-slate-300 text-black text-lg rounded-lg gap-2"
          >
            Projects <ChevronDown size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Project1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Project2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Project3</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProjectsButton;
