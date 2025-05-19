import React from "react";
import { cn } from "@/lib/utils";
import { SplashCursor } from "./splash-cursor";

interface GradientButtonProps {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  withSplash?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GradientButton({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  withSplash = true,
  onClick,
  disabled = false,
  type = "button",
  ...props
}: GradientButtonProps) {
  
  const getGradient = () => {
    switch (variant) {
      case "primary":
        return "from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white";
      case "secondary":
        return "from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white";
      case "accent":
        return "from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white";
      case "outline":
        return "bg-white/5 backdrop-blur-sm border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/30";
      default:
        return "from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white";
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-base";
      case "lg":
        return "px-6 py-3 text-lg";
      case "xl":
        return "px-8 py-4 text-xl";
      default:
        return "px-4 py-2 text-base";
    }
  };
  
  const buttonContent = (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        "font-medium rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95",
        variant !== "outline" && "bg-gradient-to-r",
        getGradient(),
        getSizeClasses(),
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
  
  if (withSplash && !disabled) {
    return (
      <SplashCursor color={variant === "outline" ? "rgba(var(--primary), 0.1)" : "rgba(255, 255, 255, 0.2)"}>
        {buttonContent}
      </SplashCursor>
    );
  }
  
  return buttonContent;
}