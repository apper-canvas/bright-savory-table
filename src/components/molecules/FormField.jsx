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
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "border-error focus:border-error focus:ring-error/20" : ""}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;