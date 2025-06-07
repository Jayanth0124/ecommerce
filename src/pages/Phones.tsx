import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { PhoneCard } from '../components/ui/PhoneCard';
import { FilterSidebar } from '../components/ui/FilterSidebar';
import { phones } from '../data/phones';
import { FilterOptions, Phone } from '../types';
import { useStore } from '../store/useStore';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';

export const Phones: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { searchQuery } = useStore();

  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: [0, 2000],
    ram: [],
    storage: [],
    battery: [],
    rating: 0,
    colors: [],
    network: [],
    discount: 0,
  });

  const filteredAndSortedPhones = useMemo(() => {
    let filtered = phones.filter(phone => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          phone.name.toLowerCase().includes(query) ||
          phone.brand.toLowerCase().includes(query) ||
          phone.specs.processor.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(phone.brand)) {
        return false;
      }

      // Price filter
      if (phone.price < filters.priceRange[0] || phone.price > filters.priceRange[1]) {
        return false;
      }

      // RAM filter
      if (filters.ram.length > 0 && !filters.ram.includes(phone.specs.ram)) {
        return false;
      }

      // Storage filter
      if (filters.storage.length > 0 && !filters.storage.includes(phone.specs.storage)) {
        return false;
      }

      // Network filter
      if (filters.network.length > 0 && !filters.network.includes(phone.specs.network)) {
        return false;
      }

      // Rating filter
      if (phone.rating < filters.rating) {
        return false;
      }

      // Discount filter
      if (filters.discount > 0 && (!phone.discount || phone.discount < filters.discount)) {
        return false;
      }

      return true;
    });

    // Sort phones
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher IDs are newer
        case 'popular':
        default:
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [filters, sortBy, searchQuery]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const sortOptions = [
    { value: 'popular' as SortOption, label: 'Most Popular' },
    { value: 'price-low' as SortOption, label: 'Price: Low to High' },
    { value: 'price-high' as SortOption, label: 'Price: High to Low' },
    { value: 'rating' as SortOption, label: 'Highest Rated' },
    { value: 'newest' as SortOption, label: 'Newest First' },
  ];

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Phones'}
          </h1>
          <p className="text-gray-400">
            {filteredAndSortedPhones.length} phone{filteredAndSortedPhones.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 bg-dark-800 border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-dark-700 transition-colors lg:hidden"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2 bg-dark-800 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-dark-800 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </h2>
              {/* Filter content would go here - simplified for now */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [Number(e.target.value), prev.priceRange[1]]
                      }))}
                      className="w-full px-3 py-2 bg-dark-800 border border-white/10 rounded-lg text-white text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], Number(e.target.value)]
                      }))}
                      className="w-full px-3 py-2 bg-dark-800 border border-white/10 rounded-lg text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Grid */}
          <div className="flex-1">
            {filteredAndSortedPhones.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredAndSortedPhones.map((phone, index) => (
                  <PhoneCard key={phone.id} phone={phone} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No phones found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      brands: [],
                      priceRange: [0, 2000],
                      ram: [],
                      storage: [],
                      battery: [],
                      rating: 0,
                      colors: [],
                      network: [],
                      discount: 0,
                    });
                  }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
};