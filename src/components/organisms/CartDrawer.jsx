import React from "react";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onClear 
}) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    console.log("Proceeding to checkout with:", { items, total });
    // Here you would typically navigate to checkout or open checkout modal
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-display font-semibold text-secondary">
            Your Order ({items.length} {items.length === 1 ? "item" : "items"})
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-secondary transition-colors duration-200"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ApperIcon name="ShoppingCart" size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious dishes to get started!</p>
              <Button onClick={onClose} variant="primary">
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.dishId}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-secondary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-secondary">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-secondary">
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-gray-500">
                  Free delivery on orders over $50
                </p>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-secondary">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button 
                onClick={onClear}
                variant="ghost"
                className="w-full text-gray-500 hover:text-error hover:bg-error/10"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;