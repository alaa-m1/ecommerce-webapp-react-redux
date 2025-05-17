import React from 'react';
import { PropertyCardProps } from '../types';

const PropertyCard = ({
  property,
  isFeatured = false,
  onViewDetails,
}: PropertyCardProps) => {
  const {
    id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    imageUrl,
    description,
    features,
  } = property;

  return (
    <div
      className={`bg-white rounded-${
        isFeatured ? 'xl' : 'lg'
      } shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full ${isFeatured ? 'h-64' : 'h-48'} object-cover`}
        />
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>
          {title}
        </h3>
        <p className={`${isFeatured ? 'text-3xl' : 'text-2xl'} font-bold text-blue-600 mt-2`}>
          ${price.toLocaleString()}
        </p>
        <p className="text-gray-600 mt-2">{location}</p>

        {description && (
          <p className="text-gray-600 mt-3">{description}</p>
        )}

        {features ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {features.map((feature, index) => (
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
        ) : (
          <div className="flex justify-between mt-4 text-gray-600">
            <span>{bedrooms} beds</span>
            <span>{bathrooms} baths</span>
            <span>{area} sq ft</span>
          </div>
        )}

        <button
          onClick={() => onViewDetails(id)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 