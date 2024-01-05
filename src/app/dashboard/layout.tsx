import { Suspense } from "react";

import RouteGuard, { Paths } from "@/modules/auth/common/RouteGuard";
import SupertokensWrapper from "@/modules/auth/common/SupertokensWrapper";
import HeaderNav from "@/modules/common/HeaderNav";
import SidebarNav from "@/modules/common/SidebarNav";

import Loading from "./loading";

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
      <Suspense fallback={<Loading />}>
        <RouteGuard from={Paths.Dashboard}>
          <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 space-y-4">
                <HeaderNav />
                {children}
              </div>
            </div>
          </div>
        </RouteGuard>
      </Suspense>
    </SupertokensWrapper>
  );
}
