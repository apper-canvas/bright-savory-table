import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    restaurant: [
      { label: "About Us", to: "/about" },
      { label: "Menu", to: "/menu" },
      { label: "Reservations", to: "/reservations" },
      { label: "Gallery", to: "/gallery" },
      { label: "Contact", to: "/contact" }
    ],
    services: [
      { label: "Dine In", to: "/reservations" },
      { label: "Takeaway", to: "/menu" },
      { label: "Delivery", to: "/menu" },
      { label: "Catering", to: "/contact" }
    ],
    legal: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
      { label: "Accessibility", to: "/accessibility" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "Youtube", icon: "Youtube", url: "https://youtube.com" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Utensils" size={24} className="text-white" />
              </div>
              <span className="font-display font-bold text-2xl">
                Savory Table
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-sm">
              Experience culinary excellence where every dish tells a story of passion, 
              tradition, and innovation. Join us for an unforgettable dining experience.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <ApperIcon name="MapPin" size={18} className="text-accent" />
                <span className="text-gray-300">123 Culinary Street, Food District, FC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Phone" size={18} className="text-accent" />
                <span className="text-gray-300">(555) 123-FOOD</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Mail" size={18} className="text-accent" />
                <span className="text-gray-300">hello@savorytable.com</span>
              </div>
            </div>
          </div>

          {/* Restaurant Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-accent">Restaurant</h3>
            <ul className="space-y-2">
              {footerLinks.restaurant.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-accent">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-accent">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-medium">Follow Us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <ApperIcon name={social.icon} size={18} />
              </a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-medium">We Accept:</span>
            <div className="flex items-center space-x-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300"
                  title={method.name}
                >
                  <ApperIcon name={method.icon} size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} Savory Table. All rights reserved.
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-accent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Stay Updated with Savory Table
              </h3>
              <p className="text-white/90">
                Get exclusive offers, new menu updates, and special event invitations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;