import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <ApperIcon
        key={i}
        name="Star"
        size={16}
        className={`${i < rating ? "text-accent fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        {renderStars(testimonial.rating)}
      </div>
      
      <blockquote className="flex-1 text-gray-700 mb-4 italic">
        "{testimonial.review}"
      </blockquote>
      
      <div className="flex items-center gap-3">
        <img
          src={testimonial.photo}
          alt={testimonial.customerName}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold text-secondary">{testimonial.customerName}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(testimonial.date), "MMM dd, yyyy")}
          </p>
        </div>
        {testimonial.verified && (
          <div className="ml-auto">
            <div className="flex items-center gap-1 text-success text-xs">
              <ApperIcon name="CheckCircle" size={14} />
              <span>Verified</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TestimonialCard;