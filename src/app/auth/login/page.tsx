import LoginForm from "@/modules/auth/login";
import GridGradientBg from "@/modules/common/gridGradientBg";

export default async function LoginPage() {
  return (
    <>
      <main className="relative mx-auto overflow-x-hidden">
        <GridGradientBg className="from-emerald-300" />
        <LoginForm />
      </main>
    </>
  );
}
