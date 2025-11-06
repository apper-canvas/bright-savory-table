import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { motion } from "framer-motion";
import { galleryService } from "@/services/api/galleryService";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const loadImages = async () => {
    try {
      setError("");
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await galleryService.getAll();
      setImages(data);
    } catch (err) {
      setError(err.message || "Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const categories = ["All", ...new Set(images.map(img => img.category))];

  const filteredImages = images.filter(img => 
    selectedCategory === "All" || img.category === selectedCategory
  );

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.Id === selectedImage.Id);
    let newIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  if (loading) {
    return <Loading message="Loading our beautiful gallery..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadImages} />;
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-secondary mb-6">
            Visual
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a visual journey through our culinary creations, elegant ambiance, 
            and the memorable moments that make Savory Table special
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "primary" : "default"}
              size="lg"
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedCategory === category 
                  ? "bg-primary text-white shadow-md" 
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Results Info */}
        {images.length > 0 && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600">
              Showing {filteredImages.length} of {images.length} images
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </motion.div>
        )}

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <Empty
            title="No images found"
            description="Try selecting a different category to view our stunning collection."
            actionText="View All Images"
            onAction={() => setSelectedCategory("All")}
            icon="Image"
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 8) }}
                whileHover={{ y: -4 }}
              >
                <Card 
                  hover 
                  className="overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" size="sm" className="bg-white/90 text-secondary">
                        {image.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <ApperIcon name="Expand" size={20} className="text-secondary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        {filteredImages.length > 0 && (
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { number: images.filter(img => img.category === "Dishes").length, label: "Signature Dishes", icon: "Utensils" },
              { number: images.filter(img => img.category === "Interior").length, label: "Interior Views", icon: "Home" },
              { number: images.filter(img => img.category === "Events").length, label: "Special Events", icon: "Calendar" },
              { number: images.filter(img => img.category === "Team").length, label: "Team Photos", icon: "Users" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-3xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <ApperIcon name="X" size={20} />
            </button>
            
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <ApperIcon name="ChevronLeft" size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <ApperIcon name="ChevronRight" size={24} />
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
              <h3 className="text-xl font-display font-semibold mb-2">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-white/90">
                  {selectedImage.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-3">
                <Badge variant="accent" size="sm">
                  {selectedImage.category}
                </Badge>
                <span className="text-sm text-white/70">
                  {filteredImages.findIndex(img => img.Id === selectedImage.Id) + 1} of {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;