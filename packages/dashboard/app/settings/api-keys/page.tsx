import { Separator } from "@/components/ui/separator";
import ApiKeys from "@/components/profile-menu/api-keys";

function ApiKeyPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Api Keys</h3>
        <p className="text-sm text-muted-foreground">
          These api-keys will allow any user or app to take control of your
          whole account and related spaces or logs. Be careful!
        </p>
      </div>
      <Separator className="w-full" />
      <ApiKeys />
    </div>
  );
}

export default ApiKeyPage;
