import LoginForm from "@/modules/auth/LoginForm";
import GridGradientBg from "@/modules/common/GridGradientBg";

export default async function LoginPage() {
  return (
    <main className="relative mx-auto overflow-x-hidden">
      <GridGradientBg className="from-emerald-300 dark:from-emerald-950" />
      <LoginForm />
    </main>
  );
}
