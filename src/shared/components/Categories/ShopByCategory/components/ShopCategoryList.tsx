import { Box, Typography } from "@mui/material";
import { Product } from "types";
import _ from "lodash";
import { ShopCategoryCard } from "../../../../../shared/components/ShopCategoryCard";
import { NoItemsFound } from "shared/components/NoItemsFound";

type ShopCategoryListProps = {
  subCategories: Array<Product>;
  categoryLabel: string;
};
export const ShopCategoryList = ({
  subCategories,
  categoryLabel,
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
            catInfo={item}
          ></ShopCategoryCard>
        ))}
      </Box>
      {subCategories.length === 0 && (
        <NoItemsFound/>
      )}
    </Box>
  );
};
