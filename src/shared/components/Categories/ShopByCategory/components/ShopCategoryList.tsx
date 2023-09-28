import { Box, Typography } from "@mui/material";
import { Product } from "types";
import _ from "lodash";
import { ShopCategoryCard } from "../../../../../shared/components/ShopCategoryCard";

type ShopCategoryListProps = {
  subCategories: Array<Product>;
  categoryLabel: string;
};
export const ShopCategoryList = ({
  subCategories,
  categoryLabel,
}: ShopCategoryListProps) => {
  return (
    <Box className="shop-category-section" sx={{color:"secondary.dark"}}>
      <Box className="shop-category-section-title"><Typography color="primary.light">{categoryLabel}</Typography></Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item) => (
          <ShopCategoryCard key={_.uniqueId()} catInfo={item}></ShopCategoryCard>
        ))}
      </Box>
    </Box>
  );
};
