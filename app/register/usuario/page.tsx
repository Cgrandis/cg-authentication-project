"use client";
import RegisterForm from "@/app/components/authentication/forms/RegisterForm";

export default function RegisterUserPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F7F9FC] to-[#DCE3F1]">
      <RegisterForm role="USER" />
    </div>
  );
}
