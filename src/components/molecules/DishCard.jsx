import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DishCard = ({ dish, onAddToCart, className }) => {
  const handleAddToCart = () => {
    onAddToCart({
      dishId: dish.Id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      image: dish.image
    });
  };

  return (
    <Card hover className={cn("overflow-hidden group", className)}>
      <div className="relative overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {dish.featured && (
          <Badge 
            variant="accent" 
            className="absolute top-3 left-3 shadow-sm"
          >
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1">
          {dish.tags?.map((tag, index) => (
            <Badge key={index} variant="default" size="sm" className="bg-white/90 text-secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-lg text-secondary group-hover:text-primary transition-colors duration-200">
            {dish.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-accent">
            <ApperIcon name="Star" size={16} className="fill-current" />
            <span>{dish.rating || 4.5}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {dish.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-display font-bold text-primary">
            ${dish.price.toFixed(2)}
          </span>
          {dish.prepTime && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ApperIcon name="Clock" size={16} />
              <span>{dish.prepTime}</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full group/button"
          disabled={!dish.available}
        >
          <ApperIcon 
            name="Plus" 
            size={16} 
            className="mr-2 transition-transform duration-200 group-hover/button:rotate-90" 
          />
          {dish.available ? "Add to Cart" : "Unavailable"}
        </Button>
      </div>
    </Card>
  );
};

export default DishCard;