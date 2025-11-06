import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Visit Us",
      details: ["123 Culinary Street", "Food District, FC 12345"],
      action: "Get Directions"
    },
    {
      icon: "Phone",
      title: "Call Us",
      details: ["(555) 123-FOOD", "Mon-Sun: 5:00 PM - 11:00 PM"],
      action: "Call Now"
    },
    {
      icon: "Mail",
      title: "Email Us",
      details: ["hello@savorytable.com", "reservations@savorytable.com"],
      action: "Send Email"
    },
    {
      icon: "Clock",
      title: "Hours",
      details: ["Mon-Thu: 5:00 PM - 11:00 PM", "Fri-Sat: 5:00 PM - 12:00 AM", "Sun: 5:00 PM - 10:00 PM"],
      action: "View Menu"
    }
  ];

  const faqItems = [
    {
      question: "Do you take reservations?",
      answer: "Yes! We highly recommend making reservations, especially for dinner service and weekends. You can book online through our reservation system or call us directly."
    },
    {
      question: "Do you offer catering services?",
      answer: "Absolutely! We provide full-service catering for events of all sizes, from intimate gatherings to large corporate events. Contact us for a custom quote."
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer: "Yes, we can accommodate most dietary restrictions including vegetarian, vegan, gluten-free, and various allergies. Please inform us when making your reservation."
    },
    {
      question: "Do you offer private dining?",
      answer: "We have a private dining room that can accommodate up to 20 guests. Perfect for special celebrations, business dinners, or intimate gatherings."
    },
    {
      question: "Is there parking available?",
      answer: "We offer complimentary valet parking for our guests, and there's also street parking and a public garage within two blocks of the restaurant."
    },
    {
      question: "Do you have a dress code?",
      answer: "We maintain a smart casual dress code. We ask that guests avoid beachwear, athletic wear, or overly casual attire to maintain our elegant atmosphere."
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 5000
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

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
            Get In
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions, feedback, or want to discuss 
            catering options, our team is here to help create exceptional experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required
                    placeholder="Enter your full name"
                  />

                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number (Optional)"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />

                  <FormField
                    label="Subject"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    error={errors.subject}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 resize-none ${
                      errors.message 
                        ? "border-error focus:border-error focus:ring-error/20" 
                        : "border-gray-200 focus:border-primary focus:ring-primary/20"
                    }`}
                  />
                  {errors.message && <p className="text-sm text-error">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={info.icon} size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-secondary mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 mb-3">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        {info.action}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="MapPin" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-secondary mb-2">
                  Find Us Here
                </h3>
                <p className="text-gray-600">
                  123 Culinary Street, Food District, FC 12345
                </p>
                <Button className="mt-4">
                  <ApperIcon name="Navigation" size={16} className="mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about dining with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 h-full">
                  <h3 className="font-display font-semibold text-secondary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;