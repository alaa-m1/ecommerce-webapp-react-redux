import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Property } from "../types";
import { PropertyCard } from "./PropertyCard";
import { NoItemsFound } from "shared/components/NoItemsFound";

export const FeaturedProperties = ({
  properties,
  onViewDetails,
  isLoading = false,
}: FeaturedPropertiesProps) => {
  if (properties.length === 0 && !isLoading) {
    return (
      <Box sx={{ py: 4 }}>
        <NoItemsFound />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <PropertyCard
            property={property}
            isFeatured={true}
            onViewDetails={onViewDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
};

type FeaturedPropertiesProps = {
  properties: Array<Property>;
  onViewDetails: (id: string) => void;
  isLoading?: boolean;
};