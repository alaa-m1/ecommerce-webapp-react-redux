import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Category } from "types";
import { Link } from "react-router-dom";

type ShopCategoryCardProps = {
  catInfo: Category;
};
const ShopCategoryCard = ({ catInfo }: ShopCategoryCardProps) => {
  return (
    <Box className="shop-category-card">
      <Box className="shop-category-images">
        <img
          src={`${window.location.origin}/images/categories/${catInfo.categoryLabel}/${catInfo.categoryDetails.imagePath}`}
          alt={`${catInfo.categoryLabel}`}
          loading="lazy"
        />
      </Box>
      <Box className="shopping-btn">
        <Button variant="contained">Add to Cart</Button>
      </Box>
      <Box className="shop-category-info">
        {catInfo.categoryDetails.price}
      </Box>
    </Box>
  );
};
export default ShopCategoryCard;
