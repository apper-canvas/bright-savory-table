import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

const NavLink = ({ to, children, className, mobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  
  const baseStyles = mobile 
    ? "block px-4 py-3 text-lg font-medium transition-colors duration-200"
    : "px-4 py-2 font-medium transition-colors duration-200 relative";
    
  const activeStyles = isActive
    ? mobile 
      ? "text-primary bg-primary/10 border-r-4 border-primary"
      : "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
    : mobile
      ? "text-secondary hover:text-primary hover:bg-primary/5"
      : "text-secondary hover:text-primary hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-primary/50 hover:after:rounded-full";
  
  return (
    <Link
      to={to}
      className={cn(baseStyles, activeStyles, className)}
    >
      {children}
    </Link>
  );
};

export default NavLink;