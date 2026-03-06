export type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description?: string;
  features?: Array<string>;
  isFeatured?: boolean;
  propertyType?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};

export type FilterOptions = {
  location: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
};

export type PropertyCardProps = {
  property: Property;
  isFeatured?: boolean;
  onViewDetails: (id: string) => void;
};

export type RealtorProperty = {
  property_id: string;
  listing_id?: string;
  prop_type?: string;
  address?: {
    line?: string;
    city?: string;
    state_code?: string;
    postal_code?: string;
  };
  description?: {
    beds?: number;
    baths?: number;
    sqft?: number;
    text?: string;
  };
  list_price?: number;
  primary_photo?: {
    href?: string;
  };
  photos?: Array<{ href?: string }>;
};

export type RealtorApiResponse = {
  data?: {
    home_search?: {
      results?: Array<RealtorProperty>;
    };
  };
};