import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
};

export function Button({ children, className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-300",
        variant === "primary" &&
          "bg-accent text-white shadow-[0_8px_32px_rgba(217,0,0,0.35)] hover:translate-y-[-1px] hover:shadow-[0_14px_40px_rgba(217,0,0,0.45)]",
        variant === "ghost" && "glass text-white hover:bg-white/20",
        variant === "outline" && "border border-white/35 bg-transparent text-white hover:border-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
