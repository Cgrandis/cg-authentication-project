"use client";

import LoginForm from "@/app/components/ui/LoginForm";

export default function LoginPrestadorOuUsuarioPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F7F9FC] to-[#DCE3F1]">
      <LoginForm onSuccessRedirect="/user/agenda" />
    </div>
  );
}
