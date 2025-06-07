import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Phone } from '../../types';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface PhoneCardProps {
  phone: Phone;
  index?: number;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(phone.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(phone, phone.colors[0]);
    toast.success(`${phone.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(phone.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(phone);
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/phone/${phone.id}`}>
        <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300">
          {/* Discount Badge */}
          {phone.discount && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{phone.discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-all duration-200"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-400 text-sm font-medium">{phone.brand}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{phone.rating}</span>
                <span className="text-gray-400 text-sm">({phone.reviews})</span>
              </div>
            </div>

            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
              {phone.name}
            </h3>

            {/* Key Specs */}
            <div className="flex items-center space-x-4 mb-4 text-gray-400 text-sm">
              <span>{phone.specs.ram}</span>
              <span>•</span>
              <span>{phone.specs.storage}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>{phone.specs.network}</span>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">${phone.price}</span>
                {phone.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">${phone.originalPrice}</span>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                phone.inStock 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {phone.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!phone.inStock}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};