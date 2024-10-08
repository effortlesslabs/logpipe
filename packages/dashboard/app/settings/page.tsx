import { Separator } from "@/components/ui/separator";
import General from "@/components/profile-menu/general";

function SettingsMain() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="w-full" />
      <General />
    </div>
  );
}

export default SettingsMain;
