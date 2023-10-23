import SSRRedirect from "@/modules/auth/common/ssrRedirect";
import SupertokensWrapper from "@/modules/auth/common/supertokensWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupertokensWrapper>
      <SSRRedirect from="DASHBOARD">{children}</SSRRedirect>
    </SupertokensWrapper>
  );
}
