import React from 'react';
import { Property } from '../types';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onViewDetails: (id: string) => void;
}

const PropertyList = ({ properties, onViewDetails }: PropertyListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default PropertyList; 