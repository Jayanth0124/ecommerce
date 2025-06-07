import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { phones } from '../../data/phones';
import { Phone } from '../../types';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Phone[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchQuery } = useStore();

  useEffect(() => {
    if (query.length > 0) {
      const filteredPhones = phones.filter(phone =>
        phone.name.toLowerCase().includes(query.toLowerCase()) ||
        phone.brand.toLowerCase().includes(query.toLowerCase()) ||
        phone.specs.processor.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredPhones.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search phones, brands..."
          className="w-full md:w-80 pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
          >
            <div className="p-2">
              {results.map((phone) => (
                <Link
                  key={phone.id}
                  to={`/phone/${phone.id}`}
                  onClick={() => handleSearch(phone.name)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                      {phone.name}
                    </p>
                    <p className="text-gray-400 text-sm">{phone.brand}</p>
                  </div>
                  <p className="text-primary-400 font-semibold">${phone.price}</p>
                </Link>
              ))}
            </div>
            
            {results.length === 5 && (
              <div className="border-t border-white/10 p-3">
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full text-center text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                >
                  View all results for "{query}"
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};