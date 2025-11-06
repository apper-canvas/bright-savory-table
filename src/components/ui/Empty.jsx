import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found",
  description = "Looks like this section is empty. Let's add some delicious options!",
  actionText = "Explore Menu",
  onAction,
  icon = "Utensils"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-secondary mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ApperIcon name="ArrowRight" size={16} />
          {actionText}
        </Button>
      )}
      
      <div className="mt-8 grid grid-cols-3 gap-4 opacity-20">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default Empty;