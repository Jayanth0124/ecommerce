import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const Cart: React.FC = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (phoneId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(phoneId, newQuantity);
  };

  const handleRemoveItem = (phoneId: string) => {
    removeFromCart(phoneId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success('Redirecting to checkout...');
      // In a real app, this would redirect to checkout page
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Add some phones to get started!</p>
            <Link
              to="/phones"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.phone.id}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-6">
                  <img
                    src={item.phone.image}
                    alt={item.phone.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 mt-4 sm:mt-0">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.phone.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.phone.brand}</p>
                    <p className="text-primary-400 text-sm">Color: {item.selectedColor}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-dark-800 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.phone.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.phone.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold text-lg">${item.phone.price * item.quantity}</p>
                      <p className="text-gray-400 text-sm">${item.phone.price} each</p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.phone.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:sticky lg:top-24"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center justify-center space-x-2 mb-4"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </Link>

              <Link
                to="/phones"
                className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};