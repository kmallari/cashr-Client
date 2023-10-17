import SupertokesWrapper from "@/modules/auth/common/supertokesWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SupertokesWrapper>{children}</SupertokesWrapper>;
}
