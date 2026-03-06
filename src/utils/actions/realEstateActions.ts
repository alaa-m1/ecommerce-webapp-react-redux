import { Property, FilterOptions } from "../../pages/RealEstate/types";

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = "bayut.p.rapidapi.com";

type BayutProperty = {
  id: number;
  title: string;
  price: number;
  location: Array<{ name: string }>;
  rooms: number;
  baths: number;
  area: number;
  coverPhoto?: { url: string };
  photos?: Array<{ url: string }>;
  description?: string;
  purpose?: string;
  category?: Array<{ name: string }>;
  isVerified?: boolean;
};

type BayutApiResponse = {
  hits: Array<BayutProperty>;
  nbHits: number;
};

const mapBayutToProperty = (bayutProperty: BayutProperty): Property => {
  const locationParts = bayutProperty.location?.map(loc => loc.name) || [];
  const locationString = locationParts.slice(0, 3).join(', ');
  
  return {
    id: bayutProperty.id.toString(),
    title: bayutProperty.title || 'Property Listing',
    price: bayutProperty.price || 0,
    location: locationString || 'Location not specified',
    bedrooms: bayutProperty.rooms || 0,
    bathrooms: bayutProperty.baths || 0,
    area: Math.round(bayutProperty.area * 10.764) || 0, // Convert sqm to sqft
    imageUrl: bayutProperty.coverPhoto?.url || 'https://via.placeholder.com/400x300?text=No+Image',
    description: bayutProperty.description?.substring(0, 200) || undefined,
    propertyType: bayutProperty.category?.[0]?.name || 'Property',
    isFeatured: bayutProperty.isVerified || false,
    features: [
      `${bayutProperty.rooms || 0} Bedrooms`,
      `${bayutProperty.baths || 0} Bathrooms`,
      `${Math.round(bayutProperty.area * 10.764) || 0} sq ft`,
      bayutProperty.purpose || 'For Sale',
    ],
  };
};

export const searchProperties = async (filters: FilterOptions): Promise<Property[]> => {
  if (!RAPIDAPI_KEY) {
    console.warn('RapidAPI key not configured. Using demo data.');
    return getDemoProperties(filters);
  }

  try {
    const purpose = filters.propertyType === 'rent' ? 'for-rent' : 'for-sale';
    const locationQuery = filters.location || 'dubai';
    
    const url = new URL(`https://${RAPIDAPI_HOST}/properties/list`);
    url.searchParams.set('locationExternalIDs', '5002'); // Default to Dubai
    url.searchParams.set('purpose', purpose);
    url.searchParams.set('hitsPerPage', '25');
    url.searchParams.set('page', '0');
    url.searchParams.set('lang', 'en');
    
    if (filters.minPrice) {
      url.searchParams.set('priceMin', filters.minPrice);
    }
    if (filters.maxPrice) {
      url.searchParams.set('priceMax', filters.maxPrice);
    }
    if (filters.bedrooms) {
      url.searchParams.set('roomsMin', filters.bedrooms);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: BayutApiResponse = await response.json();
    return data.hits?.map(mapBayutToProperty) || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return getDemoProperties(filters);
  }
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  if (!RAPIDAPI_KEY) {
    return getDemoProperties({ location: '' }).filter(p => p.isFeatured);
  }

  try {
    const url = new URL(`https://${RAPIDAPI_HOST}/properties/list`);
    url.searchParams.set('locationExternalIDs', '5002');
    url.searchParams.set('purpose', 'for-sale');
    url.searchParams.set('hitsPerPage', '6');
    url.searchParams.set('page', '0');
    url.searchParams.set('lang', 'en');
    url.searchParams.set('sort', 'verified-score');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: BayutApiResponse = await response.json();
    return data.hits?.map(prop => ({ ...mapBayutToProperty(prop), isFeatured: true })) || [];
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return getDemoProperties({ location: '' }).filter(p => p.isFeatured);
  }
};

const getDemoProperties = (filters: FilterOptions): Property[] => {
  const demoData: Property[] = [
    {
      id: '1',
      title: 'Luxury Penthouse with City Views',
      price: 2500000,
      location: 'Downtown Dubai, UAE',
      bedrooms: 4,
      bathrooms: 5,
      area: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      description: 'Stunning penthouse with panoramic city views and premium finishes.',
      features: ['4 Bedrooms', '5 Bathrooms', '4500 sq ft', 'For Sale'],
      isFeatured: true,
      propertyType: 'Penthouse',
    },
    {
      id: '2',
      title: 'Modern Waterfront Villa',
      price: 3800000,
      location: 'Palm Jumeirah, Dubai',
      bedrooms: 5,
      bathrooms: 6,
      area: 6200,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      description: 'Exclusive waterfront villa with private beach access.',
      features: ['5 Bedrooms', '6 Bathrooms', '6200 sq ft', 'For Sale'],
      isFeatured: true,
      propertyType: 'Villa',
    },
    {
      id: '3',
      title: 'Contemporary Studio Apartment',
      price: 450000,
      location: 'Business Bay, Dubai',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      description: 'Modern studio with smart home features.',
      features: ['1 Bedroom', '1 Bathroom', '650 sq ft', 'For Sale'],
      isFeatured: false,
      propertyType: 'Apartment',
    },
    {
      id: '4',
      title: 'Spacious Family Home',
      price: 1200000,
      location: 'Arabian Ranches, Dubai',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      description: 'Perfect family home in a gated community.',
      features: ['4 Bedrooms', '3 Bathrooms', '3200 sq ft', 'For Sale'],
      isFeatured: false,
      propertyType: 'House',
    },
    {
      id: '5',
      title: 'Elegant Townhouse',
      price: 980000,
      location: 'Jumeirah Village Circle, Dubai',
      bedrooms: 3,
      bathrooms: 4,
      area: 2400,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      description: 'Beautiful townhouse with garden and parking.',
      features: ['3 Bedrooms', '4 Bathrooms', '2400 sq ft', 'For Sale'],
      isFeatured: false,
      propertyType: 'Townhouse',
    },
    {
      id: '6',
      title: 'Luxury Marina Apartment',
      price: 1850000,
      location: 'Dubai Marina, UAE',
      bedrooms: 2,
      bathrooms: 3,
      area: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      description: 'Premium apartment with marina views.',
      features: ['2 Bedrooms', '3 Bathrooms', '1800 sq ft', 'For Sale'],
      isFeatured: true,
      propertyType: 'Apartment',
    },
  ];

  let filtered = [...demoData];

  if (filters.location) {
    const searchTerm = filters.location.toLowerCase();
    filtered = filtered.filter(p => 
      p.location.toLowerCase().includes(searchTerm) ||
      p.title.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.bedrooms) {
    const minBeds = parseInt(filters.bedrooms);
    filtered = filtered.filter(p => p.bedrooms >= minBeds);
  }

  if (filters.minPrice) {
    const min = parseInt(filters.minPrice);
    filtered = filtered.filter(p => p.price >= min);
  }

  if (filters.maxPrice) {
    const max = parseInt(filters.maxPrice);
    filtered = filtered.filter(p => p.price <= max);
  }

  return filtered.length > 0 ? filtered : demoData;
};
