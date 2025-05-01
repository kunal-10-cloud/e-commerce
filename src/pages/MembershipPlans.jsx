import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const MembershipPlans = () => {
  const { addToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const plans = [
    {
      id: 'membership-basic',
      name: 'Basic',
      price: 9.99,
      duration: 'Monthly',
      features: [
        'Free standard shipping',
        'Early access to sales',
        '10% off first purchase',
        'Member-only newsletter'
      ],
      notIncluded: [
        'Priority customer service',
        'Member-exclusive products',
        'Free returns'
      ],
      color: 'from-blue-500 to-blue-700',
      popular: false
    },
    {
      id: 'membership-premium',
      name: 'Premium',
      price: 19.99,
      duration: 'Monthly',
      features: [
        'Free express shipping',
        'Early access to sales',
        '15% off first purchase',
        'Member-only newsletter',
        'Priority customer service',
        'Member-exclusive products'
      ],
      notIncluded: [
        'Free returns'
      ],
      color: 'from-primary to-purple-600',
      popular: true
    },
    {
      id: 'membership-ultimate',
      name: 'Ultimate',
      price: 29.99,
      duration: 'Monthly',
      features: [
        'Free express shipping',
        'Early access to sales',
        '20% off first purchase',
        'Member-only newsletter',
        'Priority customer service',
        'Member-exclusive products',
        'Free returns',
        'Personal shopper'
      ],
      notIncluded: [],
      color: 'from-yellow-500 to-amber-600',
      popular: false
    }
  ];

  const handleAddToCart = (plan) => {
    const membershipProduct = {
      id: plan.id,
      name: `${plan.name} Membership`,
      price: plan.price,
      image: '/images/membership-card.jpg',
      description: `${plan.name} membership plan with exclusive benefits`,
      category: 'membership',
      isMembership: true,
      features: plan.features
    };
    
    addToCart(membershipProduct, 1);
    setSelectedPlan(plan.id);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Membership Plans
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our membership program and unlock exclusive benefits
          </motion.p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`bg-dark-800 rounded-xl overflow-hidden relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold">${plan.price}</span>
                  <span className="ml-1 text-xl text-gray-200">/{plan.duration.toLowerCase()}</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="h-5 w-5 text-green-500 flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start opacity-50">
                      <FaTimes className="h-5 w-5 text-red-500 flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleAddToCart(plan)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                    selectedPlan === plan.id && addedToCart
                      ? 'bg-green-600 hover:bg-green-700'
                      : plan.popular
                      ? 'bg-primary hover:bg-primary-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <FaShoppingCart className="h-4 w-4" />
                  {selectedPlan === plan.id && addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          className="bg-dark-800 rounded-xl overflow-hidden p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Exclusive Discounts</h3>
              <p className="text-gray-400">Members receive special pricing and early access to sales events before they're available to the public.</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Free Shipping</h3>
              <p className="text-gray-400">Enjoy free shipping on all orders with no minimum purchase required.</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Member-Only Products</h3>
              <p className="text-gray-400">Access exclusive products only available to members.</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Priority Support</h3>
              <p className="text-gray-400">Get fast-track customer service with dedicated support agents.</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Birthday Rewards</h3>
              <p className="text-gray-400">Receive a special gift or discount during your birthday month.</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Community Access</h3>
              <p className="text-gray-400">Join our exclusive online community to connect with other members and participate in special events.</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-dark-800 rounded-xl overflow-hidden p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-medium text-white mb-2">How do I cancel my membership?</h3>
              <p className="text-gray-400">You can cancel your membership at any time from your account settings. Your benefits will continue until the end of your billing period.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-medium text-white mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-400">Yes, you can change your membership tier at any time. The new pricing will be applied at your next billing cycle.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-medium text-white mb-2">Is there a commitment period?</h3>
              <p className="text-gray-400">No, all our membership plans are month-to-month with no long-term commitment required.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">How do I apply my member discount?</h3>
              <p className="text-gray-400">Your discount will be automatically applied at checkout when you're logged in to your account.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipPlans; 