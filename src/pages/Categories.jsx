
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/products';

const Categories = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Shop by Categories</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/categories/${category.id}`}
                className="block"
              >
                <div className="bg-dark-800 rounded-lg overflow-hidden h-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                      <p className="text-gray-300 mb-4">{category.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{category.productCount} Products</span>
                        <span className="bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded-md inline-block transition-colors duration-300">
                          Browse Products
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 