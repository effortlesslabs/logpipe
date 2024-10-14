"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ApiKeyForm from "./form";
import ApiKeyList from "./list";

import ApiKeyDisplayDialog from "./dialog";

function ApiKeys() {
  const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null);

  return (
    <div className="gap-5 flex flex-col">
      <ApiKeyDisplayDialog
        generatedKey={generatedApiKey}
        onClose={() => setGeneratedApiKey(null)}
      />

      <Card className="flex flex-col gap-5 p-5">
        <CardTitle className="text-xl">Create Api Key</CardTitle>
        <Separator />
        <CardDescription className="text-foreground">
          Enter a unique name for your token to differentiate it from other
          tokens. Then select the scope for the token.
        </CardDescription>
        <div className="flex">
          <ApiKeyForm onSuccess={setGeneratedApiKey} />
        </div>
      </Card>
      <Card className="flex flex-col gap-5 p-5">
        <CardTitle className="text-xl">Api Keys</CardTitle>
        <Separator />
        <CardDescription className="text-foreground">
          These are all the Api keys you have created till now.
        </CardDescription>
        <div className="flex">
          <ApiKeyList />
        </div>
      </Card>
    </div>
  );
}

export default ApiKeys;
