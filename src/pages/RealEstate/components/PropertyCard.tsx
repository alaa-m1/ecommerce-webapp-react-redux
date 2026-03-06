import React, { memo, useCallback, useState } from "react";
import { Box, Button, Typography, Chip, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PropertyCardProps } from "../types";

export const PropertyCard = memo(({
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
    propertyType,
  } = property;

  const handleViewDetails = useCallback(() => {
    onViewDetails(id);
  }, [id, onViewDetails]);

  const CardContent = (
    <Box
      className="property-card"
      sx={{
        color: 'secondary.dark',
        backgroundColor: 'background.paper',
        borderRadius: isFeatured ? 3 : 2,
        overflow: 'hidden',
        boxShadow: 3,
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box className="property-card-image" sx={{ position: 'relative', height: isFeatured ? 220 : 180 }}>
        <CardImage
          imagePath={imageUrl}
          altInfo={title}
        />
        {isFeatured && (
          <Chip
            label="Featured"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 'bold',
            }}
          />
        )}
        {propertyType && (
          <Chip
            label={propertyType}
            variant="outlined"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
            }}
          />
        )}
      </Box>

      <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant={isFeatured ? 'h6' : 'subtitle1'}
          color="primary.light"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: isFeatured ? '64px' : '48px',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant={isFeatured ? 'h5' : 'h6'}
          color="primary.main"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          ${price.toLocaleString()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {location}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            px: 1,
            backgroundColor: 'action.hover',
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" fontWeight={500}>
              {bedrooms}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BathtubIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" fontWeight={500}>
              {bathrooms}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SquareFootIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" fontWeight={500}>
              {area} ft²
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleViewDetails}
            sx={{
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
            }}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      {CardContent}
    </motion.div>
  );
});

PropertyCard.displayName = "PropertyCard";

const CardImage = ({ imagePath, altInfo }: CardImageProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? "https://via.placeholder.com/400x300?text=No+Image" : imagePath}
      alt={altInfo}
      loading="lazy"
      onError={() => setHasError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

type CardImageProps = {
  imagePath: string;
  altInfo: string;
};

export default PropertyCard;