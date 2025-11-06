import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="ChefHat" size={64} className="text-primary" />
          </div>
          <div className="text-6xl sm:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
            404
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-secondary mb-4">
          Oops! This Dish Isn't On Our Menu
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          It looks like the page you're looking for has been moved, deleted, or doesn't exist. 
          Don't worry though—we have plenty of delicious alternatives waiting for you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            onClick={() => window.location.href = "/"}
          >
            <ApperIcon name="Home" size={20} className="mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = "/menu"}
          >
            <ApperIcon name="Utensils" size={20} className="mr-2" />
            Browse Menu
          </Button>
          
          <Button 
            variant="ghost"
            size="lg"
            onClick={() => window.location.href = "/contact"}
          >
            <ApperIcon name="MessageCircle" size={20} className="mr-2" />
            Contact Us
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-surface rounded-2xl p-6">
          <h3 className="font-display font-semibold text-secondary mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="/menu" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Utensils" size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary group-hover:text-primary transition-colors duration-200">
                  Our Menu
                </p>
                <p className="text-sm text-gray-500">Discover our signature dishes</p>
              </div>
            </a>
            
            <a 
              href="/reservations" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Calendar" size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary group-hover:text-primary transition-colors duration-200">
                  Reservations
                </p>
                <p className="text-sm text-gray-500">Book your perfect table</p>
              </div>
            </a>
            
            <a 
              href="/about" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Heart" size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary group-hover:text-primary transition-colors duration-200">
                  About Us
                </p>
                <p className="text-sm text-gray-500">Our culinary story</p>
              </div>
            </a>
            
            <a 
              href="/gallery" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Image" size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary group-hover:text-primary transition-colors duration-200">
                  Gallery
                </p>
                <p className="text-sm text-gray-500">Visual feast of our creations</p>
              </div>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 border border-primary/20 rounded-full animate-pulse hidden lg:block" />
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-pulse hidden lg:block" />
      </motion.div>
    </div>
  );
};

export default NotFound;