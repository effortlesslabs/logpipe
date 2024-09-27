import Link from "next/link";
import { useProfileStore } from "@/zustand";
import { ModeToggle } from "./mode-toggle";
import ProfileMenu from "../profile-menu";

import { Icons } from "@/components/icons";

function Header() {
  const profile = useProfileStore((state) => state.profile);

  return (
    <header className="border-b py-2 px-5 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 w-full items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-4 flex items-center space-x-1 lg:mr-6">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold lg:inline-block">
              Effortless Labs /
            </span>
            <span className="hidden lg:inline-block">Logpipe</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
          {profile && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
  return (
    <div className="border-b py-3 px-5 flex justify-between sticky top-0 z-50 bg-background">
      <h1 className="font-bold text-2xl">
        <a href="/spaces">LogPipe</a>
      </h1>
      <div className="gap-4 flex items-center">
        <ModeToggle />
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Header;
