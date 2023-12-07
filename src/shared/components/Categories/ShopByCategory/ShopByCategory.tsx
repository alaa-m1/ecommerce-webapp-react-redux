import React from "react";
import { Box } from "@mui/material";
import { Product } from "types";
import { ShopCategoryList } from "./components";
import styles from "../../styles/ShopByCategory.module.css"

type ShopByCategoryProps = {
  activeCategoryItems: Array<Product>;
  activeCategoryLabel: string;
  isLoading?: boolean;
};
export const ShopByCategory = ({
  activeCategoryItems,
  activeCategoryLabel,
  isLoading=false
}: ShopByCategoryProps) => {
  return (
    <Box className={styles.shop_category_container} data-testid="shop-ShopByCategory-div">
      <ShopCategoryList
        categoryLabel={activeCategoryLabel}
        subCategories={activeCategoryItems}
        isLoading={isLoading}
      ></ShopCategoryList>
    </Box>
  );
};
