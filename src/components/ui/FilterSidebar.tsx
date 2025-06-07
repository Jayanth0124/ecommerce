import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterOptions } from '../../types';
import { brands, ramOptions, storageOptions, batteryOptions, networkOptions, colorOptions } from '../../data/phones';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'brands', 'price', 'specs'
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleArrayFilterChange = (
    filterKey: keyof FilterOptions,
    value: string,
    currentArray: string[]
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    onFiltersChange({ ...filters, [filterKey]: newArray });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const FilterSection: React.FC<{
    title: string;
    section: string;
    children: React.ReactNode;
  }> = ({ title, section, children }) => {
    const isExpanded = expandedSections.includes(section);

    return (
      <div className="border-b border-white/10 pb-4">
        <button
          onClick={() => toggleSection(section)}
          className="flex items-center justify-between w-full text-white font-medium mb-3 hover:text-primary-400 transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute left-0 top-0 h-full w-80 bg-dark-900/95 backdrop-blur-xl border-r border-white/10 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Brands */}
                <FilterSection title="Brands" section="brands">
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300 text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range" section="price">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
                        className="w-full px-3 py-2 bg-dark-800 border border-white/10 rounded-lg text-white text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
                        className="w-full px-3 py-2 bg-dark-800 border border-white/10 rounded-lg text-white text-sm"
                        placeholder="Max"
                      />
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Under $500', min: 0, max: 500 },
                        { label: '$500 - $800', min: 500, max: 800 },
                        { label: '$800 - $1200', min: 800, max: 1200 },
                        { label: 'Above $1200', min: 1200, max: 2000 },
                      ].map(range => (
                        <button
                          key={range.label}
                          onClick={() => handlePriceRangeChange(range.min, range.max)}
                          className="w-full text-left text-sm text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </FilterSection>

                {/* RAM */}
                <FilterSection title="RAM" section="specs">
                  <div className="space-y-2">
                    {ramOptions.map(ram => (
                      <label key={ram} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.ram.includes(ram)}
                          onChange={() => handleArrayFilterChange('ram', ram, filters.ram)}
                          className="rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300 text-sm">{ram}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Storage */}
                <FilterSection title="Storage" section="storage">
                  <div className="space-y-2">
                    {storageOptions.map(storage => (
                      <label key={storage} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.storage.includes(storage)}
                          onChange={() => handleArrayFilterChange('storage', storage, filters.storage)}
                          className="rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300 text-sm">{storage}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Network */}
                <FilterSection title="Network" section="network">
                  <div className="space-y-2">
                    {networkOptions.map(network => (
                      <label key={network} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.network.includes(network)}
                          onChange={() => handleArrayFilterChange('network', network, filters.network)}
                          className="rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-gray-300 text-sm">{network}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors border border-red-400/30 rounded-lg hover:bg-red-400/10"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};