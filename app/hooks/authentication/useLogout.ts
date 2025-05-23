import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  console.log(`Toast (${type}): ${message}`);

};

interface UseLogoutResult {
  loading: boolean;
  handleLogout: () => Promise<void>;
}

export const useLogout = (): UseLogoutResult => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    setLoading(true);
    try {
      let callbackUrl = "/login/prestadordeservico_usuario";

      if (status === "authenticated" && session?.user?.role === "ADMIN") {
        callbackUrl = "/login/administrador";
      }

      await signOut({
        redirect: true,
        callbackUrl: callbackUrl,
      });

      showToast("Logout realizado com sucesso!", 'success');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showToast("Erro ao fazer logout. Tente novamente.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogout };
};