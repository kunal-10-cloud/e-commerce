import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import { ProductCard } from './Card';
import { FaArrowRight, FaArrowLeft, FaPause, FaPlay } from 'react-icons/fa';
import BackgroundPattern from './BackgroundPattern';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimerRef = useRef(null);
  const autoplayDelay = 5000; // 5 seconds
  
  // Manage autoplay timer
  useEffect(() => {
    if (autoplay) {
      autoplayTimerRef.current = setInterval(() => {
        nextProduct();
      }, autoplayDelay);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, activeIndex]);
  
  // Pause autoplay when user interacts
  const pauseAutoplay = () => {
    setAutoplay(false);
  };
  
  // Resume autoplay
  const resumeAutoplay = () => {
    setAutoplay(true);
  };
  
  const nextProduct = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProduct = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };
  
  const handleNavigation = (direction) => {
    // Pause autoplay temporarily when manually navigating
    pauseAutoplay();
    
    if (direction === 'next') {
      nextProduct();
    } else {
      prevProduct();
    }
    
    // Resume autoplay after a delay
    setTimeout(resumeAutoplay, 10000);
  };

  // For filtering products in different screen sizes
  const getVisibleProducts = () => {
    let visibleCount = 4; // default for large screens
    
    if (window.innerWidth < 640) {
      visibleCount = 1;
    } else if (window.innerWidth < 1024) {
      visibleCount = 2;
    }
    
    // Create a circular array starting from activeIndex
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % featuredProducts.length;
      result.push({
        ...featuredProducts[index],
        position: i
      });
    }
    
    return result;
  };
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Add the background pattern */}
      <BackgroundPattern />
      
      <div className="container mx-auto px-4">
        {/* Title and subtitle with staggered animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our handpicked selection of premium products
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Navigation arrows */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center z-10 pointer-events-none">
            <button 
              onClick={() => handleNavigation('prev')}
              className="p-3 bg-dark-800/80 backdrop-blur rounded-full text-white shadow-lg hover:bg-primary transition-colors duration-300 -ml-2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label="Previous product"
            >
              <FaArrowLeft className="h-4 w-4" />
            </button>
            
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={autoplay ? pauseAutoplay : resumeAutoplay}
                className="p-3 bg-dark-800/80 backdrop-blur rounded-full text-white shadow-lg hover:bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label={autoplay ? "Pause autoplay" : "Resume autoplay"}
              >
                {autoplay ? <FaPause className="h-4 w-4" /> : <FaPlay className="h-4 w-4" />}
              </button>
              
              <button 
                onClick={() => handleNavigation('next')}
                className="p-3 bg-dark-800/80 backdrop-blur rounded-full text-white shadow-lg hover:bg-primary transition-colors duration-300 -mr-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label="Next product"
              >
                <FaArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Products Grid with AnimatePresence for smooth transitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: index === activeIndex ? 1.05 : 1,
                    zIndex: index === activeIndex ? 10 : 0
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  style={{ 
                    display: (index >= activeIndex && index < activeIndex + 4) ||
                            (activeIndex + 4 > featuredProducts.length && 
                             index < (activeIndex + 4) % featuredProducts.length)
                            ? "block" : "none"
                  }}
                  className={`transform transition-all duration-500`}
                >
                  <ProductCard 
                    product={product}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Product dots indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                pauseAutoplay();
                setActiveIndex(index);
                setTimeout(resumeAutoplay, 10000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/products" 
            className="inline-flex items-center bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 group"
          >
            View All Products
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 