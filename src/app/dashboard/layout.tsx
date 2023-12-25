import SSRRouteGuard from "@/modules/auth/common/ssrRouteGuard";
import SupertokensWrapper from "@/modules/auth/common/supertokensWrapper";
import SidebarNav from "@/modules/common/sidebarNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNavItems = [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "User",
      href: "/dashboard/user",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ];
  
  return (
    <SupertokensWrapper>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">
            <SSRRouteGuard from="DASHBOARD">{children}</SSRRouteGuard>
          </div>
        </div>
      </div>
    </SupertokensWrapper>
  );
}
