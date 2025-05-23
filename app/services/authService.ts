import { signIn, getSession } from "next-auth/react";
import { RegisterSchema } from "@/app/lib/validations/authSchema";

export const registerUser = async (
  role: "USER" | "PROVIDER",
  data: Pick<RegisterSchema, "name" | "email" | "password">
) => {
  const endpoint =
    role === "PROVIDER"
      ? "/api/auth/register/registerProvider"
      : "/api/auth/register/registerUser";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Erro ao registrar.");
  return json;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ role?: string }> => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!res?.ok) throw new Error("Credenciais inválidas");

  const session = await getSession();
  return { role: session?.user?.role };
};
