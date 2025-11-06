import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";
import { format, addDays, isAfter, isBefore, startOfDay } from "date-fns";
import { reservationService } from "@/services/api/reservationService";
import { toast } from "react-toastify";

const Reservations = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: "",
    customerName: "",
    phone: "",
    email: "",
    specialRequests: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
  ];

  const partySizes = Array.from({ length: 12 }, (_, i) => i + 1);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    if (!formData.partySize) newErrors.partySize = "Please select party size";
    if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    // Date validation
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = startOfDay(new Date());
      const maxDate = addDays(today, 60);
      
      if (isBefore(selectedDate, today)) {
        newErrors.date = "Cannot book for past dates";
      } else if (isAfter(selectedDate, maxDate)) {
        newErrors.date = "Bookings only available for the next 60 days";
      }
    }

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
      const reservationData = {
        ...formData,
        status: "confirmed"
      };
      
      await reservationService.create(reservationData);
      setSubmitted(true);
      toast.success("Reservation confirmed successfully!", {
        position: "top-right",
        autoClose: 5000
      });
    } catch (err) {
      toast.error("Failed to create reservation. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: "",
      time: "",
      partySize: "",
      customerName: "",
      phone: "",
      email: "",
      specialRequests: ""
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-background to-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4"
        >
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="CheckCircle" size={40} className="text-white" />
            </div>
            
            <h1 className="text-3xl font-display font-bold text-secondary mb-4">
              Reservation Confirmed!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you, {formData.customerName}! Your table for {formData.partySize} people 
              has been reserved for {format(new Date(formData.date), "EEEE, MMMM d, yyyy")} 
              at {formData.time}.
            </p>
            
            <div className="bg-surface rounded-lg p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-secondary mb-4">Reservation Details:</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Date:</strong> {format(new Date(formData.date), "EEEE, MMMM d, yyyy")}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Party Size:</strong> {formData.partySize} people</p>
                <p><strong>Name:</strong> {formData.customerName}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                {formData.specialRequests && (
                  <p><strong>Special Requests:</strong> {formData.specialRequests}</p>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-8">
              A confirmation email has been sent to {formData.email}. 
              If you need to make changes, please call us at (555) 123-FOOD.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetForm} variant="primary">
                Make Another Reservation
              </Button>
              <Button onClick={() => window.location.href = "/"} variant="ghost">
                Back to Home
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-background to-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-secondary mb-4">
            Reserve Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Perfect Table
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your spot for an unforgettable dining experience at Savory Table
          </p>
        </motion.div>

        {/* Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Select Date"
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  error={errors.date}
                  required
                  min={format(new Date(), "yyyy-MM-dd")}
                  max={format(addDays(new Date(), 60), "yyyy-MM-dd")}
                />

<div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary">
                    Select Time <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors duration-200 bg-white text-secondary"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="text-sm text-error">{errors.time}</p>}
                </div>
              </div>

              {/* Party Size */}
<div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">
                  Party Size <span className="text-error">*</span>
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => handleInputChange("partySize", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors duration-200 bg-white text-secondary"
                >
                  <option value="">Select party size</option>
                  {partySizes.map(size => (
                    <option key={size} value={size.toString()}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
                {errors.partySize && <p className="text-sm text-error">{errors.partySize}</p>}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  error={errors.customerName}
                  required
                  placeholder="Enter your full name"
                />

                <FormField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  error={errors.phone}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

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

              {/* Special Requests */}
              <div className="space-y-2">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-secondary">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Any dietary restrictions, seating preferences, or special occasions?"
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Terms */}
              <div className="bg-surface rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  By making a reservation, you agree to our cancellation policy. 
                  Please call (555) 123-FOOD at least 2 hours in advance to cancel or modify your reservation.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Reservation...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Calendar" size={20} className="mr-2" />
                    Confirm Reservation
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Restaurant Info */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Clock" size={20} className="text-white" />
            </div>
            <h3 className="font-display font-semibold text-secondary mb-2">Hours</h3>
            <p className="text-gray-600 text-sm">
              Mon-Thu: 5:00 PM - 11:00 PM<br />
              Fri-Sat: 5:00 PM - 12:00 AM<br />
              Sun: 5:00 PM - 10:00 PM
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Phone" size={20} className="text-white" />
            </div>
            <h3 className="font-display font-semibold text-secondary mb-2">Contact</h3>
            <p className="text-gray-600 text-sm">
              (555) 123-FOOD<br />
              reservations@savorytable.com
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="MapPin" size={20} className="text-white" />
            </div>
            <h3 className="font-display font-semibold text-secondary mb-2">Location</h3>
            <p className="text-gray-600 text-sm">
              123 Culinary Street<br />
              Food District, FC 12345
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservations;