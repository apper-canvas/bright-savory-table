import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DishCard from "@/components/molecules/DishCard";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { motion } from "framer-motion";
import { dishService } from "@/services/api/dishService";
import { toast } from "react-toastify";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useOutletContext();

  const loadDishes = async () => {
    try {
      setError("");
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      const data = await dishService.getAll();
      setDishes(data);
    } catch (err) {
      setError(err.message || "Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const categories = ["All", ...new Set(dishes.map(dish => dish.category))];

  const filteredDishes = dishes
    .filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dish.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000
    });
  };

  if (loading) {
    return <Loading message="Loading our delicious menu..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDishes} />;
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-secondary mb-4">
            Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Signature Menu
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each prepared with passion and the finest ingredients
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <Input
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "primary" : "default"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Sort */}
            <div className="min-w-[200px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        {dishes.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600">
              Showing {filteredDishes.length} of {dishes.length} dishes
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>
        )}

        {/* Menu Grid */}
        {filteredDishes.length === 0 ? (
          <Empty
            title="No dishes found"
            description="Try adjusting your search or filter criteria to find what you're looking for."
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSortBy("name");
            }}
            icon="Search"
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 8) }}
              >
                <DishCard dish={dish} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredDishes.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-4">
                Ready to Order?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Add your favorite dishes to the cart and enjoy our premium dining experience 
                with delivery, pickup, or dine-in options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <ApperIcon name="Calendar" size={20} className="mr-2" />
                  Book a Table
                </Button>
                <Button 
                  variant="ghost"
                  size="lg"
                  className="text-white border-white hover:bg-white/20"
                >
                  <ApperIcon name="Phone" size={20} className="mr-2" />
                  Call to Order
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;