import NextAuth, { DefaultSession, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "USER" | "PROVIDER" | "ADMIN";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "PROVIDER" | "ADMIN";
  }
}
