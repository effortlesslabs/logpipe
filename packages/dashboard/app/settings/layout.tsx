import Layouts from "@/components/layouts";
import { SidebarNav } from "@/components/settings-sidebar";
import { Separator } from "@/components/ui/separator";

const items = [
  { href: "/settings", title: "General" },
  { href: "/settings/api-keys", title: "ApiKeys" },
];

interface SettingsSidebarProps {
  children: React.ReactNode;
}

const title = "Settings";
const description = "Manage your account settings and set e-mail preferences.";

function SettingsLayout({ children }: SettingsSidebarProps) {
  return (
    <Layouts>
      <div className="h-screen flex items-center flex-col p-10">
        <div className="flex flex-col w-3/4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h6 className="text-muted-foreground">{description}</h6>
          <Separator className="my-6 w-full" />
          <div className="w-full flex">
            <aside className="w-1/5">
              <SidebarNav items={items} />
            </aside>
            <div className="flex w-full">{children}</div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default SettingsLayout;
