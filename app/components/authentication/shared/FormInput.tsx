import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = "text", ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;

    return (
      <div className="relative">
        <label className="form-label">{label}</label>
        <input
          ref={ref}
          type={actualType}
          className="form-input"
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

export default FormInput;
