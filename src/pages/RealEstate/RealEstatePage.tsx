import React from 'react';
import { LoadingSpinner } from 'shared';
import { PropertyList, SearchFilters, FeaturedProperties } from './components';
import { Property, FilterOptions } from './types';

const RealEstatePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [properties, setProperties] = React.useState<Property[]>([
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: 450000,
      location: 'Downtown',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      title: 'Luxury Waterfront Villa',
      price: 1200000,
      location: 'Waterfront',
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      imageUrl: 'https://via.placeholder.com/600x400',
      description: 'Stunning waterfront property with panoramic views and private dock.',
      features: ['5 Bedrooms', '4 Bathrooms', 'Private Pool', 'Smart Home System'],
      isFeatured: true,
    },
    {
      id: '3',
      title: 'Modern City Penthouse',
      price: 850000,
      location: 'City Center',
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2800,
      imageUrl: 'https://via.placeholder.com/600x400',
      description: 'Spectacular penthouse in the heart of the city with 360-degree views.',
      features: ['3 Bedrooms', '3.5 Bathrooms', 'Rooftop Terrace', 'Concierge Service'],
      isFeatured: true,
    },
  ]);

  const handleFilterChange = (filters: FilterOptions) => {
    setIsLoading(true);
    // Here you would typically make an API call with the filters
    // For now, we'll just simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleViewDetails = (id: string) => {
    // Here you would typically navigate to the property details page
    console.log(`Viewing details for property ${id}`);
  };

  const featuredProperties = properties.filter((property) => property.isFeatured);
  const regularProperties = properties.filter((property) => !property.isFeatured);

  return (
    <div className="min-h-screen p-4">
      {isLoading && <LoadingSpinner />}
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Real Estate Listings</h1>
        
        <SearchFilters onFilterChange={handleFilterChange} />
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Properties</h2>
          <FeaturedProperties
            properties={featuredProperties}
            onViewDetails={handleViewDetails}
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Properties</h2>
          <PropertyList
            properties={regularProperties}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default RealEstatePage; 