"use client";

import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React, { useRef } from "react";

export type FormSectionProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

const inputBase = "w-full p-3 border border-gray-300 rounded-lg";

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
      <input {...register("name")} placeholder="Nome" className={inputBase} />
      <input {...register("email")} disabled placeholder="Email" className={inputBase} />
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
      <input {...register("city")} placeholder="Cidade" className={inputBase} />
      <input {...register("country")} placeholder="País" className={inputBase} />
      <textarea
        {...register("bio")}
        ref={bioRef}
        placeholder="Biografia"
        className={`${inputBase} overflow-hidden resize-none`}
        onInput={() => autoResize(bioRef)}
        rows={1}
      />
      <textarea
        {...register("specialties")}
        ref={specialtiesRef}
        placeholder="Especialidades (separadas por vírgula)"
        className={`${inputBase} overflow-hidden resize-none`}
        onInput={() => autoResize(specialtiesRef)}
        rows={1}
      />
      <input {...register("linkedin")} placeholder="LinkedIn" className={inputBase} />
      <input {...register("instagramLink")} placeholder="Instagram" className={inputBase} />
    </>
  );
};

export default FormSection;
