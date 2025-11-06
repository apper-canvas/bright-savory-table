import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed parallax"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight">
            Experience
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Culinary Excellence
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Where every dish tells a story of passion, tradition, and innovation. 
            Discover flavors that will transport you to culinary paradise.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              size="lg"
              onClick={() => navigate("/menu")}
              className="glass-morphism text-white border-white/30 hover:bg-white/30 min-w-[160px]"
            >
              Order Now
            </Button>
            
            <Button
              size="lg"
              variant="accent"
              onClick={() => navigate("/reservations")}
              className="min-w-[160px]"
            >
              Book a Table
            </Button>
            
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate("/menu")}
              className="text-white hover:bg-white/20 min-w-[160px]"
            >
              View Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-accent/30 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-16 h-16 border border-primary/30 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 right-8 w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-pulse hidden lg:block" />
    </section>
  );
};

export default HeroSection;