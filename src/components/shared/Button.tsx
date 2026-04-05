import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
      danger: 'bg-danger text-white hover:bg-red-600',
    };

    return (
      <button
        ref={ref}
        className={cn('px-4 py-2 rounded-md font-medium transition-all active:scale-95', variants[variant], className)}
        {...props}
      />
    );
  }
);