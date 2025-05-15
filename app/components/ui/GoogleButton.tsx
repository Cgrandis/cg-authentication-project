import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GoogleSignInButton = ({ role }: { role: "USER" | "PROVIDER" }) => {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: `/${role === "PROVIDER" ? "provider/dashboard" : "user/agenda"}`,
          state: role,
        })
      }
      className="w-full p-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
    >
      <FcGoogle size={20} />
      <span className="text-gray-700 font-medium">Entrar com Google</span>
    </button>
  );
};

export default GoogleSignInButton;
