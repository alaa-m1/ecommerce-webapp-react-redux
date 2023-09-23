import { Box } from "@mui/material";
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
    <Box className="shop-category-section">
      <Box className="shop-category-section-title">{categoryLabel}</Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item) => (
          <ShopCategoryCard key={_.uniqueId()} catInfo={item}></ShopCategoryCard>
        ))}
      </Box>
    </Box>
  );
};
