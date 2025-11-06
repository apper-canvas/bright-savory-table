import React, { useState, useEffect } from "react";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { motion } from "framer-motion";
import { testimonialService } from "@/services/api/testimonialService";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadTestimonials = async () => {
    try {
      setError("");
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await testimonialService.getAll();
      setTestimonials(data);
    } catch (err) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.max(1, testimonials.length - 2));
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.max(1, testimonials.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + Math.max(1, testimonials.length - 2)) % Math.max(1, testimonials.length - 2));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading message="Loading customer reviews..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadTestimonials} />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-secondary mb-8">
              Customer Reviews
            </h2>
            <p className="text-gray-600">No reviews available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Are Saying
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real experiences from real people who have dined with us and loved every moment
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
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
                transform: `translateX(-${currentSlide * (100 / Math.min(testimonials.length, 3))}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.Id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.max(1, testimonials.length - 2) }, (_, index) => (
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

        {/* Overall Rating */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">4.9</div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    size={16}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Overall Rating</div>
            </div>
            
            <div className="w-px h-16 bg-gray-200"></div>
            
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-gray-500">Happy Reviews</div>
            </div>
            
            <div className="w-px h-16 bg-gray-200"></div>
            
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-gray-500">Recommend Us</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;