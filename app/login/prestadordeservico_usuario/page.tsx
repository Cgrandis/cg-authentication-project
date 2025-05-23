import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "@/app/components/authentication/forms/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "USER") redirect("/user/agenda");
  if (session?.user?.role === "PROVIDER") redirect("/provider/dashboard");
  if (session?.user?.role === "ADMIN") redirect("/admin/dashboard");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F7F9FC] to-[#DCE3F1]">
      <LoginForm onSuccessRedirect="/user/agenda" />
    </div>
  );
}
