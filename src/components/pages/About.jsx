import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    {
      name: "Chef Maria Rodriguez",
      role: "Executive Chef & Founder",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=384&q=80",
      bio: "With over 20 years of culinary experience across three continents, Chef Maria brings innovative techniques and traditional flavors to every dish.",
      awards: ["James Beard Nominee", "Michelin Trained", "Culinary Institute Graduate"]
    },
    {
      name: "David Chen",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=384&q=80",
      bio: "David's passion for desserts has earned him recognition for his innovative pastry creations that blend French techniques with modern artistry.",
      awards: ["Best Pastry Chef 2022", "Culinary Arts Award", "Innovation in Desserts"]
    },
    {
      name: "Sofia Martinez",
      role: "Head Sommelier",
      image: "https://images.unsplash.com/photo-1494790108755-2616c667bc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=384&q=80",
      bio: "Sofia curates our extensive wine collection and creates perfect pairings that enhance the dining experience with her expert knowledge.",
      awards: ["Certified Sommelier", "Wine Specialist", "Beverage Director"]
    }
  ];

  const timeline = [
    {
      year: "2008",
      title: "The Beginning",
      description: "Chef Maria opened Savory Table with a vision to create exceptional dining experiences in a cozy 30-seat restaurant."
    },
    {
      year: "2012",
      title: "Recognition",
      description: "Received our first James Beard nomination and expanded to accommodate 80 guests with the addition of our wine cellar."
    },
    {
      year: "2016",
      title: "Innovation",
      description: "Launched our signature tasting menu and introduced the chef's table experience, becoming a local culinary destination."
    },
    {
      year: "2020",
      title: "Adaptation",
      description: "Successfully pivoted during the pandemic with takeout and delivery services while maintaining our quality standards."
    },
    {
      year: "2023",
      title: "Excellence",
      description: "Celebrating 15 years of culinary excellence with over 50,000 satisfied customers and numerous culinary awards."
    }
  ];

  const values = [
    {
      icon: "Heart",
      title: "Passion for Food",
      description: "Every dish is prepared with love, dedication, and an unwavering commitment to culinary excellence that you can taste in every bite."
    },
    {
      icon: "Leaf",
      title: "Fresh Ingredients",
      description: "We source only the finest, locally-grown ingredients from trusted farmers and suppliers to ensure optimal flavor and quality."
    },
    {
      icon: "Users",
      title: "Community Focus",
      description: "We believe in building connections through shared meals, supporting local producers, and creating memorable experiences."
    },
    {
      icon: "Award",
      title: "Pursuit of Excellence",
      description: "Our commitment to exceptional service, innovative cuisine, and attention to detail drives everything we do."
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-secondary mb-6">
            Our Story of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Culinary Passion
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, Savory Table has been more than just a restaurant—we're a place where 
            culinary artistry meets warm hospitality, creating unforgettable experiences one dish at a time.
          </p>
        </motion.div>

        {/* Hero Story Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant Interior"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-secondary">
              Where It All Began
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In 2008, Chef Maria Rodriguez opened Savory Table with a simple yet ambitious dream: 
              to create a restaurant where exceptional food meets genuine hospitality. Starting with 
              just 30 seats and a small team, we've grown into a beloved culinary destination while 
              never losing sight of our core values.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey has been one of continuous evolution, always staying true to our commitment 
              to quality ingredients, innovative techniques, and creating memorable experiences for 
              every guest who walks through our doors.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-primary">15+</div>
                <div className="text-sm text-gray-500">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-primary">50K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary mb-4">
              Our Journey Through the Years
            </h2>
            <p className="text-lg text-gray-600">
              Milestones that shaped Savory Table into what it is today
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`w-full max-w-md p-6 ${index % 2 === 0 ? "mr-6" : "ml-6"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl font-display font-bold text-primary">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-display font-semibold text-secondary">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {event.description}
                    </p>
                  </Card>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary mb-4">
              Meet Our Culinary Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate professionals who bring our vision to life every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 text-center h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-lg"
                  />
                  <h3 className="text-xl font-display font-bold text-secondary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    {member.awards.map((award, awardIndex) => (
                      <div 
                        key={awardIndex}
                        className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full mr-2"
                      >
                        {award}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do, from ingredient selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={value.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-secondary mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Card className="bg-gradient-to-r from-primary to-accent text-white p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Experience Our Story
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We invite you to become part of our ongoing story. Join us for a meal 
              that celebrates the passion, craftsmanship, and community that define Savory Table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = "/reservations"}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <ApperIcon name="Calendar" size={20} className="inline mr-2" />
                Make a Reservation
              </button>
              <button 
                onClick={() => window.location.href = "/menu"}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
              >
                <ApperIcon name="Utensils" size={20} className="inline mr-2" />
                View Our Menu
              </button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default About;