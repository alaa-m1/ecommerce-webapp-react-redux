import React from "react";
import { Box, Typography } from "@mui/material";
import { Product } from "types";
import _ from "lodash";
import { NoItemsFound } from "shared/components/NoItemsFound";
import { ShopCategoryCard } from "shared/components/ShopCategoryCard";

type ShopCategoryListProps = {
  subCategories: Array<Product>;
  categoryLabel: string;
  isLoading: boolean;
};
export const ShopCategoryList = ({
  subCategories,
  categoryLabel,
  isLoading
}: ShopCategoryListProps) => {
  return (
    <Box className="shop-category-section" sx={{ color: "secondary.dark" }}>
      <Box className="shop-category-section-title">
        <Typography color="primary.light">
          {`${categoryLabel} ${
            subCategories.length > 0 ? `(${subCategories.length})` : ""
          }`}
        </Typography>
      </Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item) => (
          <ShopCategoryCard
            key={_.uniqueId()}
            cardInfo={item}
          ></ShopCategoryCard>
        ))}
      </Box>
      {subCategories.length === 0 && !isLoading &&(
        <NoItemsFound/>
      )}
    </Box>
  );
};
