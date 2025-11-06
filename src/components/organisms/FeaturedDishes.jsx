import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DishCard from "@/components/molecules/DishCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { motion } from "framer-motion";
import { dishService } from "@/services/api/dishService";
import { toast } from "react-toastify";

const FeaturedDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useOutletContext();

  const loadFeaturedDishes = async () => {
    try {
      setError("");
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const allDishes = await dishService.getAll();
      const featuredDishes = allDishes.filter(dish => dish.featured);
      setDishes(featuredDishes);
    } catch (err) {
      setError(err.message || "Failed to load featured dishes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedDishes();
  }, []);

  useEffect(() => {
    if (dishes.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.max(1, dishes.length - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [dishes.length]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000
    });
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.max(1, dishes.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + Math.max(1, dishes.length - 2)) % Math.max(1, dishes.length - 2));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading message="Loading our signature dishes..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadFeaturedDishes} />
        </div>
      </section>
    );
  }

  if (dishes.length === 0) {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-secondary mb-8">
              Featured Dishes
            </h2>
            <p className="text-gray-600">No featured dishes available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Signature
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Featured Dishes
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our chef's most celebrated creations, each dish crafted with passion and the finest ingredients
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-secondary hover:text-primary hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-secondary hover:text-primary hover:shadow-xl transition-all duration-200"
          >
            <ApperIcon name="ChevronRight" size={20} />
          </button>

          {/* Slides */}
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / Math.min(dishes.length, 3))}%)`
              }}
            >
              {dishes.map((dish, index) => (
                <motion.div
                  key={dish.Id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DishCard dish={dish} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.max(1, dishes.length - 2) }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button size="lg" onClick={() => window.location.href = "/menu"}>
            <ApperIcon name="Utensils" size={20} className="mr-2" />
            View Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDishes;