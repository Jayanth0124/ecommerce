import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Aurora Mobile Hub
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover premium mobile phones with cutting-edge technology. Your gateway to the future of communication.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">jayanthdonavalli0124@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+92 7207288496</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'All Phones', href: '/phones' },
                { name: 'Wishlist', href: '/wishlist' },
                { name: 'Orders', href: '/orders' },
                
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Flagship', 'Premium', 'Mid-Range', 'Budget', 'Gaming', 'Camera'].map((category) => (
                <li key={category}>
                  <Link
                    to={`/phones?category=${category.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Aurora Mobile Hub. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Designed with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by</span>
            <a
              href="https://www.jayanth.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              Donavalli Jayanth
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};