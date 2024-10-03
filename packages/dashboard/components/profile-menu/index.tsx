"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useProfileStore } from "@/zustand";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/profile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";

function ProfileMenu() {
  const { data } = useQuery(GET_PROFILE);
  const { clearProfile } = useProfileStore((state) => state);

  const handleLogout = useCallback(() => {
    try {
      clearProfile();
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [clearProfile]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-base">
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 p-2"
        align="end"
        alignOffset={5}
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className="font-normal flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">
            {data?.profile.name}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {data?.profile.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/spaces">Spaces</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
