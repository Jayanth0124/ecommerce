import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useStore();

  const handleRemoveFromWishlist = (phoneId: string) => {
    removeFromWishlist(phoneId);
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (phone: any) => {
    addToCart(phone, phone.colors[0]);
    toast.success(`${phone.name} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h1>
            <p className="text-gray-400 mb-8">Save phones you love to buy them later!</p>
            <Link
              to="/phones"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
            >
              <span>Browse Phones</span>
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
          <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-400">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.phone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={item.phone.image}
                  alt={item.phone.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item.phone.id)}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-red-400 hover:bg-black/40 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-400 text-sm font-medium">{item.phone.brand}</span>
                  <span className="text-gray-400 text-xs">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">{item.phone.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">${item.phone.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.phone.inStock 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.phone.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(item.phone)}
                  disabled={!item.phone.inStock}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};