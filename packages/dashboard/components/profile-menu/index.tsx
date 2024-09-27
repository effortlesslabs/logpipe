"use client";

import { useRouter } from "next/navigation";
import { useProfileStore } from "@/zustand";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProfileMenu() {
  const router = useRouter();
  const { data } = useQuery(GET_PROFILE);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const profile = useProfileStore((state) => state.profile);

  if (!profile) {
    return null; // or you can return a loading state or alternative UI if needed
  }
  const handleLogout = () => {
    try {
      clearProfile();
      localStorage.clear();
      sessionStorage.clear();

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 p-2"
        align="end"
        alignOffset={5}
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.profile.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/spaces")}>
          Spaces
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
