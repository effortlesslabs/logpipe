import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import ProfileMenu from "../profile-menu";

import { Icons } from "@/components/icons";
import { Button } from "../ui/button";
import { useGlobalStore } from "@/zustand";

function Header() {
  const { logged } = useGlobalStore();
  return (
    <header className="py-2 px-5 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-4 flex items-center space-x-1 lg:mr-6">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold lg:inline-block">
              Effortless Labs /
            </span>
            <span className="hidden lg:inline-block">Logpipe</span>
          </Link>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" className="text-muted-foreground">
            Feedback
          </Button>
          <Button variant="link" className="text-muted-foreground">
            Changelog
          </Button>
          <Button variant="link" className="text-muted-foreground">
            Docs
          </Button>
          <Button variant="link" className="text-muted-foreground">
            Support
          </Button>
          <div className="flex gap-2">
            {logged && <ProfileMenu />}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
