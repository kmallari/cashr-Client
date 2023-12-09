import SSRRouteGuard from "@/modules/auth/common/ssrRouteGuard";
import SupertokensWrapper from "@/modules/auth/common/supertokensWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupertokensWrapper>
      <SSRRouteGuard from="AUTH">{children}</SSRRouteGuard>
    </SupertokensWrapper>
  );
}
