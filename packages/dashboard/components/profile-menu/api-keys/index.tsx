import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ApiKeyForm from "./api-key-form";
import ApiKeyList from "./api-key-list";

function ApiKeys() {
  return (
    <div className="gap-5 flex flex-col">
      <Card className="flex flex-col gap-5 p-5">
        <CardTitle className="text-xl">Create Api Key</CardTitle>
        <Separator />
        <CardDescription className="text-foreground">
          Enter a unique name for your token to differentiate it from other
          tokens. Then select the scope for the token.
        </CardDescription>
        <div className="flex">
          <ApiKeyForm />
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
