import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, addOrder } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cartItems,
      total: cartTotal,
      status: 'processing' as const,
      orderDate: new Date(),
      shippingAddress: {
        street: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
    };

    addOrder(order);
    clearCart();
    setIsProcessing(false);
    
    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Address</label>
                  <input
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                  <input
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                  <select
                    {...register('country', { required: 'Country is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Payment Information</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Card Number</label>
                  <input
                    {...register('cardNumber', { required: 'Card number is required' })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    {...register('expiryDate', { required: 'Expiry date is required' })}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                  <input
                    {...register('cvv', { required: 'CVV is required' })}
                    placeholder="123"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Name on Card</label>
                  <input
                    {...register('cardName', { required: 'Name on card is required' })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName.message}</p>}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.phone.id}-${item.selectedColor}`} className="flex items-center space-x-3">
                    <img
                      src={item.phone.image}
                      alt={item.phone.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.phone.name}</p>
                      <p className="text-gray-400 text-sm">{item.selectedColor} • Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">${(item.phone.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
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
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Complete Order</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 mt-4 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure</span>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};