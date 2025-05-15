import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RedirectByRolePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/login/prestadordeservico_usuario");
  }

  const role = session.user.role;

  if (role === "ADMIN") {
    return redirect("/admin/dashboard");
  }

  if (role === "PROVIDER") {
    return redirect("/provider/dashboard");
  }

  if (role === "USER") {
    return redirect("/user/agenda");
  }

  return redirect("/");
}
