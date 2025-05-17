import React from 'react';
import { FilterOptions } from '../types';

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    location: '',
  });

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price Range
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-200000">$0 - $200,000</option>
            <option value="200000-400000">$200,000 - $400,000</option>
            <option value="400000-600000">$400,000 - $600,000</option>
            <option value="600000+">$600,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Type
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Bedrooms
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border rounded-md"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilters; 