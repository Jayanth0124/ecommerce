import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Sun,
  Moon,
  Package
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SearchBar } from '../ui/SearchBar';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  const { 
    cartItems, 
    wishlistItems, 
    user, 
    isDarkMode, 
    toggleDarkMode 
  } = useStore();

  const navigation = [
    { name: 'Home', href: '/', icon: Smartphone },
    { name: 'Phones', href: '/phones', icon: Smartphone },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Orders', href: '/orders', icon: Package },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-2 rounded-lg">
                <img src="/logo.png" alt="Logo" className="w-6 h-6" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Aurora Mobile Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors md:hidden"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Theme Toggle */}
            {/* Removed dark mode toggle as per user request */}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </Link>

            {/* User */}
            <Link
              to={user ? "/profile" : "/login"}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-dark-900/95 backdrop-blur-xl border-l border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-400 bg-primary-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {user && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="absolute top-4 left-4 right-4 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
            >
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};