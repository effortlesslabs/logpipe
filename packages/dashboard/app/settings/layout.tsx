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

function SettingsLayout({ children }: SettingsSidebarProps) {
  return (
    <Layouts>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={items} />
          </aside>
          <div className="flex w-2/3">{children}</div>
        </div>
      </div>
    </Layouts>
  );
}

export default SettingsLayout;
