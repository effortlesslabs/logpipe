"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { GET_PROFILE } from "@/graphql/profile";
import { useQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/copybutton";

function General() {
  const { data } = useQuery(GET_PROFILE);
  const profile_email = data?.profile.email;
  const profile_id = data?.profile.id;
  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col p-5 gap-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-5">
            <CardTitle className="text-xl">Avatar</CardTitle>
            <CardDescription className="text-foreground">
              This is your avatar. <br />
              Click on the avatar to upload a custom one from your files.
            </CardDescription>
          </div>
          <CardContent className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardContent>
        </div>
        <Separator />
        <CardFooter className="p-0 text-sm text-foreground">
          An avatar is optional but strongly recommended.
        </CardFooter>
      </Card>
      <Card className="flex flex-col p-5 gap-5">
        <CardTitle className="text-xl">Display Name</CardTitle>
        <CardDescription className="text-foreground">
          Please enter your full name, or a display name you are comfortable
          with.
        </CardDescription>
        <CardContent className="p-0">
          <input
            type="text"
            className="w-56 h-8 border border-foreground-muted rounded-md p-2 outline-foreground/50"
            placeholder=""
          />
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between p-0 text-sm text-foreground">
          Please use 32 characters at maximum.
          <Button variant={"ghost"} className="text-foreground">
            Save
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col gap-5 p-5">
        <CardTitle className="text-xl">Email</CardTitle>
        <CardDescription className="text-foreground">
          Enter the email addresses you want to use to log in with Vercel. Your
          primary email will be used for account-related notifications.
        </CardDescription>
        <div className="rounded-md h-12 w-96 p-2 border border-foreground-muted flex items-center justify-between">
          {profile_email} <Badge>Default</Badge>
        </div>
        <Separator />
        <CardFooter className="p-0 text-foreground text-sm">
          This is your primary user email.
        </CardFooter>
      </Card>
      <Card className="flex flex-col gap-5 p-5">
        <CardTitle className="text-xl">LogPipe ID</CardTitle>
        <CardDescription className="text-foreground">
          This is your id with LogPipe.
        </CardDescription>
        <div className="h-10 w-72 border border-foreground-muted rounded-md flex items-center p-2 justify-between">
          {profile_id} <CopyButton element={data?.profile.id} />
        </div>
        <Separator />
        <CardFooter className="p-0 text-foreground text-sm">
          Used when interacting with LogPipe.
        </CardFooter>
      </Card>
    </div>
  );
}

export default General;
