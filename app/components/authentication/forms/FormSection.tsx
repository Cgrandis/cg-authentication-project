"use client";

import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRef } from "react";
import FormInput from "@/app/components/authentication/shared/FormInput";

export type FormSectionProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

const FormSection = ({ register, watch, setValue }: FormSectionProps) => {
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const specialtiesRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    const textarea = ref.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <FormInput value={""} label="Nome" {...register("name")} />
      <FormInput value={""} label="Email" disabled {...register("email")} />

      <div className="space-y-1">
        <label className="form-label">Telefone</label>
        <PhoneInput
          country="br"
          value={watch("contactNumber")}
          onChange={(val) => setValue("contactNumber", val)}
          inputStyle={{
            width: "100%",
            padding: "14px",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
          }}
          specialLabel=""
        />
      </div>

      <FormInput value={""} label="Cidade" {...register("city")} />
      <FormInput value={""} label="País" {...register("country")} />

      <div className="space-y-1">
        <label className="form-label">Biografia</label>
        <textarea
          {...register("bio")}
          ref={bioRef}
          placeholder="Biografia"
          className="form-input overflow-hidden resize-none"
          onInput={() => autoResize(bioRef)}
          rows={1}
        />
      </div>

      <div className="space-y-1">
        <label className="form-label">Especialidades</label>
        <textarea
          {...register("specialties")}
          ref={specialtiesRef}
          placeholder="Especialidades (separadas por vírgula)"
          className="form-input overflow-hidden resize-none"
          onInput={() => autoResize(specialtiesRef)}
          rows={1}
        />
      </div>

      <FormInput value={""} label="LinkedIn" {...register("linkedin")} />
      <FormInput value={""} label="Instagram" {...register("instagramLink")} />
    </>
  );
};

export default FormSection;
