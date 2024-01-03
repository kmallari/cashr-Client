import RouteGuard, { Paths } from "@/modules/auth/common/RouteGuard";
import SupertokensWrapper from "@/modules/auth/common/SupertokensWrapper";
import DarkModeToggle from "@/modules/common/DarkModeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupertokensWrapper>
      <RouteGuard from={Paths.Auth}>
        {children}
        <div className="fixed right-4 top-4">
          <DarkModeToggle />
        </div>
      </RouteGuard>
    </SupertokensWrapper>
  );
}
