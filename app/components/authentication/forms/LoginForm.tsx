"use client";

import FormInput from "@/app/components/authentication/shared/FormInput";
import { useLoginForm } from "@/app/hooks/authentication/useLoginForm";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm({ onSuccessRedirect = "/" }: { onSuccessRedirect?: string }) {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
    handleGoogleLogin,
  } = useLoginForm(onSuccessRedirect);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-section" noValidate>
      <h2 className="form-title mb-8">Bem-vindo de volta</h2>

      <div className="space-y-5">
        
        <div className="relative">
          <FormInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-busy={loading}
            id="email"
            disabled={loading}
            className={errors.email ? "form-input border-red-500 pr-10" : "form-input"}
            {...register("email")}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-3 top-[2.6rem]"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <FormInput
            label="Senha"
            type="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-required="true"
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-busy={loading}
            id="password"
            disabled={loading}
            className={errors.password ? "form-input border-red-500 pr-10" : "form-input"}
            {...register("password")}
          />
          <AnimatePresence>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-3 top-[2.6rem]"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                id="password-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="w-full py-3 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-[#334155] transition-all duration-300 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </motion.button>

        <div className="form-divider">
          <span>ou</span>
        </div>

        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          disabled={loading}
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 text-sm font-medium">Entrar com Google</span>
        </motion.button>
      </div>
    </form>
  );
}
