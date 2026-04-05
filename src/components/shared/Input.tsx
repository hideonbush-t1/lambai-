import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary",
            error ? "border-danger" : "border-gray-300",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };