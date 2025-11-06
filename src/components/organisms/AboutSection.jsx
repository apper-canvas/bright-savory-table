import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const AboutSection = () => {
  const achievements = [
    { number: "15+", label: "Years of Excellence", icon: "Award" },
    { number: "200+", label: "Signature Dishes", icon: "Utensils" },
    { number: "50K+", label: "Happy Customers", icon: "Users" },
    { number: "98%", label: "Satisfaction Rate", icon: "Star" }
  ];

  const values = [
    {
      icon: "Heart",
      title: "Passion",
      description: "Every dish is prepared with love and dedication to culinary excellence"
    },
    {
      icon: "Leaf",
      title: "Fresh Ingredients",
      description: "We source only the finest, locally-sourced ingredients for optimal flavor"
    },
    {
      icon: "Users",
      title: "Community",
      description: "Building connections through shared meals and memorable experiences"
    },
    {
      icon: "Award",
      title: "Excellence",
      description: "Committed to delivering exceptional service and unforgettable dining"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-secondary mb-6">
              Our Story of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Culinary Passion
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2008, Savory Table began as a dream to create a place where 
              exceptional food meets warm hospitality. Our journey started in a small 
              kitchen with a simple belief: that great food brings people together and 
              creates lasting memories.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, we continue to honor that vision by combining traditional cooking 
              techniques with innovative flavors, using only the finest locally-sourced 
              ingredients to craft dishes that celebrate both heritage and creativity.
            </p>

            {/* Mission Statement */}
            <Card className="p-6 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent">
              <h3 className="text-xl font-display font-semibold text-secondary mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 italic">
                "To create extraordinary dining experiences that nourish not just the body, 
                but the soul, bringing communities together through the universal language of great food."
              </p>
            </Card>
          </motion.div>

          {/* Chef Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center">
              <div className="relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=384&q=80"
                  alt="Chef Maria Rodriguez"
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <ApperIcon name="ChefHat" size={20} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-secondary mb-2">
                Chef Maria Rodriguez
              </h3>
              <p className="text-accent font-medium mb-4">Executive Chef & Founder</p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                With over 20 years of culinary experience across three continents, 
                Chef Maria brings a unique fusion of traditional techniques and 
                modern innovation to every dish at Savory Table.
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Award" size={16} className="text-accent" />
                  <span>James Beard Nominee</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" size={16} className="text-accent" />
                  <span>Michelin Trained</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div 
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ApperIcon name={achievement.icon} size={24} className="text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2 counter">
                {achievement.number}
              </div>
              <div className="text-gray-600 font-medium">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from ingredient selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={value.icon} size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-display font-semibold text-secondary mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;