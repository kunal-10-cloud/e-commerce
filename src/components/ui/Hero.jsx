import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-dark-900">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28 lg:py-32 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover Modern <span className="text-primary">Fashion</span> For Every Occasion
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Shop the latest trends and discover premium quality clothing, accessories, and more with free shipping on orders over $50.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/products" className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300">
                Shop Now
              </Link>
              <Link to="/categories" className="bg-transparent border border-white text-white hover:bg-white hover:text-dark-900 px-6 py-3 rounded-md font-medium transition-colors duration-300">
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Fashion Collection" 
              className="rounded-lg shadow-2xl w-full max-w-md object-cover"
              style={{ height: "500px" }}
            />
            <div className="absolute -bottom-5 -left-5 md:left-0 bg-dark-800 p-4 rounded shadow-lg border border-gray-700">
              <p className="text-lg font-semibold text-white">Summer Collection</p>
              <p className="text-primary">Up to 40% Off</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 