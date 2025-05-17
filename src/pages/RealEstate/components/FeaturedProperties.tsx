import React from 'react';
import { Property } from '../types';

interface FeaturedPropertiesProps {
  properties: Property[];
  onViewDetails: (id: string) => void;
}

const FeaturedProperties = ({ properties, onViewDetails }: FeaturedPropertiesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
              Featured
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900">{property.title}</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mt-3">{property.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {property.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-600"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onViewDetails(property.id)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties; 