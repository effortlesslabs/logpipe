"use client";

import { useCallback, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE, UPDATE_PROFILE } from "@/graphql/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CopyButton from "@/components/copy-button";

function General() {
  const { data } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [displayName, setDisplayName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    if (isUpdating) return;
    const trimmedName = displayName.trim();
    if (trimmedName === data?.profile.name) {
      setError("The new name can't be the same as the old name.");
      setIsDisabled(true);
    } else if (trimmedName.length < 3 && trimmedName.length > 0) {
      setError("The name should be at least 3 characters long.");
      setIsDisabled(true);
    } else {
      setError("");
      setIsDisabled(false);
    }
  }, [displayName, data, isUpdating]);
  const handleSubmit = useCallback(
    async (displayName: string) => {
      try {
        setIsUpdating(true);
        await updateProfile({
          variables: { input: { name: displayName } },
        });
        await window.location.reload();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    [updateProfile]
  );

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
            placeholder={data?.profile.name}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Separator />
        <CardFooter className="flex justify-between p-0 text-sm text-foreground">
          Please use 32 characters at maximum.
          <Button
            variant={"default"}
            onClick={() => handleSubmit(displayName)}
            disabled={isDisabled}
          >
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
          {data?.profile.email} <Badge>Default</Badge>
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
          {data?.profile.id} <CopyButton element={data?.profile.id} />
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
