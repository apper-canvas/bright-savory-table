import React from "react";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  className,
  rows,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
{type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none",
            error ? "border-error focus:border-error focus:ring-error/20" : "",
            "text-secondary placeholder-gray-400"
          )}
          {...props}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "border-error focus:border-error focus:ring-error/20" : ""}
          {...props}
        />
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;