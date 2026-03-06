import React, { useState, useCallback, useMemo } from "react";
import { Box, Container, Typography, Alert, AlertTitle } from "@mui/material";
import { FullScreenSpinner } from "shared";
import { PropertyList, SearchFilters, FeaturedProperties } from "./components";
import { FilterOptions } from "./types";
import { useRealEstateSearch, useFeaturedProperties } from "./hooks";

const RealEstatePage = () => {
  const [searchFilters, setSearchFilters] = useState<FilterOptions>({
    location: "",
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const { data: featuredProperties = [], isLoading: featuredLoading } = useFeaturedProperties();
  const { 
    data: searchResults = [], 
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useRealEstateSearch(searchFilters, hasSearched);

  const isLoading = featuredLoading || searchLoading;

  const handleFilterChange = useCallback((filters: FilterOptions) => {
    setSearchFilters(filters);
  }, []);

  const handleSearch = useCallback((filters: FilterOptions) => {
    setSearchFilters(filters);
    setHasSearched(true);
  }, []);

  const handleViewDetails = useCallback((id: string) => {
    console.log(`Viewing details for property ${id}`);
    window.open(`https://www.google.com/search?q=property+${id}`, "_blank");
  }, []);

  const displayProperties = useMemo(() => {
    if (hasSearched && searchResults.length > 0) {
      return searchResults;
    }
    return featuredProperties;
  }, [hasSearched, searchResults, featuredProperties]);

  const regularProperties = useMemo(() => {
    return displayProperties.filter((property) => !property.isFeatured);
  }, [displayProperties]);

  const featuredOnly = useMemo(() => {
    return displayProperties.filter((property) => property.isFeatured);
  }, [displayProperties]);

  return (
    <Box sx={{ minHeight: "100vh", py: 4, position: "relative" }}>
      {isLoading && <FullScreenSpinner />}
      
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          color="primary.light"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Real Estate Listings
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Demo Mode</AlertTitle>
          This page displays demo property data. To use real API data, add your RapidAPI key 
          as <code>REACT_APP_RAPIDAPI_KEY</code> in your environment variables.
        </Alert>
        
        <SearchFilters 
          onFilterChange={handleFilterChange} 
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        
        {featuredOnly.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              color="primary.light"
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Featured Properties
            </Typography>
            <FeaturedProperties
              properties={featuredOnly}
              onViewDetails={handleViewDetails}
              isLoading={isLoading}
            />
          </Box>
        )}
        
        <Box>
          <Typography
            variant="h5"
            color="primary.light"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            {hasSearched ? "Search Results" : "All Properties"}
          </Typography>
          <PropertyList
            properties={regularProperties.length > 0 ? regularProperties : displayProperties}
            onViewDetails={handleViewDetails}
            isLoading={isLoading}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RealEstatePage;