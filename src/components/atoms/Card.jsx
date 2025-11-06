import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, variant = "default", hover = false, children, ...props }, ref) => {
  const baseStyles = "bg-surface rounded-xl transition-all duration-200";
  
  const variants = {
    default: "shadow-md border border-gray-100",
    elevated: "shadow-lg border border-gray-100",
    outlined: "border-2 border-gray-200",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
  };
  
  const hoverStyles = hover ? "hover:-translate-y-1 hover:shadow-xl card-lift cursor-pointer" : "";
  
  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;