import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemove(item.dishId);
    } else {
      onUpdateQuantity(item.dishId, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-surface rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-secondary truncate">{item.name}</h4>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0 text-lg"
        >
          <ApperIcon name="Minus" size={16} />
        </Button>
        
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0 text-lg"
        >
          <ApperIcon name="Plus" size={16} />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.dishId)}
        className="w-8 h-8 p-0 text-error hover:bg-error/10"
      >
        <ApperIcon name="X" size={16} />
      </Button>
    </div>
  );
};

export default CartItem;