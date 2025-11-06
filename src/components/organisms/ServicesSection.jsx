import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: "Utensils",
      title: "Dine In",
      description: "Experience our elegant ambiance with exceptional table service and curated dining atmosphere.",
      action: "Book a Table",
      onClick: () => navigate("/reservations"),
      gradient: "from-primary to-accent"
    },
    {
      icon: "ShoppingBag",
      title: "Takeaway",
      description: "Enjoy our signature dishes from the comfort of your home with quick and efficient pickup.",
      action: "Order Now",
      onClick: () => navigate("/menu"),
      gradient: "from-accent to-orange-500"
    },
    {
      icon: "Truck",
      title: "Delivery",
      description: "Fresh, hot meals delivered straight to your doorstep with our reliable delivery service.",
      action: "Start Delivery",
      onClick: () => navigate("/menu"),
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "Users",
      title: "Catering",
      description: "Elevate your special events with our premium catering services for any occasion.",
      action: "Learn More",
      onClick: () => navigate("/contact"),
      gradient: "from-red-500 to-primary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How Would You Like to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Enjoy Our Food?
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose from our convenient service options designed to fit your lifestyle and preferences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                hover 
                className="p-8 text-center h-full flex flex-col relative overflow-hidden group"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={service.icon} size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA Button */}
                <button
                  onClick={service.onClick}
                  className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${service.gradient} text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95`}
                >
                  {service.action}
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div 
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: "15+", label: "Years of Excellence", icon: "Award" },
            { number: "200+", label: "Signature Dishes", icon: "Utensils" },
            { number: "50K+", label: "Happy Customers", icon: "Users" },
            { number: "98%", label: "Satisfaction Rate", icon: "Star" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name={stat.icon} size={20} className="text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2 counter">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;