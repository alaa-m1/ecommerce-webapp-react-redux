export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description?: string;
  features?: string[];
  isFeatured?: boolean;
}

export interface FilterOptions {
  priceRange: string;
  propertyType: string;
  bedrooms: string;
  location: string;
}

export interface PropertyCardProps {
  property: Property;
  isFeatured?: boolean;
  onViewDetails: (id: string) => void;
} 