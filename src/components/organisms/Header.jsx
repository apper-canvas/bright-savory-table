import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import NavLink from "@/components/molecules/NavLink";
import ApperIcon from "@/components/ApperIcon";
import CartDrawer from "@/components/organisms/CartDrawer";
import { cn } from "@/utils/cn";

const Header = ({ cartItemCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    // Mock cart data for demonstration
    {
      dishId: 1,
      name: "Grilled Salmon",
      price: 28.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
    },
    {
      dishId: 2,
      name: "Caesar Salad",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
    }
  ]);
  const [serviceType, setServiceType] = useState('pickup');
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

const handleCartClick = () => {
    setCartOpen(true);
  };

  // Cart management functions
  const handleUpdateQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(dishId);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.dishId === dishId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
    toast.success('Quantity updated');
  };

  const handleRemoveFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.dishId !== dishId));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const handleServiceTypeChange = (newServiceType) => {
    setServiceType(newServiceType);
    toast.success(`Switched to ${newServiceType}`);
  };

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/about", label: "About Us" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Utensils" size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-secondary group-hover:text-primary transition-colors duration-200">
                Savory Table
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={handleCartClick}
                className="relative p-2 text-secondary hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="ShoppingCart" size={24} />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="error" 
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs animate-bounce-in"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </button>
              
              <Button 
                variant="primary"
                size="sm"
                onClick={() => navigate("/reservations")}
              >
                Book Table
              </Button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={handleCartClick}
                className="relative p-2 text-secondary hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="error" 
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-[18px] h-4 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </button>
              
              <button
                onClick={toggleMenu}
                className="p-2 text-secondary hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name={isOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

{/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />
        
        <nav 
          className={cn(
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Utensils" size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-lg text-secondary">
                  Savory Table
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-secondary hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  mobile 
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Button 
                className="w-full"
                onClick={() => {
                  navigate("/reservations");
                  setIsOpen(false);
                }}
              >
                Book a Table
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        serviceType={serviceType}
        onServiceTypeChange={handleServiceTypeChange}
      />
    </>
  );
};

export default Header;