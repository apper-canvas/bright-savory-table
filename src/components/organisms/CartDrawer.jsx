import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Menu from "@/components/pages/Menu";
import FormField from "@/components/molecules/FormField";
import CartItem from "@/components/molecules/CartItem";
import { cn } from "@/utils/cn";

// Mock delivery areas and pricing
const DELIVERY_AREAS = [
  {
    name: 'Downtown',
    zipCodes: ['90210', '90211', '90212'],
    fee: 3.99,
    estimatedTime: '25-35 min'
  },
  {
    name: 'Westside',
    zipCodes: ['10001', '10002', '10003'],
    fee: 4.99,
    estimatedTime: '30-40 min'
  },
  {
    name: 'Hollywood',
    zipCodes: ['60601', '60602'],
    fee: 2.99,
    estimatedTime: '20-30 min'
  }
];

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onClear,
  serviceType,
  onServiceTypeChange
}) => {
  // State for delivery address form
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [areaVerification, setAreaVerification] = useState({
    isVerifying: false,
    isValid: false,
    message: '',
    deliveryFee: 0,
    estimatedTime: ''
  });

  const [formErrors, setFormErrors] = useState({});
// Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = serviceType === 'delivery' ? areaVerification.deliveryFee : 0;
  const total = subtotal + tax + deliveryFee;

  // Simulate area verification and fee calculation
  const verifyDeliveryArea = async (address) => {
    const { street, city, zipCode } = address;
    
    if (!street.trim() || !city.trim() || !zipCode.trim()) {
      setAreaVerification({
        isVerifying: false,
        isValid: false,
        message: '',
        deliveryFee: 0,
        estimatedTime: ''
      });
      return;
    }

    setAreaVerification(prev => ({ ...prev, isVerifying: true }));

    // Simulate API call delay
    setTimeout(() => {
      // Mock area verification logic
      const coverageAreas = {
        '90210': { fee: 3.99, time: '25-35 min', zone: 'Premium' },
        '10001': { fee: 4.99, time: '30-40 min', zone: 'Standard' },
        '60601': { fee: 2.99, time: '20-30 min', zone: 'Express' },
        '33101': { fee: 5.99, time: '35-45 min', zone: 'Extended' },
        '94102': { fee: 4.99, time: '25-35 min', zone: 'Standard' }
      };

      const areaInfo = coverageAreas[zipCode];
      
      if (areaInfo) {
        // Apply free delivery if order over $50
        const finalFee = subtotal > 50 ? 0 : areaInfo.fee;
        
        setAreaVerification({
          isVerifying: false,
          isValid: true,
          message: `Delivery available to ${city} (${areaInfo.zone} zone)`,
          deliveryFee: finalFee,
          estimatedTime: areaInfo.time
        });
      } else {
        setAreaVerification({
          isVerifying: false,
          isValid: false,
          message: 'Sorry, we don\'t deliver to this area yet.',
          deliveryFee: 0,
          estimatedTime: ''
        });
      }
    }, 1500);
};

  // Validate delivery form
  const validateDeliveryForm = () => {
    const errors = {};
    
    if (!deliveryAddress.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!deliveryAddress.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!deliveryAddress.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(deliveryAddress.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle address field changes
  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Verify area when address changes
  useEffect(() => {
    if (serviceType === 'delivery') {
      const timeoutId = setTimeout(() => {
        verifyDeliveryArea(deliveryAddress);
      }, 800); // Debounce API calls
      
      return () => clearTimeout(timeoutId);
    }
  }, [deliveryAddress.street, deliveryAddress.city, deliveryAddress.zipCode, serviceType, subtotal]);

  // Reset delivery data when switching service types
  useEffect(() => {
    if (serviceType !== 'delivery') {
      setDeliveryAddress({ street: '', city: '', zipCode: '', notes: '' });
      setAreaVerification({
        isVerifying: false,
        isValid: false,
        message: '',
        deliveryFee: 0,
        estimatedTime: ''
      });
      setFormErrors({});
    }
  }, [serviceType]);

  const handleCheckout = () => {
    // Validate delivery form if delivery is selected
    if (serviceType === 'delivery') {
      if (!validateDeliveryForm()) {
        toast.error('Please complete the delivery address form');
        return;
      }
      
      if (!areaVerification.isValid) {
        toast.error('Please enter a valid delivery address in our service area');
        return;
      }
    }

    const orderData = {
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      serviceType
    };

    if (serviceType === 'delivery') {
      orderData.deliveryAddress = deliveryAddress;
      orderData.estimatedDeliveryTime = areaVerification.estimatedTime;
    }

    console.log("Proceeding to checkout with:", orderData);
    toast.success(`Order confirmed for ${serviceType}!`);
    // Here you would typically navigate to checkout or open checkout modal
  };

  return (
    <>
      {/* Backdrop */}
<div 
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center p-4",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Cart Modal */}
      <div 
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className={cn(
            "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto transform transition-all duration-300 ease-out",
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          )}
onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <ApperIcon name="ShoppingCart" size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-secondary">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
<div className="flex-1 overflow-y-auto">
            {items.length === 0 && (
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
            )}

            {/* Service Type Selection */}
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Type</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceType"
                    value="delivery"
                    checked={serviceType === 'delivery'}
                    onChange={(e) => onServiceTypeChange(e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Delivery</div>
                    <div className="text-xs text-gray-500">
                      {subtotal > 50 ? 'Free delivery on orders over $50' : '$5.99 delivery fee'}
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceType"
                    value="pickup"
                    checked={serviceType === 'pickup'}
                    onChange={(e) => onServiceTypeChange(e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Pickup</div>
                    <div className="text-xs text-gray-500">Ready in 15-20 minutes</div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceType"
                    value="dine-in"
                    checked={serviceType === 'dine-in'}
                    onChange={(e) => onServiceTypeChange(e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Dine-In</div>
                    <div className="text-xs text-gray-500">Reserve a table</div>
                  </div>
                </label>
              </div>
            </div>

            {items.length > 0 && (
          <>
            {/* Order Items Section */}
            <div className="border-t border-gray-200 p-6 space-y-4 bg-surface/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="ShoppingCart" size={18} className="text-primary" />
                  <h3 className="font-semibold text-secondary">Order Items</h3>
                </div>
                <span className="text-sm text-gray-500">{items.length} {items.length === 1 ? "item" : "items"}</span>
              </div>
              
              {/* Cart Items with Quantity Controls */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <CartItem
                    key={item.dishId}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>

            {/* Delivery Address Form */}
            {serviceType === 'delivery' && (
              <div className="border-t border-gray-200 p-6 space-y-4 bg-background/50">
                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name="MapPin" size={18} className="text-primary" />
                  <h3 className="font-semibold text-secondary">Delivery Address</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    label="Street Address"
                    id="street"
                    placeholder="123 Main Street, Apt 4B"
                    value={deliveryAddress.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    error={formErrors.street}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      label="City"
                      id="city"
                      placeholder="Los Angeles"
                      value={deliveryAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      error={formErrors.city}
                      required
                    />
                    
                    <FormField
                      label="ZIP Code"
                      id="zipCode"
                      placeholder="90210"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      error={formErrors.zipCode}
                      required
                      maxLength="10"
                    />
                  </div>
                  
                  <FormField
                    label="Delivery Notes (Optional)"
                    id="notes"
                    type="textarea"
                    placeholder="Building entrance, apartment instructions, etc."
                    value={deliveryAddress.notes}
                    onChange={(e) => handleAddressChange('notes', e.target.value)}
                    rows="2"
                  />
                </div>

                {/* Area Verification Status */}
                {areaVerification.isVerifying && (
                  <div className="flex items-center space-x-2 p-3 bg-info/10 rounded-lg border border-info/20">
                    <div className="animate-spin">
                      <ApperIcon name="Loader2" size={16} className="text-info" />
                    </div>
                    <span className="text-sm text-info">Verifying delivery area...</span>
                  </div>
                )}

                {areaVerification.message && !areaVerification.isVerifying && (
                  <div className={cn(
                    "p-3 rounded-lg border flex items-start space-x-2",
                    areaVerification.isValid
                      ? "bg-success/10 border-success/20"
                      : "bg-error/10 border-error/20"
                  )}>
                    <ApperIcon 
                      name={areaVerification.isValid ? "CheckCircle" : "AlertCircle"} 
                      size={16} 
                      className={areaVerification.isValid ? "text-success" : "text-error"}
                    />
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm",
                        areaVerification.isValid ? "text-success" : "text-error"
                      )}>
                        {areaVerification.message}
                      </p>
                      {areaVerification.isValid && areaVerification.estimatedTime && (
                        <p className="text-xs text-secondary mt-1">
                          <ApperIcon name="Clock" size={12} className="inline mr-1" />
                          Estimated delivery: {areaVerification.estimatedTime}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order Summary */}
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
                {serviceType === 'delivery' && (
                  <p className="text-xs text-gray-500">
                    {subtotal > 50 
                      ? "🎉 Free delivery on orders over $50!" 
                      : `Add $${(50 - subtotal).toFixed(2)} more for free delivery`
                    }
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
                  {serviceType === 'delivery' ? (
                    <>
                      Order for Delivery
                      {areaVerification.estimatedTime && (
                        <span className="block text-xs opacity-80">
                          {areaVerification.estimatedTime}
                        </span>
                      )}
                    </>
                  ) : serviceType === 'pickup' ? 'Order for Pickup' : 'Reserve & Order'}
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
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;