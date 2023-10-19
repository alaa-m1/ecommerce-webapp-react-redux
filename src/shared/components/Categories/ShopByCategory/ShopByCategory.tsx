import { Box } from "@mui/material";
import { Product } from "types";
import { ShopCategoryList } from "./components";

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
    <Box className="shop-category-container" data-testid="shop-ShopByCategory-div">
      <ShopCategoryList
        categoryLabel={activeCategoryLabel}
        subCategories={activeCategoryItems}
        isLoading={isLoading}
      ></ShopCategoryList>
    </Box>
  );
};
