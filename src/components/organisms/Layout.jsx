import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";

const Layout = () => {
const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [serviceType, setServiceType] = useState('delivery'); // delivery, pickup, dine-in

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.dishId === item.dishId);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.dishId === item.dishId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const updateCartItemQuantity = (dishId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.dishId === dishId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.dishId !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      
      <main className="pt-16">
<Outlet context={{
          cartItems,
          addToCart,
          updateCartItemQuantity,
          removeFromCart,
          clearCart,
          setIsCartOpen,
          serviceType,
          setServiceType
        }} />
      </main>
      
      <Footer />
      
<CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        serviceType={serviceType}
        onServiceTypeChange={setServiceType}
      />
    </div>
  );
};

export default Layout;